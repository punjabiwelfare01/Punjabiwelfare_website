// Declarative config that drives the whole admin panel. Each collection is a
// list section (add/edit/delete/reorder items); each settings entry is a
// singleton form. Adding a field here is all that's needed for it to appear
// in the dashboard.

export type FieldType = "text" | "textarea" | "image" | "icon" | "url";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export interface CollectionDef {
  key: string;
  label: string;
  description: string;
  itemNoun: string;
  titleField: string;
  imageField?: string;
  fields: FieldDef[];
}

export interface SettingsDef {
  key: string;
  label: string;
  description: string;
  fields: FieldDef[];
}

export const collections: CollectionDef[] = [
  {
    key: "heroSlides",
    label: "Hero Slides",
    description: "The large rotating banner at the top of the homepage.",
    itemNoun: "slide",
    titleField: "title",
    imageField: "image",
    fields: [
      { key: "image", label: "Background Image", type: "image", required: true },
      { key: "badge", label: "Badge Text", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  {
    key: "stats",
    label: "Impact Stats",
    description: "The number counters shown below the hero (villages served, lives impacted…).",
    itemNoun: "stat",
    titleField: "label",
    fields: [
      { key: "icon", label: "Icon", type: "icon", required: true },
      { key: "value", label: "Value", type: "text", required: true },
      { key: "label", label: "Label", type: "text", required: true },
    ],
  },
  {
    key: "posts",
    label: "Our Work & Stories",
    description: "The cards in the 'Our Work & Stories' section.",
    itemNoun: "post",
    titleField: "title",
    imageField: "image",
    fields: [
      { key: "image", label: "Image", type: "image", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  {
    key: "activities",
    label: "Volunteer Activities",
    description: "The four activity chips inside 'Become a Volunteer'.",
    itemNoun: "activity",
    titleField: "label",
    fields: [
      { key: "icon", label: "Icon", type: "icon", required: true },
      { key: "label", label: "Label", type: "text", required: true },
    ],
  },
  {
    key: "committee",
    label: "Advisory Committee",
    description: "Members shown in the 'Our Advisory Committee' section.",
    itemNoun: "member",
    titleField: "name",
    imageField: "photo",
    fields: [
      { key: "photo", label: "Photo", type: "image", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
    ],
  },
  {
    key: "supporters",
    label: "Supporters",
    description: "Members shown in the 'Our Dedicated Supporters' section.",
    itemNoun: "supporter",
    titleField: "name",
    imageField: "photo",
    fields: [
      { key: "photo", label: "Photo", type: "image", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
    ],
  },
  {
    key: "volunteers",
    label: "Volunteers",
    description: "The volunteer team shown in the 'Our Volunteers' section.",
    itemNoun: "volunteer",
    titleField: "name",
    imageField: "photo",
    fields: [
      { key: "photo", label: "Photo", type: "image", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
    ],
  },
  {
    key: "certificates",
    label: "Certificates",
    description: "Appreciation letters and certificates. The first two appear on the homepage; all appear on the /certificates page.",
    itemNoun: "certificate",
    titleField: "title",
    imageField: "image",
    fields: [
      { key: "image", label: "Certificate Image", type: "image", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "issuer", label: "Issued By", type: "text", required: true },
      { key: "date", label: "Date (e.g. June 2026)", type: "text" },
      { key: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  {
    key: "videos",
    label: "Videos",
    description: "The YouTube video cards in 'Watch Us in Action'.",
    itemNoun: "video",
    titleField: "title",
    imageField: "thumbnail",
    fields: [
      { key: "thumbnail", label: "Thumbnail", type: "image", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "url", label: "Video / Channel URL", type: "url", required: true },
    ],
  },
];

export const settingsSections: SettingsDef[] = [
  {
    key: "general",
    label: "General & Contact",
    description: "Site name, logo, phone numbers, email and social media links used across the site.",
    fields: [
      { key: "siteName", label: "Site Name", type: "text", required: true },
      { key: "topBarText", label: "Top Bar Text", type: "text" },
      { key: "navTitle", label: "Navbar Title", type: "text" },
      { key: "navSubtitle", label: "Navbar Subtitle", type: "text" },
      { key: "logo", label: "Logo", type: "image" },
      { key: "whatsapp", label: "WhatsApp Number (with country code)", type: "text" },
      { key: "phone", label: "Phone (displayed)", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "instagram", label: "Instagram URL", type: "url" },
      { key: "youtube", label: "YouTube URL", type: "url" },
    ],
  },
  {
    key: "impact",
    label: "Impact Heading",
    description: "Heading and text under the impact stats.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "ourWork",
    label: "Our Work Heading",
    description: "Heading and intro of the 'Our Work & Stories' section.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "volunteerSection",
    label: "Become a Volunteer",
    description: "Text, image and application form link of the volunteer section.",
    fields: [
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
      { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
      { key: "quote", label: "Quote (on image)", type: "text" },
      { key: "quoteSub", label: "Quote Subtitle", type: "text" },
      { key: "image", label: "Section Image", type: "image" },
      { key: "formUrl", label: "Application Form URL", type: "url" },
    ],
  },
  {
    key: "committeeSection",
    label: "Committee Heading",
    description: "Heading and intro of the advisory committee section.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "supportersSection",
    label: "Supporters Heading",
    description: "Heading and intro of the supporters section.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "volunteersSection",
    label: "Volunteers Heading",
    description: "Heading and intro of the volunteers section.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "videosSection",
    label: "Videos Heading",
    description: "Heading, intro and YouTube channel link of the videos section.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "channelUrl", label: "YouTube Channel URL", type: "url" },
    ],
  },
  {
    key: "certificatesSection",
    label: "Certificates Heading",
    description: "Headings and intro for the homepage recognition section and the /certificates archive page.",
    fields: [
      { key: "heading", label: "Homepage Heading", type: "text" },
      { key: "description", label: "Homepage Description", type: "textarea" },
      { key: "archiveHeading", label: "Archive Page Heading", type: "text" },
      { key: "archiveDescription", label: "Archive Page Description", type: "textarea" },
    ],
  },
  {
    key: "feedbackSection",
    label: "Feedback Heading",
    description: "Heading and intro of the feedback form section.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "donate",
    label: "Donate / QR Code",
    description: "Donation call-to-action, UPI QR code image and UPI ID.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "qrImage", label: "UPI QR Code Image", type: "image" },
      { key: "qrCaption", label: "QR Caption", type: "text" },
      { key: "upiId", label: "UPI ID", type: "text" },
    ],
  },
  {
    key: "footer",
    label: "Footer / Visit Us",
    description: "Address, working hours and copyright line.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "addressLine1", label: "Address Line 1", type: "text" },
      { key: "addressLine2", label: "Address Line 2", type: "text" },
      { key: "hours", label: "Working Hours", type: "text" },
      { key: "copyright", label: "Copyright Line", type: "text" },
    ],
  },
  {
    key: "map",
    label: "Map",
    description: "Heading, intro and Google Maps embed URL.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "embedUrl", label: "Google Maps Embed URL", type: "url" },
    ],
  },
];
