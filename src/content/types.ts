export interface HeroSlide { id?: number; image: string; badge: string; title: string; description: string }
export interface Stat { id?: number; icon: string; value: string; label: string }
export interface Post { id?: number; image: string; title: string; description: string }
export interface Activity { id?: number; icon: string; label: string }
export interface Person { id?: number; name: string; role: string; photo: string }
export interface Video { id?: number; title: string; description: string; thumbnail: string; url: string }
export interface Certificate { id?: number; image: string; title: string; issuer: string; date: string; description: string }

export interface Collections {
  heroSlides: HeroSlide[];
  stats: Stat[];
  posts: Post[];
  activities: Activity[];
  committee: Person[];
  supporters: Person[];
  volunteers: Person[];
  videos: Video[];
  certificates: Certificate[];
}

export interface Settings {
  general: {
    siteName: string; topBarText: string; navTitle: string; navSubtitle: string; logo: string;
    whatsapp: string; phone: string; email: string; instagram: string; youtube: string;
  };
  impact: { heading: string; description: string };
  ourWork: { heading: string; description: string };
  volunteerSection: {
    tagline: string; heading: string; paragraph1: string; paragraph2: string;
    quote: string; quoteSub: string; image: string; formUrl: string;
  };
  committeeSection: { heading: string; description: string };
  supportersSection: { heading: string; description: string };
  volunteersSection: { heading: string; description: string };
  videosSection: { heading: string; description: string; channelUrl: string };
  certificatesSection: { heading: string; description: string; archiveHeading: string; archiveDescription: string };
  feedbackSection: { heading: string; description: string };
  donate: { heading: string; description: string; qrImage: string; qrCaption: string; upiId: string };
  footer: {
    heading: string; description: string; addressLine1: string; addressLine2: string;
    hours: string; copyright: string;
  };
  map: { heading: string; description: string; embedUrl: string };
}

export interface SiteContent {
  collections: Collections;
  settings: Settings;
}

export interface FeedbackEntry {
  id: number; name: string; rating: number | null; category: string; message: string; created_at: string;
}
