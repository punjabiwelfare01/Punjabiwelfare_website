<?php
// Punjabi Welfare Trust — content API (PHP port of the Node/Express server,
// same endpoints and JSON shapes, for Hostinger shared hosting).
declare(strict_types=1);

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

const SECTIONS = ['heroSlides', 'stats', 'posts', 'activities', 'committee', 'supporters', 'volunteers', 'videos', 'certificates'];
const SETTING_KEYS = ['general', 'impact', 'ourWork', 'volunteerSection', 'committeeSection', 'supportersSection', 'volunteersSection', 'videosSection', 'certificatesSection', 'feedbackSection', 'donate', 'footer', 'map'];

/* ---------------------------------- helpers --------------------------------- */

function respond($data, int $code = 200): never {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $code = 400): never {
    respond(['error' => $message], $code);
}

function json_input(): array {
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER,
                DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
            );
        } catch (PDOException $e) {
            fail('Database connection failed', 500);
        }
    }
    return $pdo;
}

/* ------------------------------------ JWT ----------------------------------- */

function b64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function b64url_decode(string $data): string|false {
    return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_sign(array $payload): string {
    $header = b64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['exp'] = time() + 12 * 3600;
    $body = b64url_encode(json_encode($payload));
    $sig = b64url_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    return "$header.$body.$sig";
}

function jwt_verify(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $expected = b64url_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    if (!hash_equals($expected, $sig)) return null;
    $payload = json_decode(b64url_decode($body) ?: '', true);
    if (!is_array($payload) || !isset($payload['exp']) || $payload['exp'] < time()) return null;
    return $payload;
}

function require_auth(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
    if ($header === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            if (strcasecmp($k, 'Authorization') === 0) { $header = $v; break; }
        }
    }
    if (!str_starts_with($header, 'Bearer ')) fail('Authentication required', 401);
    $payload = jwt_verify(substr($header, 7));
    if ($payload === null) fail('Invalid or expired token', 401);
    return $payload;
}

/* -------------------------------- rate limiting ------------------------------ */

function login_rate_limited(string $ip): bool {
    $file = sys_get_temp_dir() . '/pwt-login-' . md5($ip);
    $now = time();
    $entry = ['count' => 0, 'since' => $now];
    if (is_file($file)) {
        $saved = json_decode((string)file_get_contents($file), true);
        if (is_array($saved) && ($now - ($saved['since'] ?? 0)) <= 900) $entry = $saved;
    }
    $entry['count'] = ($entry['count'] ?? 0) + 1;
    if (!isset($entry['since']) || $now - $entry['since'] > 900) $entry = ['count' => 1, 'since' => $now];
    file_put_contents($file, json_encode($entry));
    return $entry['count'] > 8;
}

/* --------------------------------- data access ------------------------------- */

function list_section(string $section): array {
    $stmt = db()->prepare('SELECT id, data FROM collection_items WHERE section = ? ORDER BY sort_order, id');
    $stmt->execute([$section]);
    $items = [];
    foreach ($stmt->fetchAll() as $row) {
        $data = json_decode($row['data'], true) ?: [];
        $items[] = ['id' => (int)$row['id']] + $data;
    }
    return $items;
}

/* ----------------------------------- routing --------------------------------- */

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$path = preg_replace('#^/api#', '', $path) ?: '/';
$path = rtrim($path, '/') ?: '/';

// ---- auth ----
if ($path === '/auth/login' && $method === 'POST') {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (login_rate_limited($ip)) fail('Too many login attempts. Try again in 15 minutes.', 429);
    $in = json_input();
    $email = trim((string)($in['email'] ?? ''));
    $password = (string)($in['password'] ?? '');
    if ($email === '' || $password === '') fail('Email and password are required');

    $stmt = db()->prepare('SELECT * FROM admins WHERE email = ? OR email = ? LIMIT 1');
    $stmt->execute([strtolower($email), $email]);
    $admin = $stmt->fetch();
    if (!$admin || !password_verify($password, $admin['password_hash'])) {
        fail('Invalid email or password', 401);
    }
    respond(['token' => jwt_sign(['id' => (int)$admin['id'], 'email' => $admin['email']]), 'email' => $admin['email']]);
}

if ($path === '/auth/me' && $method === 'GET') {
    $me = require_auth();
    respond(['id' => $me['id'], 'email' => $me['email']]);
}

if ($path === '/auth/change-password' && $method === 'POST') {
    $me = require_auth();
    $in = json_input();
    $current = (string)($in['currentPassword'] ?? '');
    $new = (string)($in['newPassword'] ?? '');
    if ($current === '' || $new === '') fail('Current and new password are required');
    if (strlen($new) < 8) fail('New password must be at least 8 characters');
    $stmt = db()->prepare('SELECT * FROM admins WHERE id = ?');
    $stmt->execute([$me['id']]);
    $admin = $stmt->fetch();
    if (!$admin || !password_verify($current, $admin['password_hash'])) {
        fail('Current password is incorrect', 401);
    }
    db()->prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
        ->execute([password_hash($new, PASSWORD_BCRYPT), $admin['id']]);
    respond(['ok' => true]);
}

// ---- public content ----
if ($path === '/content' && $method === 'GET') {
    $collections = [];
    foreach (SECTIONS as $section) $collections[$section] = list_section($section);
    $settings = [];
    foreach (db()->query('SELECT `key`, data FROM settings')->fetchAll() as $row) {
        $settings[$row['key']] = json_decode($row['data'], true);
    }
    respond(['collections' => $collections, 'settings' => (object)$settings]);
}

// ---- collections ----
if (preg_match('#^/collections/([A-Za-z]+)$#', $path, $m)) {
    $section = $m[1];
    if (!in_array($section, SECTIONS, true)) fail("Unknown section '$section'", 404);

    if ($method === 'GET') respond(list_section($section));

    if ($method === 'POST') {
        require_auth();
        $data = json_input();
        unset($data['id']);
        $max = db()->prepare('SELECT COALESCE(MAX(sort_order), -1) AS m FROM collection_items WHERE section = ?');
        $max->execute([$section]);
        $sort = (int)$max->fetch()['m'] + 1;
        db()->prepare('INSERT INTO collection_items (section, data, sort_order) VALUES (?, ?, ?)')
            ->execute([$section, json_encode($data, JSON_UNESCAPED_UNICODE), $sort]);
        respond(['id' => (int)db()->lastInsertId()] + $data, 201);
    }
    fail('Method not allowed', 405);
}

if (preg_match('#^/collections/([A-Za-z]+)/reorder$#', $path, $m) && $method === 'PUT') {
    $section = $m[1];
    if (!in_array($section, SECTIONS, true)) fail("Unknown section '$section'", 404);
    require_auth();
    $ids = json_input()['ids'] ?? null;
    if (!is_array($ids)) fail("'ids' array is required");
    $pdo = db();
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare('UPDATE collection_items SET sort_order = ? WHERE id = ? AND section = ?');
        foreach (array_values($ids) as $i => $id) $stmt->execute([$i, (int)$id, $section]);
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        fail('Reorder failed', 500);
    }
    respond(list_section($section));
}

if (preg_match('#^/collections/([A-Za-z]+)/(\d+)$#', $path, $m)) {
    $section = $m[1];
    $id = (int)$m[2];
    if (!in_array($section, SECTIONS, true)) fail("Unknown section '$section'", 404);
    require_auth();

    if ($method === 'PUT') {
        $data = json_input();
        unset($data['id']);
        $stmt = db()->prepare('UPDATE collection_items SET data = ? WHERE id = ? AND section = ?');
        $stmt->execute([json_encode($data, JSON_UNESCAPED_UNICODE), $id, $section]);
        if ($stmt->rowCount() === 0) {
            // rowCount can be 0 for a no-op update on an existing row — verify existence
            $check = db()->prepare('SELECT id FROM collection_items WHERE id = ? AND section = ?');
            $check->execute([$id, $section]);
            if (!$check->fetch()) fail('Item not found', 404);
        }
        respond(['id' => $id] + $data);
    }

    if ($method === 'DELETE') {
        $stmt = db()->prepare('DELETE FROM collection_items WHERE id = ? AND section = ?');
        $stmt->execute([$id, $section]);
        if ($stmt->rowCount() === 0) fail('Item not found', 404);
        respond(['ok' => true]);
    }
    fail('Method not allowed', 405);
}

// ---- settings ----
if (preg_match('#^/settings/([A-Za-z]+)$#', $path, $m)) {
    $key = $m[1];

    if ($method === 'GET') {
        $stmt = db()->prepare('SELECT data FROM settings WHERE `key` = ?');
        $stmt->execute([$key]);
        $row = $stmt->fetch();
        if (!$row) fail('Unknown settings key', 404);
        respond(json_decode($row['data'], true));
    }

    if ($method === 'PUT') {
        if (!in_array($key, SETTING_KEYS, true)) fail("Unknown settings key '$key'", 404);
        require_auth();
        $data = json_input();
        db()->prepare('INSERT INTO settings (`key`, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)')
            ->execute([$key, json_encode($data, JSON_UNESCAPED_UNICODE)]);
        respond($data ?: new stdClass());
    }
    fail('Method not allowed', 405);
}

// ---- upload ----
if ($path === '/upload' && $method === 'POST') {
    require_auth();
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        fail("No image provided (field name: 'image')");
    }
    $file = $_FILES['image'];
    if ($file['size'] > 8 * 1024 * 1024) fail('Image too large (max 8 MB)');
    $allowed = ['image/jpeg' => '.jpg', 'image/png' => '.png', 'image/webp' => '.webp', 'image/gif' => '.gif'];
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    if (!isset($allowed[$mime])) fail('Only JPEG, PNG, WebP or GIF images are allowed');

    $uploadsDir = dirname(__DIR__) . '/uploads';
    if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0755, true);
    $name = round(microtime(true) * 1000) . '-' . bin2hex(random_bytes(4)) . $allowed[$mime];
    if (!move_uploaded_file($file['tmp_name'], "$uploadsDir/$name")) fail('Failed to save image', 500);
    respond(['url' => "/uploads/$name"], 201);
}

// ---- feedback ----
if ($path === '/feedback' && $method === 'POST') {
    $in = json_input();
    $message = trim((string)($in['message'] ?? ''));
    if ($message === '') fail('Message is required');
    db()->prepare('INSERT INTO feedback (name, rating, category, message) VALUES (?, ?, ?, ?)')
        ->execute([
            mb_substr((string)($in['name'] ?? ''), 0, 200),
            (int)($in['rating'] ?? 0) ?: null,
            mb_substr((string)($in['category'] ?? ''), 0, 100),
            mb_substr($message, 0, 5000),
        ]);
    respond(['id' => (int)db()->lastInsertId()], 201);
}

if ($path === '/feedback' && $method === 'GET') {
    require_auth();
    respond(db()->query('SELECT * FROM feedback ORDER BY id DESC')->fetchAll());
}

if (preg_match('#^/feedback/(\d+)$#', $path, $m) && $method === 'DELETE') {
    require_auth();
    $stmt = db()->prepare('DELETE FROM feedback WHERE id = ?');
    $stmt->execute([(int)$m[1]]);
    if ($stmt->rowCount() === 0) fail('Not found', 404);
    respond(['ok' => true]);
}

fail('Not found', 404);
