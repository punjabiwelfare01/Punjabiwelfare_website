// Fallback content used until the API responds (and if the API is down).
// Mirrors the seeded database content, with images bundled by Vite.
import type { SiteContent } from "./types";

import work1 from "@/assets/work-1.jpeg";
import work2 from "@/assets/work-2.jpeg";
import work3 from "@/assets/work-3.jpeg";
import work4 from "@/assets/work-4.jpeg";
import work5 from "@/assets/work-5.jpeg";
import work6 from "@/assets/work-6.jpeg";
import work7 from "@/assets/work-7.jpeg";
import work8 from "@/assets/work-8.jpeg";
import advisory1 from "@/assets/advisory-1.jpeg";
import advisory2 from "@/assets/advisory-2.jpeg";
import advisory3 from "@/assets/advisory-3.jpeg";
import advisory4 from "@/assets/advisory-4.jpeg";
import advisory5 from "@/assets/advisory-5.jpeg";
import advisory6 from "@/assets/advisory-6.jpeg";
import advisory7 from "@/assets/advisory-7.jpeg";
import advisory8 from "@/assets/advisory-8.jpeg";
import advisory9 from "@/assets/advisory-9.jpeg";
import advisory10 from "@/assets/advisory-10.jpeg";
import supporter11 from "@/assets/supporter-11.jpeg";
import supporter12 from "@/assets/supporter-12.jpeg";
import supporter13 from "@/assets/supporter-13.jpeg";
import supporter14 from "@/assets/supporter-14.jpeg";
import supporter15 from "@/assets/supporter-15.jpeg";
import supporter16 from "@/assets/Supporter-16.jpeg";
import supporter17 from "@/assets/supporter-17.jpeg";
import supporter18 from "@/assets/supporter-18.jpeg";
import supporter19 from "@/assets/supporter-19.jpeg";
import supporter20 from "@/assets/supporter-20.jpeg";
import dilsad from "@/assets/dilsad.jpeg";
import volSwejal from "@/assets/volSwejal.jpeg";
import vol22 from "@/assets/volunteer-22.jpeg";
import vol23 from "@/assets/volunteer-23.jpeg";
import volunteerImg from "@/assets/volunteer.jpeg";
import donateQr from "@/assets/donate-qr.jpeg";
import logo from "@/assets/logo.jpeg";
import ytThumbnail from "@/assets/yt thumbnail.jpeg";
import ytThumbnail2 from "@/assets/yt thumbnail2.jpeg";
import ytThumbnail3 from "@/assets/yt thumbnail3.jpeg";
import certificate1 from "@/assets/certificate1.png";
import certificate2 from "@/assets/certificate2.png";
import certificate3 from "@/assets/certificate3.png";
import certificate4 from "@/assets/certificate4.png";
import certificate5 from "@/assets/certificate5.png";
import certificate6 from "@/assets/certificate6.png";
import certificate7 from "@/assets/certificate7.png";
import certificate8 from "@/assets/certificate8.png";

const channelUrl = "https://www.youtube.com/@punjabiwelfaretrust99";

export const defaultContent: SiteContent = {
  collections: {
    heroSlides: [
      { image: work1, badge: "FREE EDUCATION INITIATIVE", title: "Educating the Future", description: "Providing free communication education and library services to aspiring students." },
      { image: work2, badge: "WINTER CLOTHING DRIVE", title: "Warmth for Every Family", description: "Distributing winter clothing to underprivileged families across Delhi and Punjab." },
      { image: work3, badge: "ECO FRIENDLY DIWALI", title: "Green Diwali Campaign", description: "Spreading awareness for a pollution-free, eco-friendly Diwali celebration." },
    ],
    stats: [
      { icon: "MapPin", value: "50", label: "VILLAGES SERVED" },
      { icon: "Users", value: "12000", label: "LIVES IMPACTED" },
      { icon: "HandHeart", value: "150", label: "VOLUNTEERS" },
      { icon: "School", value: "8", label: "SCHOOLS BUILT" },
    ],
    posts: [
      { image: work1, title: "Free Communication Education", description: "Providing free communication education to underprivileged children, empowering them with language and life skills for a brighter future." },
      { image: work2, title: "Winter Clothing Distribution Drive", description: "Distributing warm clothes, blankets, and winter essentials to families in need during the harsh winter months across Delhi." },
      { image: work3, title: "Eco Friendly Diwali Awareness Rally", description: "Organizing rallies and campaigns to promote eco-friendly Diwali celebrations, encouraging people to burst ego not crackers." },
      { image: work4, title: "Candle Light Tribute & Peace March", description: "Holding candlelight vigils and peace marches to honor the sacrifices of our heroes and promote harmony in the community." },
      { image: work5, title: "Annual Winter Relief", description: "Our annual winter relief program provides blankets, warm clothing, and food to homeless and underprivileged families across the region." },
      { image: work6, title: "Langar Seva: Providing Nutritious Meals to Vulnerable Communities", description: "Serving hot, nutritious meals to hundreds of people every week through our community kitchen and langar seva program." },
      { image: work7, title: "Covid-19 Relief Efforts", description: "Reaching out to the most vulnerable during the Covid-19 pandemic with essential supplies and support." },
      { image: work8, title: "Library with books, stationery, and tutoring at no cost.", description: "Students can access educational resources and support without any cost and useful for all with providing teacher guidance." },
    ],
    activities: [
      { icon: "Stethoscope", label: "Medical Camp Assistance" },
      { icon: "Share2", label: "Social Media Advocacy" },
      { icon: "CalendarDays", label: "Event Management" },
      { icon: "HandCoins", label: "Fundraising Support" },
    ],
    committee: [
      { name: "DEV RAJ AHUJA", role: "ADVISOR", photo: advisory1 },
      { name: "PARAMJEET BINDRA", role: "ADVISOR", photo: advisory2 },
      { name: "MADAN MOHAN MANGAL", role: "ADVISOR", photo: advisory3 },
      { name: "NANAK SINGH", role: "ADVISOR", photo: advisory4 },
      { name: "ARUN PANDEY", role: "ADVISOR", photo: advisory5 },
      { name: "TARUN KUMAR BHAGRA", role: "ADVISOR", photo: advisory6 },
      { name: "SARTEJPAL SINGH", role: "ADVISOR", photo: advisory7 },
      { name: "RAJEEV KASHYAP", role: "ADVISOR", photo: advisory8 },
      { name: "GURDEEP SINGH GILL", role: "ADVISOR", photo: advisory9 },
      { name: "NAVINDER SINGH", role: "ADVISOR", photo: advisory10 },
    ],
    supporters: [
      { name: "UMINDER SINGH", role: "PRESIDENT", photo: supporter16 },
      { name: "BHARAT BHUSHAN SAHNI", role: "VICE-PRESIDENT", photo: supporter18 },
      { name: "H.S GROVER", role: "CHAIRMAN", photo: supporter14 },
      { name: "BHAGWANT SINGH", role: "VICE CHAIRMAN", photo: supporter17 },
      { name: "ATUL AGGARWAL", role: "GENERAL SECRETARY", photo: supporter19 },
      { name: "MANISH SHARMA", role: "SECRETARY-1", photo: supporter11 },
      { name: "AMIT KUMAR", role: "SECRETARY-2", photo: supporter20 },
      { name: "MANOO KAPOOR", role: "CASHIER", photo: supporter12 },
      { name: "MUNEET SHARMA", role: "MEDIA PRABHARI", photo: supporter13 },
      { name: "RAMESH DUTT BHAT", role: "TREASURER", photo: supporter15 },
      { name: "DILSAD", role: "TECH MEMBER", photo: dilsad },
    ],
    volunteers: [
      { name: "Madhur Sharma", role: "WEBSITE DEVELOPER", photo: vol23 },
      { name: "Swejal Gupta", role: "WEBSITE DEVELOPER", photo: volSwejal },
      { name: "Prem Singh", role: "WEBSITE DEVELOPER", photo: vol22 },
    ],
    videos: [
      { title: "Punjabi Welfare Trust - Our Mission", description: "Watch how our trust is making a difference in the lives of underprivileged communities.", thumbnail: ytThumbnail3, url: channelUrl },
      { title: "Community Service Highlights", description: "Highlights from our feeding, education and healthcare drives across Delhi and Punjab.", thumbnail: ytThumbnail2, url: channelUrl },
      { title: "Join the Movement", description: "See how volunteers and donors are coming together to build a better tomorrow.", thumbnail: ytThumbnail, url: channelUrl },
    ],
    certificates: [
      { image: certificate1, title: "Appreciation for Excellent Serving Towards Society", issuer: "Delhi Police — Station House Officer, Delhi Cantt", date: "June 2026", description: "Delhi Police commends Punjabi Welfare Trust for serving the community through educational support, awareness programs, free NDA coaching and library facilities, recognising its commitment to empowering youth and promoting social responsibility." },
      { image: certificate2, title: "Appreciation for Outstanding Social Service", issuer: "Indian Army — HQ Technical Group EME, Delhi Cantt", date: "June 2026", description: "Col Vikas Tomar, CIME (IM & NSC), acknowledges the commendable efforts of the Trust in serving society through educational and awareness initiatives that will go a long way in shaping the future of the young generation." },
      { image: certificate3, title: "Appreciation for Outstanding Contribution", issuer: "Military Engineer Service — Commander Works Engineer, Delhi Cantt", date: "May 2026", description: "Col Vidyut Mahato applauds the Trust's free NDA coaching for aspiring candidates, free library facilities and free coaching classes for students of Class 6th to 12th, making quality education accessible to all sections of society." },
      { image: certificate4, title: "Appreciation Letter for G-20 Volunteering", issuer: "Delhi Police — Asstt. Commissioner of Police, South West District", date: "2023", description: "Recognises the exemplary volunteering services rendered by Trust members during the G-20 Summit, along with its splendid work in education — free tuition with study material and free books and coaching for Class X and XII students." },
      { image: certificate5, title: "Gratitude for G-20 Summit Support", issuer: "Border Security Force — 45 Bn BSF", date: "2023", description: "The BSF places on record its appreciation for the exceptional arrangements — fans, tentage, tables, chairs and water tanks — that kept the troops comfortable during the G-20 Summit 2023." },
      { image: certificate6, title: "Message of Appreciation", issuer: "Virender Singh Kadian — MLA, Govt of NCT of Delhi (Delhi Cantt)", date: "July 2023", description: "The Hon'ble MLA appreciates the Trust's work for career empowerment of the young generation, environmental development, education and public health across Delhi/NCR, including its dedicated service during the COVID-19 pandemic." },
      { image: certificate7, title: "Blessings & Appreciation", issuer: "Gurdwara Prabandhak Committee (Regd.), Sadar Bazar, Delhi Cantt", date: "February 2023", description: "The Committee lauds the Trust for uplifting society by giving free education, books and uniforms to poor students, along with free eye check-ups and blood donation camps." },
      { image: certificate8, title: "Letter of Appreciation", issuer: "Resident Welfare Association, Village Old Nangal, Delhi Cantt", date: "January 2022", description: "The RWA thanks the Trust for distributing free books and stationery to poor children in slum areas and for its free education, eye-testing camps and blood donation drives." },
    ],
  },
  settings: {
    general: {
      siteName: "Punjabi Welfare Trust NGO",
      topBarText: "PUNJABI WELFARE TRUST NGO",
      navTitle: "Punjabi Welfare",
      navSubtitle: "Trust NGO",
      logo,
      whatsapp: "+917834992799",
      phone: "+91 78349 92799",
      email: "punjabiwelfaretrust@gmail.com",
      instagram: "https://www.instagram.com/punjabiwelfaretrust99?igsh=MXQ0bG52ZzZ1dDl6ZA==",
      youtube: "https://youtube.com/@punjabiwelfaretrust99",
    },
    impact: {
      heading: "Our Impact in Action",
      description: "Watch our volunteers on the ground and see the real-world difference your contributions make.",
    },
    ourWork: {
      heading: "Our Work & Stories",
      description: "Read about our latest initiatives and the impact we're making across communities.",
    },
    volunteerSection: {
      tagline: "JOIN OUR FAMILY",
      heading: "Become a Volunteer",
      paragraph1: "Join a community of dedicated individuals working towards a better society. Your time is the most valuable gift you can give.",
      paragraph2: "We believe that lasting change happens when ordinary people come together to do extraordinary things.",
      quote: '"Seva is the essence of life."',
      quoteSub: "JOIN THE MOVEMENT",
      image: volunteerImg,
      formUrl: "https://forms.gle/mJFNbHfyfyvYcEex5",
    },
    committeeSection: {
      heading: "Our Advisory Committee",
      description: "We are deeply grateful to the individuals who stand with us. Their generosity fuels our mission to serve humanity.",
    },
    supportersSection: {
      heading: "Our Dedicated Supporters",
      description: "We are deeply grateful to the individuals who stand with us. Their generosity fuels our mission to serve humanity.",
    },
    volunteersSection: {
      heading: "Our Volunteers",
      description: "Meet the dedicated young volunteers who are driving change on the ground every day.",
    },
    videosSection: {
      heading: "Watch Us in Action",
      description: "Watch our volunteers on the ground and see the real-world difference your contributions make.",
      channelUrl,
    },
    certificatesSection: {
      heading: "Honours & Recognition",
      description: "Punjabi Welfare Trust's service to society has been recognised by Delhi Police, the Indian Army, BSF and community institutions.",
      archiveHeading: "Our Certificates & Appreciation Letters",
      archiveDescription: "Every letter here represents years of ground work — education, relief drives, health camps and community service — recognised by government bodies, armed forces and community institutions.",
    },
    feedbackSection: {
      heading: "We Value Your Feedback",
      description: "Your thoughts and suggestions help us improve our initiatives and reach more people in need.",
    },
    donate: {
      heading: "Ready to Make a Difference?",
      description: "Your small contribution can save a life, educate a child, or feed a family. Every penny counts and goes directly to the cause.",
      qrImage: donateQr,
      qrCaption: "Scan to Donate via UPI",
      upiId: "79349901@ubin",
    },
    footer: {
      heading: "Visit Us",
      description: "Come visit our office and see our work first-hand. We'd love to meet you!",
      addressLine1: "Sadar Bazar, Delhi Cantt,",
      addressLine2: "New Delhi, India",
      hours: "Mon – Sun: 9:00 AM – 6:00 PM",
      copyright: "© 2025 Punjabi Welfare Trust. All rights reserved.",
    },
    map: {
      heading: "Find Us on the Map",
      description: "Visit our office in Sadar Bazar, Delhi Cantt. We are always happy to welcome visitors and volunteers.",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0892547!2d77.1345!3d28.5963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d6f5c5e5e5f%3A0x1a2b3c4d5e6f7890!2sSadar%20Bazar%2C%20Delhi%20Cantt%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    },
  },
};
