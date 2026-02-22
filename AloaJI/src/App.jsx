import { useState, useRef, useEffect } from "react";
// Lucide icons via CDN — inline SVG components
const Icon = ({ d, size=16, color="currentColor", strokeWidth=1.5, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{display:"inline-block",flexShrink:0,...style}}>
    {Array.isArray(d) ? d.map((p,i)=><path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);
// Icon paths from Lucide
const IC = {
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  mapPin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  heart: ["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"],
  heartFilled: ["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"],
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  sun: ["M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"],
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  home: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  compass: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"],
  user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  logOut: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
  plus: "M12 5v14M5 12h14",
  trash: ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  camera: ["M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  edit: ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  messageCircle: ["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"],
  image: ["M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z","M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z","M21 15l-5-5L5 21"],
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  chevronRight: "M9 18l6-6-6-6",
  chevronDown: "M6 9l6 6 6-6",
  arrowLeft: ["M19 12H5","M12 19l-7-7 7-7"],
  menu: ["M3 12h18","M3 6h18","M3 18h18"],
  list: ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
  map: ["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z","M8 2v16","M16 6v16"],
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  loader: ["M12 2v4","M12 18v4","M4.93 4.93l2.83 2.83","M16.24 16.24l2.83 2.83","M2 12h4","M18 12h4","M4.93 19.07l2.83-2.83","M16.24 7.76l2.83-2.83"],
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
  // Profession icons — clearer, consumer-friendly
  droplets:     ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"],
  zap:          "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  paintbrush2:  ["M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08","M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.48 1 3.5 1 2.34 0 4.43-1.94 4.43-4.02v-.01c0-1.67-1.35-3.01-2.93-3.01z"],
  bricks:       ["M3 4h18v4H3z","M3 12h18v4H3z","M3 20h18v4H3z","M7 4v4","M12 4v4","M17 4v4","M5 12v4","M10 12v4","M15 12v4","M20 12v4"],
  hammer2:      ["M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9","M17.64 15 22 10.64","M20.35 12.35l1.42 1.42a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 0 1-1.41 0l-1.42-1.42a1 1 0 0 1 0-1.41l1.42-1.42a1 1 0 0 1 1.41 0z","M6.5 6.5l.44 2.63M10 5l-.44 2.63M5 10l2.63.44M3.56 13.5 6.2 13"],
  grid2:        ["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"],
  thermometer:  ["M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"],
  flame2:       "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  // Profession icons (more meaningful)
  droplets:   ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"],
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  paintbrush2:["M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z","M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"],
  bricks:     ["M2 6h20v4H2z","M2 14h20v4H2z","M6 6v4","M10 6v4","M14 6v4","M18 6v4","M4 14v4","M8 14v4","M12 14v4","M16 14v4","M20 14v4"],
  hammer2:    ["M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9","M17.64 15L22 10.64","M20.35 12.35L22 10.7a1 1 0 0 0 0-1.41l-2.63-2.63a1 1 0 0 0-1.42 0L16.3 8.2","M16 13l1.64-1.64"],
  grid2:      ["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"],
  thermometer:["M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"],
  flame2:     "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  // Work type icons
  screwdriver:["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"],
  settings:   ["M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M12 2v2","M12 20v2","M4.93 4.93l1.41 1.41","M17.66 17.66l1.41 1.41","M2 12h2","M20 12h2","M6.34 17.66l-1.41 1.41","M19.07 4.93l-1.41 1.41"],
  building2:  ["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z","M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2","M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2","M10 6h4","M10 10h4","M10 14h4","M10 18h4"],
  alertOctagon:["M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z","M12 8v4","M12 16h.01"],
  // Work type icons
  screwdriver: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"],
  settings: ["M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M12 2v2","M12 20v2","M4.93 4.93l1.41 1.41","M17.66 17.66l1.41 1.41","M2 12h2","M20 12h2","M6.34 17.66l-1.41 1.41","M19.07 4.93l-1.41 1.41"],
  building2: ["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z","M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2","M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2","M10 6h4","M10 10h4","M10 14h4","M10 18h4"],
  alertOctagon: ["M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z","M12 8v4","M12 16h.01"],
};
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── DESIGN TOKENS — shadcn/ui inspired ──────────────────────────────────────
const DARK = {
  // Base
  bg: "#09090b", bg2: "#18181b", bg3: "#27272a",
  border: "#27272a", border2: "#3f3f46",
  text: "#fafafa", text2: "#a1a1aa", text3: "#71717a",
  card: "#09090b", cardHov: "#18181b",
  nav: "rgba(9,9,11,0.85)",
  overlay: "rgba(0,0,0,0.75)",
  shadow: "0 1px 2px rgba(0,0,0,0.4)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.4)",
  shadowLg: "0 8px 32px rgba(0,0,0,0.6)",
  input: "#18181b",
  // Brand — warm neutral with a single accent
  primary: "#e4e4e7",       // near-white primary
  primaryDark: "#d4d4d8",
  primaryLight: "#27272a",
  secondary: "#71717a",
  accent: "#f59e0b",
  accentLight: "#451a03",
  success: "#22c55e",
  successLight: "#052e16",
  danger: "#ef4444",
  dangerLight: "#450a0a",
  warning: "#f59e0b",
  // Call to action — single bold color
  cta: "#18181b",
  ctaText: "#fafafa",
  ctaBorder: "#e4e4e7",
};

const LIGHT = {
  bg: "#ffffff", bg2: "#f4f4f5", bg3: "#e4e4e7",
  border: "#e4e4e7", border2: "#d4d4d8",
  text: "#09090b", text2: "#52525b", text3: "#a1a1aa",
  card: "#ffffff", cardHov: "#f4f4f5",
  nav: "rgba(255,255,255,0.85)",
  overlay: "rgba(9,9,11,0.5)",
  shadow: "0 1px 2px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.08)",
  shadowLg: "0 8px 32px rgba(0,0,0,0.12)",
  input: "#ffffff",
  primary: "#09090b",
  primaryDark: "#18181b",
  primaryLight: "#f4f4f5",
  secondary: "#71717a",
  accent: "#d97706",
  accentLight: "#fef3c7",
  success: "#16a34a",
  successLight: "#dcfce7",
  danger: "#dc2626",
  dangerLight: "#fee2e2",
  warning: "#d97706",
  cta: "#09090b",
  ctaText: "#fafafa",
  ctaBorder: "#09090b",
};

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
// Professions — icon is a Lucide IC key, not emoji
const PROFESSIONS = [
  { id:1, name:"Plombier",      icon:"droplets",    color:"#0284C7", bg:"#E0F2FE" },
  { id:2, name:"Électricien",   icon:"zap",         color:"#D97706", bg:"#FEF3C7" },
  { id:3, name:"Peintre",       icon:"paintbrush2", color:"#DB2777", bg:"#FCE7F3" },
  { id:4, name:"Maçon",         icon:"bricks",      color:"#7C3AED", bg:"#EDE9FE" },
  { id:5, name:"Menuisier",     icon:"wrench_",     color:"#059669", bg:"#D1FAE5" },
  { id:6, name:"Carreleur",     icon:"grid2",       color:"#4338CA", bg:"#E0E7FF" },
  { id:7, name:"Climatisation", icon:"thermometer", color:"#0891B2", bg:"#CFFAFE" },
  { id:8, name:"Soudeur",       icon:"flame2",      color:"#DC2626", bg:"#FEE2E2" },
];
// ProfIcon: renders a Lucide icon for a profession using IC map
function ProfIcon({ iconKey, size=14, color="currentColor" }) {
  const d = IC[iconKey] || IC.wrench;
  return <Icon d={d} size={size} color={color}/>;
}

const CITIES = [
  { id:1, name:"Casablanca", lat:33.5731, lng:-7.5898 },
  { id:2, name:"Rabat",      lat:34.0209, lng:-6.8416 },
  { id:3, name:"Marrakech",  lat:31.6295, lng:-7.9811 },
  { id:4, name:"Fès",        lat:34.0181, lng:-5.0078 },
  { id:5, name:"Tanger",     lat:35.7595, lng:-5.834  },
  { id:6, name:"Agadir",     lat:30.4278, lng:-9.5981 },
  { id:7, name:"Meknès",     lat:33.8935, lng:-5.5473 },
  { id:8, name:"Oujda",      lat:34.6805, lng:-1.9076 },
];

const WORK_TYPES = [
  { id:"small",     label:"Petit travail",  icon:"screwdriver", desc:"Réparation rapide"   },
  { id:"medium",    label:"Travail moyen",  icon:"settings",    desc:"Quelques heures"     },
  { id:"large",     label:"Grand chantier", icon:"building2",   desc:"Plusieurs jours"     },
  { id:"emergency", label:"Urgence",        icon:"alertOctagon",desc:"Intervention rapide" },
];

const GRAD = [
  ["#1e3a5f","#2d5a8e"],["#3d1a5f","#6b3fa0"],
  ["#1a3d2d","#2d6b4a"],["#5f3a1a","#a06b2d"],
  ["#1a2d5f","#2d4aa0"],["#5f1a3a","#a02d6b"],
];

const MOCK_WORKERS = [
  { id:1, name:"Youssef El Fassi", phone:"0661234567", city:"Casablanca", professions:[1,2],
    bio:"10 ans d'expérience. Devis gratuit sous 24h. Disponible 7j/7.", available:true,
    initials:"YF", gi:0, status:"approved",
    portfolio:[{id:1,caption:"Salle de bain complète",gi:0},{id:2,caption:"Tableau électrique",gi:1},{id:3,caption:"Cuisine plomberie",gi:2}],
    reviews:[{id:1,author:"Sara M.",rating:5,comment:"Excellent, très professionnel!",date:"2024-11-10",workType:"large"},{id:2,author:"Amine B.",rating:4,comment:"Bon travail.",date:"2024-12-02",workType:"small"}] },
  { id:2, name:"Khalid Benali", phone:"0662345678", city:"Casablanca", professions:[2],
    bio:"Électricien certifié. Travaux résidentiels et commerciaux.", available:true,
    initials:"KB", gi:1, status:"approved",
    portfolio:[{id:1,caption:"Spots LED salon",gi:3},{id:2,caption:"Tableau électrique",gi:4}],
    reviews:[{id:1,author:"Fatima Z.",rating:5,comment:"Rapide et efficace!",date:"2024-10-15",workType:"medium"}] },
  { id:3, name:"Hassan Tazi", phone:"0663456789", city:"Rabat", professions:[3,4],
    bio:"Peintre et maçon avec 15 ans d'expérience.", available:false,
    initials:"HT", gi:2, status:"approved",
    portfolio:[{id:1,caption:"Salon peinture",gi:1},{id:2,caption:"Façade extérieure",gi:5}],
    reviews:[{id:1,author:"Omar K.",rating:3,comment:"Correct mais lent.",date:"2024-09-20",workType:"large"}] },
  { id:4, name:"Mohamed Chraibi", phone:"0664567890", city:"Marrakech", professions:[5,6],
    bio:"Menuisier et carreleur. Finitions haut de gamme.", available:true,
    initials:"MC", gi:3, status:"approved",
    portfolio:[{id:1,caption:"Carrelage marbre",gi:2},{id:2,caption:"Cuisine bois",gi:4},{id:3,caption:"Terrasse",gi:0}],
    reviews:[{id:1,author:"Nadia S.",rating:5,comment:"Magnifique travail!",date:"2024-11-28",workType:"large"},{id:2,author:"Rachid A.",rating:5,comment:"Parfait.",date:"2024-12-10",workType:"medium"}] },
  { id:5, name:"Rachid Alaoui", phone:"0665678901", city:"Fès", professions:[7],
    bio:"Technicien climatisation agréé. Toutes marques.", available:true,
    initials:"RA", gi:4, status:"approved",
    portfolio:[{id:1,caption:"Climatiseur split",gi:1}],
    reviews:[] },
  { id:6, name:"Omar Kettani", phone:"0666789012", city:"Tanger", professions:[1,8],
    bio:"Plombier et soudeur. Interventions rapides 24h/24.", available:true,
    initials:"OK", gi:5, status:"approved",
    portfolio:[{id:1,caption:"Portail soudé",gi:3},{id:2,caption:"Chauffage central",gi:0}],
    reviews:[{id:1,author:"Layla M.",rating:4,comment:"Bon travail.",date:"2024-12-01",workType:"medium"}] },
];

// pending approvals
const MOCK_PENDING = [
  { id:101, name:"Karim Ouali", phone:"0670000001", city:"Casablanca", professions:[1], bio:"Plombier avec 5 ans d'expérience.", initials:"KO", gi:2, status:"pending", submittedAt:"2025-02-15", portfolio:[], reviews:[] },
  { id:102, name:"Amina Tahir", phone:"0670000002", city:"Rabat",      professions:[3], bio:"Peintre spécialisée décoration intérieure.", initials:"AT", gi:3, status:"pending", submittedAt:"2025-02-16", portfolio:[], reviews:[] },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const avg = (reviews) => !reviews.length ? null : (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1);

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Stars({ rating, size=13, t }) {
  return (
    <span style={{display:"inline-flex",gap:1}}>
      {[1,2,3,4,5].map(i=>(
        <Icon key={i} d={IC.star} size={size}
          color={i<=Math.round(rating)?t.accent:"none"}
          style={{stroke:i<=Math.round(rating)?t.accent:t.border2, fill:i<=Math.round(rating)?t.accent:"none"}}/>
      ))}
    </span>
  );
}

function Avatar({ worker, size=48, t }) {
  const colors = ["#3f3f46","#52525b","#71717a","#a1a1aa","#27272a","#18181b"];
  const bg = colors[worker.gi % colors.length];
  if(worker.avatar_url) return (
    <img src={worker.avatar_url} alt={worker.initials}
      style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
  );
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:bg,border:`1px solid ${t.border2}`,
      display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.34,
      fontWeight:600,color:t.text2,flexShrink:0,letterSpacing:"-0.5px"}}>
      {worker.initials}
    </div>
  );
}

function Badge({ children, color, t, style={} }) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:6,
      border:`1px solid ${color||t.border2}`,fontSize:11,fontWeight:500,
      color:color||t.text2,background:"transparent",...style}}>
      {children}
    </span>
  );
}

function AvailBadge({ available, t }) {
  return (
    <Badge color={available ? t.success : t.text3} t={t}>
      <span style={{width:5,height:5,borderRadius:"50%",background:available?t.success:t.text3,flexShrink:0}}/>
      {available?"Disponible":"Indisponible"}
    </Badge>
  );
}

function PortfolioGrad({ gi, style={} }) {
  const colors=["#18181b","#1c1917","#172554","#1a1a2e","#0f1923","#0d1b2a"];
  return <div style={{background:colors[gi%colors.length],display:"flex",alignItems:"center",
    justifyContent:"center",color:"#3f3f46",...style}}>
    <Icon d={IC.image} size={24} color="#3f3f46"/>
  </div>;
}

function Btn({ children, variant="default", size="md", onClick, style={}, t, disabled, as, href }) {
  const pad={sm:"6px 12px",md:"9px 16px",lg:"12px 24px"}[size];
  const fs={sm:12,md:13,lg:14}[size];
  const h={sm:32,md:36,lg:44}[size];
  const vs={
    default:{background:t.cta,color:t.ctaText,border:`1px solid ${t.ctaBorder}`},
    secondary:{background:t.bg2,color:t.text,border:`1px solid ${t.border}`},
    ghost:{background:"transparent",color:t.text2,border:"1px solid transparent"},
    danger:{background:"transparent",color:t.danger,border:`1px solid ${t.danger}40`},
    outline:{background:"transparent",color:t.text,border:`1px solid ${t.border}`},
    // keep old names as aliases
    primary:{background:t.cta,color:t.ctaText,border:`1px solid ${t.ctaBorder}`},
    success:{background:"transparent",color:t.success,border:`1px solid ${t.success}40`},
  };
  const base={borderRadius:8,fontWeight:500,cursor:disabled?"not-allowed":"pointer",
    transition:"opacity .15s",display:"inline-flex",alignItems:"center",justifyContent:"center",
    gap:6,fontSize:fs,padding:pad,height:h,opacity:disabled?0.5:1,
    fontFamily:"inherit",lineHeight:1,...(vs[variant]||vs.default),...style};
  if(as==="a") return <a href={href} target="_blank" style={{...base,textDecoration:"none"}}>{children}</a>;
  return <button onClick={onClick} disabled={disabled} style={base}>{children}</button>;
}

function Input({ label, hint, t, leftIcon, rightElement, ...props }) {
  const [focus,setFocus]=useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {label&&<label style={{fontSize:13,fontWeight:500,color:t.text}}>{label}</label>}
      <div style={{position:"relative",display:"flex",alignItems:"center"}}>
        {leftIcon&&<span style={{position:"absolute",left:10,pointerEvents:"none",zIndex:1,display:"flex",alignItems:"center",color:t.text3}}>{leftIcon}</span>}
        <input {...props} onFocus={e=>{setFocus(true);props.onFocus&&props.onFocus(e);}} onBlur={e=>{setFocus(false);props.onBlur&&props.onBlur(e);}}
          style={{width:"100%",boxSizing:"border-box",background:t.bg2,border:`1px solid ${focus?t.text3:t.border}`,
            borderRadius:8,padding:`10px ${rightElement?"40px":"12px"} 10px ${leftIcon?"36px":"12px"}`,
            color:t.text,fontSize:14,outline:"none",fontFamily:"inherit",transition:"border-color .15s",...props.style}}/>
        {rightElement&&<div style={{position:"absolute",right:8}}>{rightElement}</div>}
      </div>
      {hint&&<span style={{fontSize:12,color:t.text3}}>{hint}</span>}
    </div>
  );
}

function Card({ children, style={}, t, onClick, hover=true }) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>hover&&setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:t.card,border:`1px solid ${hov&&onClick?t.border2:t.border}`,borderRadius:12,
        overflow:"hidden",transition:"all .15s",cursor:onClick?"pointer":"default",...style}}>
      {children}
    </div>
  );
}

function Modal({ children, onClose, t, maxW=480 }) {
  return (
    <div style={{position:"fixed",inset:0,background:t.overlay,display:"flex",alignItems:"center",
      justifyContent:"center",zIndex:2000,backdropFilter:"blur(4px)",padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:t.card,border:`1px solid ${t.border}`,
        borderRadius:12,width:"100%",maxWidth:maxW,maxHeight:"90vh",overflow:"auto",
        boxShadow:t.shadowLg}}>{children}</div>
    </div>
  );
}

function Sheet({ children, onClose, t }) {
  return (
    <div style={{position:"fixed",inset:0,background:t.overlay,display:"flex",alignItems:"flex-end",
      justifyContent:"center",zIndex:1500,backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:t.bg,border:`1px solid ${t.border}`,
        borderTopLeftRadius:16,borderTopRightRadius:16,width:"100%",maxWidth:680,
        maxHeight:"94vh",overflow:"auto",boxShadow:t.shadowLg}}>{children}</div>
    </div>
  );
}

function SectionTitle({ children, sub, action, t }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}>
      <div>
        <h2 style={{margin:0,fontSize:18,fontWeight:600,color:t.text,letterSpacing:"-0.3px"}}>{children}</h2>
        {sub&&<p style={{margin:"4px 0 0",color:t.text3,fontSize:13}}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Tabs({ tabs, active, onChange, t }) {
  return (
    <div style={{display:"flex",borderBottom:`1px solid ${t.border}`}}>
      {tabs.map(tab=>(
        <button key={tab.id} onClick={()=>onChange(tab.id)}
          style={{padding:"10px 16px",border:"none",background:"none",cursor:"pointer",fontSize:13,
            fontWeight:active===tab.id?500:400,color:active===tab.id?t.text:t.text3,
            borderBottom:`2px solid ${active===tab.id?t.text:"transparent"}`,
            marginBottom:-1,transition:"all .15s",fontFamily:"inherit"}}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function Separator({ t }) {
  return <div style={{height:1,background:t.border,margin:"8px 0"}}/>;
}

// ─── PHONE AUTH ────────────────────────────────────────────────────────────────
function PhoneAuth({ onClose, onAuth, mode:initMode="login", t, dbCities=[], dbProfessions=[] }) {
  const [mode,setMode]=useState(initMode); // login | register
  const [step,setStep]=useState("phone"); // phone | otp | name | pending
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState(["","","","","",""]);
  const [name,setName]=useState("");
  const [bio,setBio]=useState("");
  const [professions,setProfessions]=useState([]);
  const [city,setCity]=useState("");
  const [err,setErr]=useState("");
  const [saving,setSaving]=useState(false);
  const refs=useRef([]);

  const fmtPhone = v => { const d=v.replace(/\D/g,"").slice(0,10); if(d.length<=4)return d; if(d.length<=7)return `${d.slice(0,4)} ${d.slice(4)}`; return `${d.slice(0,4)} ${d.slice(4,7)} ${d.slice(7)}`; };

  const sendOTP = async () => {
    const digits = phone.replace(/\D/g,"");
    if(digits.length<10){setErr("Numéro invalide (10 chiffres)");return;}
    setErr(""); setSaving(true);
    const digits0 = digits.startsWith("0") ? digits.slice(1) : digits;
    const fullPhone = "+212" + digits0;
    const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
    setSaving(false);
    if(error){ setErr("Erreur SMS: "+error.message); return; }
    setStep("otp");
  };

  const checkOTP = async () => {
    if(otp.join("").length<6)return;
    setSaving(true); setErr("");
    const digits = phone.replace(/\D/g,"");
    const digits0 = digits.startsWith("0") ? digits.slice(1) : digits;
    const fullPhone = "+212" + digits0;
    const { data, error } = await supabase.auth.verifyOtp({ phone: fullPhone, token: otp.join(""), type:"sms" });
    setSaving(false);
    if(error){ setErr("Code incorrect ou expiré"); return; }
    if(mode==="register") setStep("name");
    else {
      // Check if this phone belongs to an existing worker
      // Try all phone formats: 612345678, 0612345678, full digits
      const phoneVariants = [...new Set([digits0, "0"+digits0, digits, "0"+digits])];
      let worker = null;
      for(const ph of phoneVariants){
        const { data, error:pErr } = await supabase
          .from("workers")
          .select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`)
          .eq("phone", ph)
          .maybeSingle();
        if(data && !pErr){ worker = data; break; }
      }
      if(worker){
        const shaped = {
          ...worker,
          city: worker.city?.name||"",
          professions:(worker.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
          professionData:(worker.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
          reviews:(worker.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
          portfolio:(worker.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
          initials:worker.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),
          gi:0,
        };
        const role = worker.status==="approved"?"worker":worker.status==="pending"?"pending":"rejected";
        onAuth({ name:worker.name, phone:digits0, role, status:worker.status, id:worker.id, workerData:shaped, avatarUrl:worker.avatar_url||null });
      } else {
        // New consumer - ask for their name
        setStep("name");
      }
    }
  };

  const handleOtp = (val,idx) => {
    const v=val.replace(/\D/g,"").slice(0,1);
    const next=[...otp]; next[idx]=v; setOtp(next);
    if(v&&idx<5) refs.current[idx+1]?.focus();
    if(otp.join("").length===5&&v) setTimeout(checkOTP,200);
  };

  const submitRegister = async () => {
    if(!name.trim()){setErr("Entrez votre nom");return;}
    if(mode==="register"&&professions.length===0){setErr("Sélectionnez au moins un métier");return;}
    if(mode==="register"&&!city){setErr("Sélectionnez votre ville");return;}
    if(mode==="register"){
      setSaving(true); setErr("");
      try {
        // Find city UUID from DB cities
        const cityRow = dbCities.find(c=>c.name===city);
        if(!cityRow) throw new Error("Ville introuvable dans la base de données");

        // Insert worker with status=pending
        const { data:newWorker, error:wErr } = await supabase
          .from("workers")
          .insert({ name:name.trim(), phone:phone.replace(/\D/g,""), city_id:cityRow.id, bio:bio.trim(), available:false, status:"pending" })
          .select().single();
        if(wErr) throw wErr;

        // Link professions — professions state holds UUIDs from dbProfessions
        if(professions.length && newWorker){
          const { error:pErr } = await supabase.from("worker_professions").insert(
            professions.map(pid=>({ worker_id:newWorker.id, profession_id:pid }))
          );
          if(pErr) throw pErr;
        }
        setStep("pending");
      } catch(e){
        if(e.message?.includes("workers_phone_key"))
          setErr("Ce numéro est déjà inscrit. Connectez-vous plutôt.");
        else
          setErr("Erreur: "+e.message);
      }
      setSaving(false);
    } else {
      // Consumer login - just set name and auth
      onAuth({name:name.trim(), phone:phone.replace(/\D/g,"").replace(/^0/,""), role:"consumer", status:"active"});
    }
  };

  const toggleProf = pid => { const s=String(pid); setProfessions(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]); };

  return (
    <Modal onClose={onClose} t={t} maxW={440}>
      <div style={{padding:"32px 28px"}}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:48,height:48,borderRadius:10,background:t.bg2,border:`1px solid ${t.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
            <Icon d={step==="phone"?IC.phone:step==="otp"?IC.shield:step==="pending"?IC.clock:IC.check}
              size={20} color={t.text2}/>
          </div>
          <h2 style={{margin:"0 0 8px",fontSize:22,fontWeight:900,color:t.text}}>
            {step==="phone"?"Connexion / Inscription":step==="otp"?"Vérification":step==="pending"?"Demande envoyée!":step==="name"&&mode==="register"?"Votre profil":"Votre nom"}
          </h2>
          <p style={{color:t.text2,margin:0,fontSize:14,lineHeight:1.6}}>
            {step==="phone"?"Entrez votre numéro marocain":step==="otp"?`Code envoyé au +212 ${phone.replace(/\D/g,"").slice(1)}`:step==="pending"?"Votre compte artisan est en cours de validation":step==="name"&&mode==="register"?"Complétez votre profil artisan":"Comment vous appelez-vous?"}
          </p>
        </div>

        {/* Toggle consumer / worker for register */}
        {step==="phone"&&(
          <div style={{display:"flex",background:t.bg2,borderRadius:12,padding:4,marginBottom:20,border:`1px solid ${t.border}`}}>
            {[{id:"login",l:"Se connecter"},{id:"register",l:"S'inscrire artisan"}].map(m=>(
              <button key={m.id} onClick={()=>setMode(m.id)}
                style={{flex:1,padding:"8px",borderRadius:6,border:"none",cursor:"pointer",
                  fontWeight:500,fontSize:12,background:mode===m.id?t.bg3:"transparent",
                  color:mode===m.id?t.text:t.text3,transition:"all .15s",fontFamily:"inherit"}}>
                {m.l}
              </button>
            ))}
          </div>
        )}

        {/* STEP: phone */}
        {step==="phone"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"flex",border:`1.5px solid ${t.border}`,borderRadius:10,overflow:"hidden",background:t.input}}>
              <div style={{padding:"10px 12px",background:t.bg2,borderRight:`1px solid ${t.border}`,fontSize:13,fontWeight:500,color:t.text2,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:14}}>🇲🇦</span>+212
              </div>
              <input value={phone} onChange={e=>setPhone(fmtPhone(e.target.value))} placeholder="06XX XX XX XX" maxLength={12}
                style={{flex:1,background:"transparent",border:"none",padding:"11px 14px",color:t.text,fontSize:15,outline:"none",fontFamily:"inherit",letterSpacing:"0.5px"}}/>
            </div>
            {err&&<div style={{background:t.dangerLight,border:`1px solid ${t.danger}40`,borderRadius:8,padding:"9px 12px",color:t.danger,fontSize:13}}>{err}</div>}
            <Btn t={t} size="lg" onClick={sendOTP} style={{width:"100%"}} disabled={saving}>{saving?"Envoi du SMS...":"Recevoir le code →"}</Btn>
            <p style={{color:t.text3,fontSize:11,textAlign:"center",lineHeight:1.6,margin:"4px 0 0"}}>
              En continuant, vous acceptez nos{" "}
              <a href="/terms.html" target="_blank" style={{color:t.primary,textDecoration:"none"}}>Conditions d'utilisation</a>
              {" "}et notre{" "}
              <a href="/privacy.html" target="_blank" style={{color:t.primary,textDecoration:"none"}}>Politique de confidentialité</a>.
            </p>
          </div>
        )}

        {/* STEP: otp */}
        {step==="otp"&&(
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              {otp.map((d,i)=>(
                <input key={i} ref={el=>refs.current[i]=el} value={d} onChange={e=>handleOtp(e.target.value,i)} onKeyDown={e=>{if(e.key==="Backspace"&&!d&&i>0)refs.current[i-1]?.focus();}} inputMode="numeric" maxLength={1}
                  style={{width:52,height:58,textAlign:"center",fontSize:24,fontWeight:800,background:t.input,border:`2px solid ${d?t.primary:t.border}`,borderRadius:12,color:t.text,outline:"none",fontFamily:"inherit",transition:"border-color .15s"}}/>
              ))}
            </div>
            <Btn t={t} style={{width:"100%"}} onClick={checkOTP} disabled={otp.join("").length<6}>Confirmer →</Btn>
            <button onClick={()=>setStep("phone")} style={{background:"none",border:"none",color:t.text3,cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>← Changer de numéro</button>
            <div style={{background:t.bg2,borderRadius:8,padding:"9px 12px",border:`1px solid ${t.border}`,fontSize:11,color:t.text3,textAlign:"center"}}>Le code SMS peut prendre 1-2 minutes. Vérifiez que votre numéro commence par 06 ou 07.</div>
          </div>
        )}

        {/* STEP: name + profile (register) */}
        {step==="name"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <Input t={t} label="NOM COMPLET *" placeholder="Ex: Youssef El Fassi" value={name} onChange={e=>setName(e.target.value)} leftIcon={<Icon d={IC.user} size={14} color={t.text3}/>}/>
            {mode==="register"&&(
              <>
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.6px",textTransform:"uppercase",display:"block",marginBottom:8}}>MÉTIER(S) *</label>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                    {(dbProfessions.length?dbProfessions:PROFESSIONS).map(p=>(
                      <button key={p.id} onClick={()=>toggleProf(p.id)} style={{padding:"8px 4px",borderRadius:10,border:`1px solid ${professions.includes(String(p.id))?p.color:t.border}`,background:professions.includes(String(p.id))?p.color+"18":t.bg2,color:professions.includes(String(p.id))?p.color:t.text3,cursor:"pointer",textAlign:"center",fontSize:9,fontWeight:700,fontFamily:"inherit"}}>
                        <div style={{fontSize:18}}>{p.icon}</div>
                        <div style={{marginTop:3}}>{p.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.6px",textTransform:"uppercase",display:"block",marginBottom:6}}>VILLE *</label>
                  <select value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%",background:t.input,border:`1.5px solid ${t.border}`,borderRadius:10,padding:"11px 12px",color:city?t.text:t.text3,fontSize:14,fontFamily:"inherit",outline:"none"}}>
                    <option value="">Sélectionner votre ville...</option>
                    {(dbCities.length?dbCities:CITIES).map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.6px",textTransform:"uppercase",display:"block",marginBottom:6}}>BIO <span style={{color:t.text3,fontWeight:400,textTransform:"none"}}>(optionnel)</span></label>
                  <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Décrivez votre expérience, spécialités, années d'expérience..." rows={3}
                    style={{width:"100%",boxSizing:"border-box",background:t.input,border:`1.5px solid ${t.border}`,borderRadius:10,padding:"11px 12px",color:t.text,fontSize:14,resize:"none",fontFamily:"inherit",outline:"none"}}/>
                </div>
              </>
            )}
            {err&&<div style={{background:t.dangerLight,border:`1px solid ${t.danger}40`,borderRadius:8,padding:"9px 12px",color:t.danger,fontSize:13}}>{err}</div>}
            <Btn t={t} size="lg" onClick={submitRegister} style={{width:"100%"}} disabled={saving}>{saving?"Envoi en cours...":mode==="register"?"Envoyer ma demande →":"Commencer →"}</Btn>
            {mode==="register"&&(
              <p style={{color:t.text3,fontSize:11,textAlign:"center",lineHeight:1.6,margin:"4px 0 0"}}>
                En soumettant votre demande, vous acceptez nos{" "}
                <a href="/terms.html" target="_blank" style={{color:t.primary,textDecoration:"none"}}>Conditions d'utilisation</a>
                {" "}et notre{" "}
                <a href="/privacy.html" target="_blank" style={{color:t.primary,textDecoration:"none"}}>Politique de confidentialité</a>.
              </p>
            )}
          </div>
        )}

        {/* STEP: pending */}
        {step==="pending"&&(
          <div style={{textAlign:"center"}}>
            <div style={{background:`linear-gradient(135deg,${t.primary}15,${t.secondary}15)`,borderRadius:16,padding:"24px",border:`1px solid ${t.primary}30`,marginBottom:20}}>
              <div style={{fontSize:48,marginBottom:12}}>⏳</div>
              <h3 style={{margin:"0 0 8px",color:t.text,fontSize:17,fontWeight:800}}>Demande reçue!</h3>
              <p style={{color:t.text2,fontSize:13,lineHeight:1.7,margin:0}}>
                Votre profil artisan est en cours de vérification. Vous recevrez un <strong style={{color:t.text}}>SMS de confirmation</strong> dans les <strong style={{color:t.primary}}>24 heures</strong>.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {["Vérification de votre numéro","Validation par notre équipe (24h)","SMS de confirmation","Accès à votre espace artisan"].map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:i<1?t.successLight:t.bg2,border:`1px solid ${i<1?t.success+"40":t.border}`,borderRadius:10}}>
                  <span style={{fontSize:14}}>{s.split(" ")[0]}</span>
                  <span style={{fontSize:13,color:i<1?t.success:t.text2,fontWeight:i<1?700:400}}>{s.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
            <Btn t={t} style={{width:"100%"}} onClick={onClose}>Fermer</Btn>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ─── WORKER CARD ───────────────────────────────────────────────────────────────
function WorkerCard({ worker, onClick, isFav, onToggleFav, t }) {
  const [hov,setHov]=useState(false);
  const rating=avg(worker.reviews);
  const profs=(worker.professionData && worker.professionData.length>0)
    ? worker.professionData.filter(Boolean)
    : worker.professions.map(pid=>PROFESSIONS.find(p=>p.id===pid)).filter(Boolean);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:t.card,border:`1px solid ${hov?t.border2:t.border}`,borderRadius:12,
        overflow:"hidden",cursor:"pointer",transition:"all .15s"}}>
      {/* Portfolio strip */}
      {worker.portfolio.length>0&&(
        <div onClick={()=>onClick(worker)} style={{height:80,display:"flex",gap:0,flexShrink:0}}>
          {worker.portfolio.slice(0,3).map((item,i)=>(
            item.url
              ? <img key={item.id} src={item.url} alt="" style={{flex:i===0?2:1,objectFit:"cover",minWidth:0}}/>
              : <PortfolioGrad key={item.id} gi={item.gi} style={{flex:i===0?2:1}}/>
          ))}
        </div>
      )}
      <div onClick={()=>onClick(worker)} style={{padding:"14px 16px"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{position:"relative",flexShrink:0,marginTop:worker.portfolio.length?"-20px":0,zIndex:1}}>
            <div style={{border:`2px solid ${t.card}`,borderRadius:"50%",display:"inline-block"}}>
              <Avatar worker={worker} size={40} t={t}/>
            </div>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:14,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{worker.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:4,color:t.text3,fontSize:12,marginTop:2}}>
              <Icon d={IC.mapPin} size={11} color={t.text3}/>{worker.city}
            </div>
          </div>
          <AvailBadge available={worker.available} t={t}/>
        </div>
        {profs.length>0&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:10}}>
            {profs.map(p=><Badge key={p.id} t={t} style={{fontSize:11,color:t.text3}}>{p.name}</Badge>)}
          </div>
        )}
      </div>
      <div style={{padding:"10px 16px",borderTop:`1px solid ${t.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {rating
            ?<><Stars rating={parseFloat(rating)} size={11} t={t}/>
              <span style={{color:t.text2,fontSize:12,fontWeight:500}}>{rating}</span>
              <span style={{color:t.text3,fontSize:11}}>({worker.reviews.length})</span></>
            :<span style={{color:t.text3,fontSize:12}}>Aucun avis</span>}
        </div>
        <button onClick={e=>{e.stopPropagation();onToggleFav&&onToggleFav();}}
          style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,
            borderRadius:6,border:`1px solid ${isFav?t.danger+"40":t.border}`,
            background:isFav?t.dangerLight:"transparent",cursor:"pointer",transition:"all .15s",flexShrink:0}}>
          <Icon d={IC.heart} size={13} color={isFav?t.danger:t.text3}
            style={{fill:isFav?t.danger:"none",stroke:isFav?t.danger:t.text3}}/>
        </button>
      </div>
    </div>
  );
}

// ─── MAP VIEW ──────────────────────────────────────────────────────────────────
function MapView({ workers, onSelect, t }) {
  const [sel,setSel]=useState(null);
  const W=600,H=400;
  const BOUNDS={minLat:27.5,maxLat:36,minLng:-13.5,maxLng:0};
  const proj=(lat,lng)=>({x:((lng-BOUNDS.minLng)/(BOUNDS.maxLng-BOUNDS.minLng))*W,y:H-((lat-BOUNDS.minLat)/(BOUNDS.maxLat-BOUNDS.minLat))*H});
  const byCity={};
  workers.forEach(w=>{if(!byCity[w.city])byCity[w.city]=[];byCity[w.city].push(w);});
  return (
    <div style={{borderRadius:16,overflow:"hidden",border:`1px solid ${t.border}`,position:"relative"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}}>
        <rect width={W} height={H} fill="#0A1628"/>
        {[...Array(7)].map((_,i)=><line key={`h${i}`} x1={0} y1={i*57} x2={W} y2={i*57} stroke="#ffffff05" strokeWidth="1"/>)}
        {[...Array(9)].map((_,i)=><line key={`v${i}`} x1={i*67} y1={0} x2={i*67} y2={H} stroke="#ffffff05" strokeWidth="1"/>)}
        <path d="M80,40 L220,10 L480,30 L580,120 L560,200 L520,300 L460,380 L360,410 L200,400 L100,350 L60,250 L40,150 Z" fill="#0F2240" stroke="#1E3A6A" strokeWidth="1.5"/>
        {CITIES.map(city=>{
          const pos=proj(city.lat,city.lng);
          const cw=byCity[city.name]||[];
          const avail=cw.filter(w=>w.available).length;
          if(!cw.length)return null;
          const isSel=sel===city.name;
          return (
            <g key={city.id} onClick={()=>setSel(isSel?null:city.name)} style={{cursor:"pointer"}}>
              {avail>0&&<circle cx={pos.x} cy={pos.y} r={isSel?30:22} fill="none" stroke={t.primary} strokeWidth="1.5" opacity={isSel?0.6:0.25}/>}
              <circle cx={pos.x} cy={pos.y} r={isSel?16:12} fill={isSel?t.primary:"#1E3A6A"} stroke={isSel?t.primaryDark:avail>0?t.primary+"60":"#2d4a7a"} strokeWidth={1.5}/>
              <text x={pos.x} y={pos.y+0.5} textAnchor="middle" dominantBaseline="middle" fill={isSel?"#fff":"#7aadda"} fontSize={isSel?10:9} fontWeight="800">{cw.length}</text>
              <text x={pos.x} y={pos.y+(isSel?27:20)} textAnchor="middle" fill={isSel?t.primary:"#4a7aaa"} fontSize={isSel?9:8} fontWeight={isSel?"700":"500"}>{city.name}</text>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div style={{position:"absolute",top:10,right:10,background:"rgba(10,22,40,0.9)",backdropFilter:"blur(8px)",borderRadius:10,padding:"8px 12px",border:"1px solid #1E3A6A"}}>
        <div style={{fontSize:10,color:"#4a7aaa",fontWeight:700,marginBottom:5,letterSpacing:"0.5px"}}>ARTISANS</div>
        {[{c:t.primary,l:"Disponibles"},{c:"#1E3A6A",l:"Indisponibles"}].map(x=>(
          <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:x.c,border:`1px solid ${x.c}`}}/>
            <span style={{color:"#7aadda",fontSize:10}}>{x.l}</span>
          </div>
        ))}
      </div>
      {/* City popup */}
      {sel&&byCity[sel]&&(
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:t.card,borderTop:`1px solid ${t.border}`,padding:"14px 16px",maxHeight:240,overflow:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontWeight:800,fontSize:15,color:t.text}}>{sel} ({byCity[sel].length})</span>
            <button onClick={()=>setSel(null)} style={{background:"transparent",border:`1px solid ${t.border}`,borderRadius:6,width:26,height:26,color:t.text3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Icon d={IC.x} size={12} color={t.text3}/>
            </button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {byCity[sel].map(w=>{
              const profs=w.professions.map(pid=>PROFESSIONS.find(p=>p.id===pid)).filter(Boolean);
              const rating=avg(w.reviews);
              return (
                <div key={w.id} onClick={()=>onSelect(w)} style={{display:"flex",gap:10,alignItems:"center",background:t.bg2,borderRadius:10,padding:"10px 12px",cursor:"pointer",border:`1px solid ${t.border}`}}>
                  <Avatar worker={w} size={38} t={t}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{w.name}</div>
                    <div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap"}}>
                      {profs.map(p=><span key={p.id} style={{fontSize:10,color:t.text3,fontWeight:400}}>{p.name}</span>)}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3}}>
                    {rating&&<div style={{display:"flex",alignItems:"center",gap:3}}><Stars rating={parseFloat(rating)} size={10} t={t}/><span style={{color:t.accent,fontSize:10,fontWeight:700}}>{rating}</span></div>}
                    <AvailBadge available={w.available} t={t}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WORKER SHEET ──────────────────────────────────────────────────────────────
function WorkerSheet({ worker, onClose, onReview, currentUser, onNeedAuth, isFav, onToggleFav, reviewAutoSubmitted=false, t }) {
  const [tab,setTab]=useState(reviewAutoSubmitted?"reviews":"profile");
  const [rf,setRf]=useState({rating:5,comment:"",workType:""});
  const [done,setDone]=useState(reviewAutoSubmitted);
  const [saving,setSaving]=useState(false);
  const [lightbox,setLightbox]=useState(null);
  const [showAuthPrompt,setShowAuthPrompt]=useState(false); // inline auth nudge
  const rating=avg(worker.reviews);
  const profs=(worker.professionData && worker.professionData.length>0)
    ? worker.professionData.filter(Boolean)
    : worker.professions.map(pid=>PROFESSIONS.find(p=>p.id===pid)).filter(Boolean);

  // Called after login completes — auto-submit pending review
  useEffect(()=>{
    if(currentUser && showAuthPrompt && rf.comment.trim() && rf.workType){
      setShowAuthPrompt(false);
      handleSubmitReview();
    }
  },[currentUser]);

  const handleSubmitReview = async () => {
    if(!rf.comment.trim()||!rf.workType) return;
    setSaving(true);
    await onReview(worker.id,{...rf,author:currentUser.name});
    setSaving(false);
    setDone(true);
  };

  const submitReview = () => {
    if(!currentUser){
      // Save their progress and show auth prompt inside the sheet
      setShowAuthPrompt(true);
      return;
    }
    handleSubmitReview();
  };

  return (
    <Sheet onClose={onClose} t={t}>
      <div style={{padding:"12px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{width:32,height:4,borderRadius:2,background:t.border2,margin:"0 auto"}}/>
        <button onClick={onToggleFav}
          style={{position:"absolute",right:16,top:12,display:"flex",alignItems:"center",gap:6,
            padding:"6px 10px",borderRadius:8,border:`1px solid ${isFav?t.danger+"40":t.border}`,
            background:isFav?t.dangerLight:"transparent",cursor:"pointer",color:isFav?t.danger:t.text3,
            fontSize:12,fontWeight:500,fontFamily:"inherit",transition:"all .15s"}}>
          <Icon d={IC.heart} size={13} color={isFav?t.danger:t.text3}
            style={{fill:isFav?t.danger:"none",stroke:isFav?t.danger:t.text3}}/>
          {isFav?"Sauvegardé":"Sauvegarder"}
        </button>
      </div>
      {/* Hero strip */}
      {worker.portfolio.length>0&&(
        <div style={{height:130,display:"flex",gap:1,margin:"10px 0 0"}}>
          {worker.portfolio.slice(0,4).map((item,i)=>(
            item.url
              ? <img key={item.id} src={item.url} alt="" style={{flex:i===0?3:1,objectFit:"cover",minWidth:0,cursor:"pointer",height:"100%"}} onClick={()=>setLightbox(item)}/>
              : <PortfolioGrad key={item.id} gi={item.gi} style={{flex:i===0?3:1,cursor:"pointer"}} onClick={()=>setLightbox(item)}/>
          ))}
        </div>
      )}
      {/* Profile header */}
      <div style={{padding:"0 20px 16px"}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-end",marginTop:worker.portfolio.length?"-28px":12}}>
          <div style={{border:`4px solid ${t.card}`,borderRadius:"50%",display:"inline-block",zIndex:1,position:"relative"}}>
            <Avatar worker={worker} size={68} t={t}/>
          </div>
          <div style={{paddingBottom:4}}>
            <h2 style={{margin:0,fontSize:21,fontWeight:900,color:t.text}}>{worker.name}</h2>
            <div style={{display:"flex",alignItems:"center",gap:4,color:t.text3,fontSize:13,marginTop:3}}><Icon d={IC.mapPin} size={12} color={t.text3}/>{worker.city}</div>
          </div>
          <div style={{marginLeft:"auto",paddingBottom:4}}><AvailBadge available={worker.available} t={t}/></div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>
          {profs.map(p=>(
            <Badge key={p.id} t={t} color={t.border2} style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,color:t.text2,padding:"3px 10px"}}>
              <ProfIcon iconKey={p.icon||"wrench_"} size={11} color={t.text3}/>{p.name}
            </Badge>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <a href={`tel:${worker.phone}`}
            style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              padding:"12px",background:t.cta,color:t.ctaText,borderRadius:8,textDecoration:"none",
              fontWeight:500,fontSize:14,border:`1px solid ${t.ctaBorder}`}}>
            <Icon d={IC.phone} size={15} color={t.ctaText}/>
            Appeler
          </a>
          <a href={`https://wa.me/${worker.phone.replace(/\D/g,"").replace(/^0/,"212")}?text=${encodeURIComponent("Bonjour, j'ai trouvé votre profil sur AloAji. Est-ce que vous êtes disponible pour un devis ?")}`}
            target="_blank" rel="noopener noreferrer"
            style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              padding:"12px",background:"#25D366",color:"#fff",borderRadius:8,textDecoration:"none",
              fontWeight:500,fontSize:14,border:"none"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Tabs */}
      <Tabs t={t} active={tab} onChange={setTab} tabs={[{id:"profile",label:"Profil"},{id:"portfolio",label:`Portfolio (${worker.portfolio.length})`},{id:"reviews",label:`Avis (${worker.reviews.length})`}]}/>

      <div style={{padding:"20px 20px 40px"}}>
        {/* PROFILE */}
        {tab==="profile"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {worker.bio&&<div style={{background:t.bg2,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.border}`}}>
              <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.5px",marginBottom:6}}>À PROPOS</div>
              <p style={{margin:0,color:t.text2,fontSize:14,lineHeight:1.7}}>{worker.bio}</p>
            </div>}
            {rating&&(
              <div style={{background:t.bg2,borderRadius:12,padding:"16px",border:`1px solid ${t.border}`,display:"flex",gap:16,alignItems:"center"}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:38,fontWeight:900,color:t.accent,lineHeight:1}}>{rating}</div>
                  <Stars rating={parseFloat(rating)} size={15} t={t}/>
                  <div style={{color:t.text3,fontSize:11,marginTop:4}}>{worker.reviews.length} avis</div>
                </div>
                <div style={{flex:1,borderLeft:`1px solid ${t.border}`,paddingLeft:16}}>
                  {[5,4,3,2,1].map(s=>{const c=worker.reviews.filter(r=>r.rating===s).length,pct=worker.reviews.length?(c/worker.reviews.length)*100:0;return(
                    <div key={s} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                      <span style={{color:t.accent,fontSize:11,width:8}}>{s}</span>
                      <div style={{flex:1,height:5,background:t.border,borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:t.accent,borderRadius:3}}/></div>
                      <span style={{color:t.text3,fontSize:10,width:12}}>{c}</span>
                    </div>
                  );})}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PORTFOLIO */}
        {tab==="portfolio"&&(
          worker.portfolio.length===0
          ?<div style={{textAlign:"center",padding:"40px",color:t.text3}}><Icon d={IC.image} size={32} color={t.text3}/><p style={{fontSize:13,color:t.text3,marginTop:8}}>Pas encore de photos</p></div>
          :<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
            {worker.portfolio.map(item=>(
              <div key={item.id} onClick={()=>setLightbox(item)} style={{borderRadius:12,overflow:"hidden",cursor:"pointer",border:`1px solid ${t.border}`}}>
                {item.url
                  ? <img src={item.url} alt={item.caption} style={{width:"100%",height:120,objectFit:"cover"}}/>
                  : <PortfolioGrad gi={item.gi} style={{height:120}}/>}
                <div style={{padding:"8px 10px",background:t.bg2,fontSize:12,fontWeight:600,color:t.text2}}>{item.caption}</div>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS */}
        {tab==="reviews"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {worker.reviews.map(r=>{
              const wt=WORK_TYPES.find(wt=>wt.id===r.workType);
              return (
                <div key={r.id} style={{background:t.bg2,borderRadius:12,padding:"14px",border:`1px solid ${t.border}`}}>
                  <div style={{display:"flex",gap:10,marginBottom:10}}>
                    {/* Avatar with first letter */}
                    <div style={{width:36,height:36,borderRadius:"50%",background:t.bg3,border:`1px solid ${t.border2}`,
                      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                      fontSize:14,fontWeight:600,color:t.text2}}>
                      {(r.author||"?")[0].toUpperCase()}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div>
                          <span style={{fontWeight:600,fontSize:14,color:t.text}}>
                            {/* Show first name only */}
                            {(r.author||"Anonyme").split(" ")[0]}
                          </span>
                          <span style={{color:t.text3,fontSize:11,marginLeft:6}}>{r.date}</span>
                        </div>
                        {wt&&<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,
                          padding:"2px 8px",borderRadius:6,border:`1px solid ${t.border}`,color:t.text3,whiteSpace:"nowrap",flexShrink:0}}>
                          <Icon d={IC[wt.icon]} size={10} color={t.text3}/>{wt.label}
                        </span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:4,marginTop:3}}>
                        <Stars rating={r.rating} size={11} t={t}/>
                      </div>
                    </div>
                  </div>
                  {r.comment&&<p style={{margin:"0 0 0 46px",color:t.text2,fontSize:13,lineHeight:1.6}}>{r.comment}</p>}
                </div>
              );
            })}
            {/* Leave review */}
            <div style={{background:t.bg2,borderRadius:14,padding:"18px",border:`1px solid ${t.border}`,marginTop:4}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:14,fontWeight:700,color:t.text}}>Laisser un avis</div>
                {!currentUser&&<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,color:t.text3,fontWeight:500}}>
                  <Icon d={IC.shield} size={11} color={t.text3}/>Connexion requise
                </span>}
                {currentUser&&<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,color:t.success,fontWeight:500}}>
                  <Icon d={IC.check} size={11} color={t.success}/>{currentUser.name}
                </span>}
              </div>
              {done?(
                <div style={{textAlign:"center",padding:"28px 20px",background:t.successLight,
                  borderRadius:10,border:`1px solid ${t.success}30`}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:t.success+"20",
                    display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                    <Icon d={IC.check} size={22} color={t.success}/>
                  </div>
                  <div style={{color:t.text,fontWeight:600,fontSize:15,marginBottom:4}}>Avis publié!</div>
                  <div style={{color:t.text3,fontSize:13}}>Merci pour votre retour.</div>
                </div>
              ):showAuthPrompt?(
                /* ── Auth nudge overlay ── */
                <div style={{borderRadius:10,border:`1px solid ${t.border}`,overflow:"hidden"}}>
                  {/* Preview of saved review */}
                  <div style={{padding:"14px 16px",background:t.bg2,borderBottom:`1px solid ${t.border}`}}>
                    <div style={{fontSize:11,color:t.text3,marginBottom:8,fontWeight:500}}>VOTRE AVIS (SAUVEGARDÉ)</div>
                    <div style={{display:"flex",gap:3,alignItems:"center",marginBottom:6}}>
                      {[1,2,3,4,5].map(s=><Icon key={s} d={IC.star} size={13}
                        color={s<=rf.rating?t.accent:t.border2}
                        style={{fill:s<=rf.rating?t.accent:"none"}}/>)}
                      <span style={{marginLeft:6,fontSize:12,color:t.text2}}>
                        {rf.workType&&WORK_TYPES.find(w=>w.id===rf.workType)?.label}
                      </span>
                    </div>
                    {rf.comment&&<p style={{margin:0,fontSize:13,color:t.text2,fontStyle:"italic",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      "{rf.comment}"
                    </p>}
                  </div>
                  {/* Login prompt */}
                  <div style={{padding:"18px 16px",textAlign:"center"}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:t.bg3,
                      display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                      <Icon d={IC.user} size={18} color={t.text3}/>
                    </div>
                    <div style={{fontWeight:600,fontSize:14,color:t.text,marginBottom:4}}>
                      Connexion requise
                    </div>
                    <div style={{fontSize:13,color:t.text3,marginBottom:16}}>
                      Votre avis est prêt — connectez-vous pour le publier automatiquement.
                    </div>
                    <Btn t={t} style={{width:"100%",marginBottom:8}}
                      onClick={()=>onNeedAuth({rating:rf.rating,comment:rf.comment,workType:rf.workType})}>
                      <Icon d={IC.user} size={13} color={t.ctaText}/>Se connecter et publier
                    </Btn>
                    <button onClick={()=>setShowAuthPrompt(false)}
                      style={{background:"none",border:"none",color:t.text3,fontSize:12,
                        cursor:"pointer",fontFamily:"inherit"}}>
                      Annuler
                    </button>
                  </div>
                </div>
              ):(
                <>
                  {/* Star rating — always interactive */}
                  <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:14}}>
                    {[1,2,3,4,5].map(s=>(
                      <button key={s} onClick={()=>setRf(p=>({...p,rating:s}))}
                        style={{background:"none",border:"none",cursor:"pointer",padding:"2px",lineHeight:0}}
                        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"}
                        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                        <Icon d={IC.star} size={26}
                          color={s<=rf.rating?t.accent:t.border2}
                          style={{fill:s<=rf.rating?t.accent:"none",stroke:s<=rf.rating?t.accent:t.border2,transition:"fill .1s"}}/>
                      </button>
                    ))}
                    <span style={{marginLeft:6,fontSize:13,color:t.text3}}>
                      {rf.rating===1?"Mauvais":rf.rating===2?"Moyen":rf.rating===3?"Bien":rf.rating===4?"Très bien":"Excellent"}
                    </span>
                  </div>

                  {/* Work type — always interactive */}
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,fontWeight:600,color:t.text3,letterSpacing:"0.5px",marginBottom:8,textTransform:"uppercase"}}>Type de travail</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                      {WORK_TYPES.map(wt=>(
                        <button key={wt.id} onClick={()=>setRf(p=>({...p,workType:wt.id}))}
                          style={{padding:"9px 12px",borderRadius:8,
                            border:`1px solid ${rf.workType===wt.id?t.border2:t.border}`,
                            background:rf.workType===wt.id?t.bg3:t.bg,
                            cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all .1s"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <Icon d={IC[wt.icon]} size={14} color={rf.workType===wt.id?t.text:t.text3}/>
                            <div>
                              <div style={{fontSize:12,fontWeight:500,color:rf.workType===wt.id?t.text:t.text2}}>{wt.label}</div>
                              <div style={{fontSize:10,color:t.text3,marginTop:1}}>{wt.desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment — always interactive */}
                  <textarea
                    placeholder="Décrivez votre expérience..."
                    value={rf.comment}
                    onChange={e=>setRf(p=>({...p,comment:e.target.value}))}
                    rows={3}
                    style={{width:"100%",boxSizing:"border-box",background:t.bg2,
                      border:`1px solid ${t.border}`,borderRadius:8,padding:"10px 12px",
                      color:t.text,fontSize:14,resize:"none",marginBottom:10,
                      fontFamily:"inherit",outline:"none"}}/>

                  {/* Submit — always enabled when fields filled, handles auth internally */}
                  <Btn t={t} style={{width:"100%"}}
                    onClick={submitReview}
                    disabled={saving||!rf.workType||!rf.comment.trim()}>
                    {saving
                      ? <><Icon d={IC.loader} size={13} color={t.ctaText}/>Publication...</>
                      : currentUser
                        ? <><Icon d={IC.check} size={13} color={t.ctaText}/>Publier l'avis</>
                        : <><Icon d={IC.phone} size={13} color={t.ctaText}/>Continuer pour publier</>}
                  </Btn>
                  {!currentUser&&rf.workType&&rf.comment.trim()&&(
                    <p style={{textAlign:"center",fontSize:11,color:t.text3,margin:"8px 0 0"}}>
                      Votre avis sera sauvegardé — connexion rapide par SMS
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:3000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setLightbox(null)}>
          <div style={{width:"100%",maxWidth:500,borderRadius:16,overflow:"hidden"}}>
            {lightbox.url
              ? <img src={lightbox.url} alt={lightbox.caption} style={{width:"100%",height:320,objectFit:"cover",borderRadius:12}}/>
              : <PortfolioGrad gi={lightbox.gi} style={{height:320,fontSize:64}}/>}
            <div style={{padding:"14px",background:"#1a1a1a"}}><div style={{color:"#F9FAFB",fontSize:15,fontWeight:600}}>{lightbox.caption}</div></div>
          </div>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:12}}>Appuyez pour fermer</p>
        </div>
      )}
    </Sheet>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ workers, onNavigate, setProfFilter, t, dark }) {
  const [hs,setHs]=useState(""), [hc,setHc]=useState("all");
  const top=[...workers].filter(w=>w.reviews.length>0).sort((a,b)=>(avg(b.reviews)||0)-(avg(a.reviews)||0)).slice(0,4);

  return (
    <div style={{minHeight:"100vh",background:t.bg}}>
      {/* HERO */}
      <div style={{position:"relative",overflow:"hidden",background:t.bg,
        borderBottom:`1px solid ${t.border}`}}>

        <div style={{maxWidth:640,margin:"0 auto",position:"relative",zIndex:1,textAlign:"center",padding:"64px 24px 72px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,
            background:t.bg2,border:`1px solid ${t.border}`,
            borderRadius:20,padding:"5px 14px",marginBottom:22}}>
            <span style={{fontSize:14}}>🇲🇦</span>
            <span style={{fontSize:12,fontWeight:500,color:t.text2}}>Artisans vérifiés au Maroc</span>
          </div>
          <h1 style={{margin:"0 0 16px",fontSize:"clamp(28px,5vw,48px)",fontWeight:600,
            lineHeight:1.12,color:t.text,letterSpacing:"-0.8px"}}>
            Trouvez un artisan<br/>près de chez vous
          </h1>
          <p style={{color:t.text2,fontSize:17,lineHeight:1.7,margin:"0 0 36px"}}>
            Plombier, électricien, peintre… Trouvez le bon artisan au Maroc en quelques clics. Vérifiés, notés, disponibles.
          </p>
          {/* Search card */}
          <div style={{background:t.card,borderRadius:12,padding:16,border:`1px solid ${t.border}`,textAlign:"left",maxWidth:500,marginLeft:"auto",marginRight:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",display:"flex",alignItems:"center",pointerEvents:"none"}}>
                  <Icon d={IC.search} size={14} color={t.text3}/>
                </span>
                <input value={hs} onChange={e=>setHs(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onNavigate("search",{search:hs,city:hc})} placeholder="Ex: Plombier, Peintre..." style={{width:"100%",boxSizing:"border-box",background:t.bg2,border:`1px solid ${t.border}`,borderRadius:8,padding:"10px 12px 10px 36px",color:t.text,fontSize:14,outline:"none",fontFamily:"inherit"}}/>
              </div>
              <select value={hc} onChange={e=>setHc(e.target.value)} style={{background:t.bg2,border:`1px solid ${t.border}`,borderRadius:8,padding:"10px 12px",color:hc==="all"?t.text3:t.text,fontSize:14,fontFamily:"inherit",outline:"none"}}>
                <option value="all">Toutes les villes</option>
                {CITIES.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <Btn t={t} size="lg" onClick={()=>onNavigate("search",{search:hs,city:hc})} style={{width:"100%"}}>
              <Icon d={IC.search} size={15} color={t.ctaText}/>Rechercher
            </Btn>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px 60px"}}>
        {/* Categories */}
        <SectionTitle t={t} sub="Choisissez un métier pour voir les artisans disponibles" action={<Btn t={t} variant="outline" size="sm" onClick={()=>onNavigate("search",{})}>Voir tout</Btn>}>Nos métiers</SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(96px,1fr))",gap:10,marginBottom:48}}>
          {PROFESSIONS.map(p=>{
            const count=workers.filter(w=>w.professions.includes(p.id)&&w.available).length;
            return (
              <button key={p.id} onClick={()=>{setProfFilter(String(p.id));onNavigate("search",{});}}
                style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,padding:"14px 8px",textAlign:"center",cursor:"pointer",transition:"all .15s",fontFamily:"inherit"}}
                onMouseEnter={e=>{e.currentTarget.style.background=t.bg2;}}
                onMouseLeave={e=>{e.currentTarget.style.background=t.card;}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
                  <div style={{width:40,height:40,borderRadius:10,
                    background:dark?p.color+"22":p.bg,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <ProfIcon iconKey={p.icon} size={18} color={p.color}/>
                  </div>
                </div>
                <div style={{fontSize:12,fontWeight:600,color:t.text,marginBottom:2}}>{p.name}</div>
                <div style={{fontSize:11,color:count>0?p.color:t.text3,fontWeight:count>0?500:400}}>{count} dispo</div>
              </button>
            );
          })}
        </div>

        {/* Top rated */}
        <SectionTitle t={t} sub="Les artisans les plus appréciés par nos clients" action={<Btn t={t} variant="outline" size="sm" onClick={()=>onNavigate("search",{})}>Voir tout</Btn>}>Les mieux notés</SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,marginBottom:48}}>
          {top.map(w=>(
            <div key={w.id} onClick={()=>onNavigate("worker",{worker:w})}
              style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,padding:"14px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",transition:"background .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=t.bg2;}}
              onMouseLeave={e=>{e.currentTarget.style.background=t.card;}}>
              <Avatar worker={w} size={50} t={t}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:14,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{w.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:3,color:t.text3,fontSize:12}}>
              <Icon d={IC.mapPin} size={11} color={t.text3}/>{w.city}
            </div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
                  <Stars rating={parseFloat(avg(w.reviews))} size={12} t={t}/>
                  <span style={{color:t.accent,fontSize:12,fontWeight:700}}>{avg(w.reviews)}</span>
                  <span style={{color:t.text3,fontSize:11}}>({w.reviews.length})</span>
                </div>
              </div>
              <AvailBadge available={w.available} t={t}/>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{background:t.bg2,borderRadius:10,padding:"24px",border:`1px solid ${t.border}`,
          display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0,textAlign:"center"}}>
          {[{n:`${workers.length}+`,l:"Artisans vérifiés"},{n:`${workers.filter(w=>w.available).length}`,l:"Disponibles"},{n:`${CITIES.length}`,l:"Villes"}].map((s,i)=>(
            <div key={s.l} style={{padding:"8px",borderRight:i<2?`1px solid ${t.border}`:"none"}}>
              <div style={{fontSize:24,fontWeight:600,color:t.text}}>{s.n}</div>
              <div style={{color:t.text3,fontSize:12,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer t={t}/>
    </div>
  );
}


// ─── SKELETON LOADERS ──────────────────────────────────────────────────────────
function SkeletonBox({ w="100%", h=16, r=8, style={} }) {
  return (
    <div style={{width:w,height:h,borderRadius:r,background:"linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",...style}}/>
  );
}
function SkeletonWorkerCard({ t }) {
  return (
    <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:14,display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <SkeletonBox w={48} h={48} r={24}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
          <SkeletonBox w="60%" h={14}/>
          <SkeletonBox w="40%" h={12}/>
        </div>
        <SkeletonBox w={60} h={22} r={6}/>
      </div>
      <SkeletonBox h={12} w="80%"/>
      <SkeletonBox h={12} w="50%"/>
      <div style={{display:"flex",gap:6,marginTop:4}}>
        <SkeletonBox w={70} h={24} r={6}/>
        <SkeletonBox w={70} h={24} r={6}/>
      </div>
    </div>
  );
}
function SkeletonHomePage({ t }) {
  return (
    <div style={{minHeight:"100vh",background:t.bg}}>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      <div style={{background:t.card,borderBottom:`1px solid ${t.border}`,padding:"64px 24px 72px",textAlign:"center"}}>
        <div style={{maxWidth:500,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <SkeletonBox w={180} h={28} r={14}/>
          <SkeletonBox w="80%" h={40} r={8}/>
          <SkeletonBox w="60%" h={20} r={6}/>
          <div style={{width:"100%",background:t.bg2,borderRadius:12,padding:16,border:`1px solid ${t.border}`,display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <SkeletonBox h={40} r={8}/>
              <SkeletonBox h={40} r={8}/>
            </div>
            <SkeletonBox h={44} r={8}/>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
        <SkeletonBox w={120} h={24} r={6} style={{marginBottom:20}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(96px,1fr))",gap:10,marginBottom:40}}>
          {Array(8).fill(0).map((_,i)=>(
            <div key={i} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,padding:"14px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <SkeletonBox w={40} h={40} r={10}/>
              <SkeletonBox w="70%" h={12} r={4}/>
              <SkeletonBox w="50%" h={11} r={4}/>
            </div>
          ))}
        </div>
        <SkeletonBox w={140} h={24} r={6} style={{marginBottom:20}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {Array(4).fill(0).map((_,i)=><SkeletonWorkerCard key={i} t={t}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── EMPTY STATES ──────────────────────────────────────────────────────────────
function EmptySearch({ search, city, t }) {
  return (
    <div style={{textAlign:"center",padding:"60px 20px",gridColumn:"1/-1"}}>
      <div style={{width:64,height:64,borderRadius:16,background:t.bg2,border:`1px solid ${t.border}`,
        display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
        <Icon d={IC.search} size={28} color={t.text3}/>
      </div>
      <div style={{fontWeight:700,fontSize:16,color:t.text,marginBottom:8}}>Aucun artisan trouvé</div>
      <div style={{color:t.text3,fontSize:14,lineHeight:1.6,maxWidth:300,margin:"0 auto"}}>
        {search&&city!=="all"
          ? `Aucun résultat pour "${search}" à ${city}. Essayez une autre ville ou un autre métier.`
          : search
          ? `Aucun résultat pour "${search}". Vérifiez l'orthographe ou essayez un autre terme.`
          : city!=="all"
          ? `Pas d'artisans disponibles à ${city} pour le moment.`
          : "Aucun artisan disponible. Revenez bientôt !"}
      </div>
    </div>
  );
}

// ─── ERROR PAGE ────────────────────────────────────────────────────────────────
function ErrorPage({ error, onRetry, t }) {
  return (
    <div style={{minHeight:"100vh",background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",maxWidth:400}}>
        <div style={{width:80,height:80,borderRadius:20,background:t.bg2,border:`1px solid ${t.border}`,
          display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <Icon d={IC.x} size={36} color={t.danger}/>
        </div>
        <h2 style={{margin:"0 0 12px",fontSize:22,fontWeight:800,color:t.text}}>
          Oups, une erreur s'est produite
        </h2>
        <p style={{color:t.text3,fontSize:14,lineHeight:1.7,margin:"0 0 24px"}}>
          {error||"Impossible de charger les données. Vérifiez votre connexion internet et réessayez."}
        </p>
        {onRetry&&(
          <button onClick={onRetry}
            style={{padding:"12px 28px",borderRadius:10,border:"none",background:t.primary,
              color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",
              display:"inline-flex",alignItems:"center",gap:8}}>
            <Icon d={IC.loader} size={15} color="#fff"/>Réessayer
          </button>
        )}
        <div style={{marginTop:32,padding:"16px",background:t.bg2,borderRadius:10,border:`1px solid ${t.border}`}}>
          <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.5px",marginBottom:6}}>DÉTAIL TECHNIQUE</div>
          <div style={{fontSize:12,color:t.text3,fontFamily:"monospace",wordBreak:"break-all"}}>{error||"Unknown error"}</div>
        </div>
      </div>
    </div>
  );
}

// ─── 404 PAGE ──────────────────────────────────────────────────────────────────
function NotFoundPage({ onGoHome, t }) {
  return (
    <div style={{minHeight:"100vh",background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",maxWidth:400}}>
        <div style={{fontSize:80,fontWeight:900,color:t.border2,lineHeight:1,marginBottom:8}}>404</div>
        <h2 style={{margin:"0 0 12px",fontSize:22,fontWeight:800,color:t.text}}>Page introuvable</h2>
        <p style={{color:t.text3,fontSize:14,lineHeight:1.7,margin:"0 0 28px"}}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <button onClick={onGoHome}
          style={{padding:"12px 28px",borderRadius:10,border:"none",background:t.primary,
            color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",
            display:"inline-flex",alignItems:"center",gap:8}}>
          <Icon d={IC.home} size={15} color="#fff"/>Retour à l'accueil
        </button>
      </div>
    </div>
  );
}


// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{background:t.card,borderTop:`1px solid ${t.border}`,padding:"32px 24px",marginTop:"auto"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:16,textAlign:"center"}}>
        <div style={{fontWeight:800,fontSize:18,color:t.text}}>AloAji</div>
        <p style={{color:t.text3,fontSize:13,margin:0,maxWidth:400,lineHeight:1.6}}>
          La plateforme des artisans vérifiés au Maroc.
        </p>
        <div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"}}>
          <a href="/privacy.html" target="_blank" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>
            Politique de confidentialité
          </a>
          <a href="/terms.html" target="_blank" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>
            Conditions d'utilisation
          </a>
          <a href="mailto:hello@digcy.com" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>
            hello@digcy.com
          </a>
        </div>
        <div style={{color:t.text3,fontSize:11}}>© {new Date().getFullYear()} Digcy SARL AU — Tous droits réservés</div>
      </div>
    </footer>
  );
}

// ─── SEARCH PAGE ───────────────────────────────────────────────────────────────
function SearchPage({ workers, onSelect, initSearch, initCity, profFilter, setProfFilter, favorites=[], onToggleFav, t }) {
  const [search,setSearch]=useState(initSearch||"");
  const [city,setCity]=useState(initCity||"all");
  const [avail,setAvail]=useState(false);
  const [view,setView]=useState("list");

  const filtered=workers.filter(w=>{
    const ms=w.name.toLowerCase().includes(search.toLowerCase())||PROFESSIONS.filter(p=>w.professions.includes(p.id)).some(p=>p.name.toLowerCase().includes(search.toLowerCase()));
    const mc=city==="all"||w.city===city;
    const mp=profFilter==="all"||w.professions.includes(parseInt(profFilter));
    const ma=!avail||w.available;
    return ms&&mc&&mp&&ma;
  });

  return (
    <div style={{minHeight:"100vh",background:t.bg}}>
      {/* Search bar - sticky */}
      <div style={{background:t.card,borderBottom:`1px solid ${t.border}`,padding:"12px 20px",position:"sticky",top:56,zIndex:8}}>
        <div style={{maxWidth:840,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
          {/* Row 1: search + city + view toggle */}
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex",alignItems:"center"}}><Icon d={IC.search} size={14} color={t.text3}/></span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher..."
                style={{width:"100%",boxSizing:"border-box",background:t.bg2,border:`1px solid ${t.border}`,borderRadius:9,padding:"9px 10px 9px 34px",color:t.text,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
            </div>
            <select value={city} onChange={e=>setCity(e.target.value)} style={{background:t.bg2,border:`1px solid ${t.border}`,borderRadius:9,padding:"9px 10px",color:city==="all"?t.text3:t.text,fontSize:12,fontFamily:"inherit",outline:"none",flexShrink:0}}>
              <option value="all">Toutes les villes</option>
              {CITIES.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            {/* View toggle — RIGHT HERE, not with category chips */}
            <div style={{display:"flex",background:t.bg2,borderRadius:9,border:`1px solid ${t.border}`,overflow:"hidden",flexShrink:0}}>
              {[{id:"list",ic:IC.list,l:"Liste"},{id:"map",ic:IC.map,l:"Carte"}].map(v=>(
                <button key={v.id} onClick={()=>setView(v.id)}
                  style={{padding:"7px 10px",border:"none",cursor:"pointer",
                    background:view===v.id?t.bg3:"transparent",
                    color:view===v.id?t.text:t.text3,transition:"all .15s",fontFamily:"inherit",
                    display:"flex",alignItems:"center",gap:4,borderRadius:4}}>
                  <Icon d={v.ic} size={14} color={view===v.id?t.text:t.text3}/>
                </button>
              ))}
            </div>
          </div>
          {/* Row 2: availability + profession chips */}
          <div style={{display:"flex",gap:6,alignItems:"center",overflowX:"auto",paddingBottom:2}}>
            <button onClick={()=>setAvail(v=>!v)}
              style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 10px",
                borderRadius:6,border:`1px solid ${avail?t.success+"60":t.border}`,
                background:avail?t.successLight:"transparent",
                color:avail?t.success:t.text3,fontSize:12,fontWeight:500,cursor:"pointer",
                flexShrink:0,fontFamily:"inherit"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:avail?t.success:t.border2}}/>
              Disponible
            </button>
            <div style={{width:1,height:20,background:t.border,flexShrink:0}}/>
            <button onClick={()=>setProfFilter("all")}
              style={{padding:"5px 10px",borderRadius:6,
                border:`1px solid ${profFilter==="all"?t.border2:t.border}`,
                background:profFilter==="all"?t.bg3:"transparent",
                color:profFilter==="all"?t.text:t.text3,
                fontSize:12,fontWeight:500,cursor:"pointer",flexShrink:0,fontFamily:"inherit"}}>
              Tous
            </button>
            {PROFESSIONS.map(p=>(
              <button key={p.id}
                onClick={()=>setProfFilter(profFilter===String(p.id)?"all":String(p.id))}
                style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 10px",
                  borderRadius:6,border:`1px solid ${profFilter===String(p.id)?t.border2:t.border}`,
                  background:profFilter===String(p.id)?t.bg3:"transparent",
                  color:profFilter===String(p.id)?t.text:t.text3,
                  fontSize:12,fontWeight:500,cursor:"pointer",flexShrink:0,
                  fontFamily:"inherit",whiteSpace:"nowrap",transition:"all .1s"}}>
                <ProfIcon iconKey={p.icon} size={12} color={profFilter===String(p.id)?t.text:t.text3}/>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:840,margin:"0 auto",padding:"16px 20px"}}>
        <div style={{color:t.text3,fontSize:12,marginBottom:14}}>{filtered.length} artisan{filtered.length!==1?"s":""} trouvé{filtered.length!==1?"s":""}</div>
        {view==="list"?(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
            {filtered.map(w=><WorkerCard key={w.id} worker={w} onClick={onSelect} isFav={favorites.includes(w.id)} onToggleFav={()=>onToggleFav&&onToggleFav(w.id)} t={t}/>)}
            {!filtered.length&&<EmptySearch search={search} city={city} t={t}/>}
          </div>
        ):(
          <MapView workers={filtered} onSelect={onSelect} t={t}/>
        )}
      </div>
    </div>
  );
}

// ─── WORKER DASHBOARD ─────────────────────────────────────────────────────────
function WorkerDash({ worker, onToggle, onRefresh, t }) {
  const [imgTab,setImgTab]=useState("portfolio");
  const [uploading,setUploading]=useState(false);
  const [caption,setCaption]=useState("");
  const [showCaption,setShowCaption]=useState(false);
  const [pendingFile,setPendingFile]=useState(null);
  const [pendingPreview,setPendingPreview]=useState(null);
  const [editingBio,setEditingBio]=useState(false);
  const [bioVal,setBioVal]=useState(worker.bio||"");
  const [savingBio,setSavingBio]=useState(false);
  const fileRef=useRef();
  const profileRef=useRef();
  const rating=avg(worker.reviews);
  const profs=(worker.professionData||[]);

  const uploadPortfolio = async (file, cap) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `portfolio/${worker.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("worker-photos").upload(path, file, { upsert:true });
      if(upErr) throw upErr;
      const { data:{ publicUrl } } = supabase.storage.from("worker-photos").getPublicUrl(path);
      await supabase.from("portfolio_photos").insert({ worker_id:worker.id, url:publicUrl, caption:cap||"" });
      if(onRefresh) await onRefresh();
    } catch(e){ alert("Erreur upload: "+e.message); }
    setUploading(false); setShowCaption(false); setPendingFile(null); setPendingPreview(null); setCaption("");
  };

  const uploadProfile = async (file) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `profiles/${worker.id}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage.from("worker-photos").upload(path, file, { upsert:true });
      if(upErr) throw upErr;
      const { data:{ publicUrl } } = supabase.storage.from("worker-photos").getPublicUrl(path);
      const newUrl = publicUrl+"?t="+Date.now();
      await supabase.from("workers").update({ avatar_url: newUrl }).eq("id", worker.id);
      if(onRefresh) await onRefresh(newUrl);
    } catch(e){ alert("Erreur upload: "+e.message); }
    setUploading(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0]; if(!file) return;
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
    setShowCaption(true);
    e.target.value="";
  };

  const handleProfileSelect = (e) => {
    const file = e.target.files[0]; if(!file) return;
    uploadProfile(file);
    e.target.value="";
  };

  const deletePortfolioPhoto = async (photoId, photoUrl) => {
    if(!confirm("Supprimer cette photo?")) return;
    await supabase.from("portfolio_photos").delete().eq("id", photoId);
    if(onRefresh) await onRefresh();
  };

  const saveBio = async () => {
    setSavingBio(true);
    try {
      await supabase.from("workers").update({ bio: bioVal }).eq("id", worker.id);
      setEditingBio(false);
      if(onRefresh) await onRefresh(); // refreshes worker profile AND global workers list
    } catch(e) { alert("Erreur: "+e.message); }
    setSavingBio(false);
  };

  return (
    <div style={{minHeight:"100vh",background:t.bg,paddingBottom:80}}>
      <div style={{background:t.card,borderBottom:`1px solid ${t.border}`,padding:"20px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.6px",marginBottom:14}}>MON ESPACE ARTISAN</div>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>profileRef.current?.click()}>
              <Avatar worker={worker} size={60} t={t}/>
              <div style={{position:"absolute",bottom:0,right:0,width:18,height:18,borderRadius:"50%",
                background:t.bg3,border:`1px solid ${t.border2}`,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon d={IC.camera} size={10} color={t.text2}/>
              </div>
              <input ref={profileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleProfileSelect}/>
            </div>
            <div style={{flex:1}}>
              <h2 style={{margin:0,fontSize:20,fontWeight:900,color:t.text}}>{worker.name}</h2>
              <div style={{display:"flex",alignItems:"center",gap:8,color:t.text3,fontSize:13,marginTop:3}}>
                <span style={{display:"flex",alignItems:"center",gap:3}}><Icon d={IC.mapPin} size={12} color={t.text3}/>{worker.city}</span>
                <span>·</span>
                <span style={{display:"flex",alignItems:"center",gap:3}}><Icon d={IC.phone} size={12} color={t.text3}/>{worker.phone}</span>
              </div>
              <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                {profs.map(p=><span key={p.id} style={{fontSize:11,padding:"3px 9px",borderRadius:8,background:p.color+"18",color:p.color,fontWeight:600}}>{p.icon} {p.name}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:700,margin:"0 auto",padding:"20px"}}>
        {/* Availability toggle */}
        <Card t={t} hover={false} style={{padding:"20px",marginBottom:20,border:`2px solid ${worker.available?t.success+"50":t.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:800,fontSize:16,color:t.text}}>Mon statut</div>
              <div style={{color:t.text2,fontSize:13,marginTop:4}}>{worker.available?"Visible dans les recherches":"Masqué des recherches"}</div>
            </div>
            <button onClick={onToggle} style={{width:52,height:28,borderRadius:14,background:worker.available?t.success:"#D1D5DB",border:"none",cursor:"pointer",position:"relative",transition:"background .25s",outline:"none"}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:worker.available?"calc(100% - 25px)":"3px",transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,0.25)"}}/>
            </button>
          </div>
          <div style={{marginTop:14,padding:"10px 14px",borderRadius:10,background:worker.available?t.successLight:t.bg2,border:`1px solid ${worker.available?t.success+"40":t.border}`,color:worker.available?t.success:t.text3,fontSize:13,fontWeight:600,textAlign:"center"}}>
            {worker.available?"Disponible — clients peuvent vous contacter":"Indisponible — profil masqué"}
          </div>
        </Card>
        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
          {[
            {l:"Avis",v:worker.reviews.length,ic:IC.messageCircle},
            {l:"Note",v:rating?`${rating}`:"—",ic:IC.star},
            {l:"Photos",v:worker.portfolio.length,ic:IC.image},
            {l:"Vues",v:worker.views_count||0,ic:IC.eye}
          ].map(s=>(
            <div key={s.l} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,
              padding:"14px 10px",textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:6}}>
                <Icon d={s.ic} size={15} color={t.text3}/>
              </div>
              <div style={{fontSize:18,fontWeight:600,color:t.text}}>{s.v}</div>
              <div style={{color:t.text3,fontSize:11,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Bio edit card */}
        <Card t={t} hover={false} style={{marginBottom:20,padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:editingBio?12:0}}>
            <div style={{fontWeight:700,fontSize:15,color:t.text}}>Ma description</div>
            {!editingBio&&(
              <button onClick={()=>{setBioVal(worker.bio||"");setEditingBio(true);}}
                style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:7,
                  border:`1px solid ${t.border}`,background:"transparent",cursor:"pointer",
                  color:t.text2,fontSize:12,fontFamily:"inherit"}}>
                <Icon d={IC.edit} size={12} color={t.text2}/>Modifier
              </button>
            )}
          </div>
          {editingBio?(
            <div>
              <textarea value={bioVal} onChange={e=>setBioVal(e.target.value)}
                placeholder="Décrivez votre expérience, vos spécialités, votre zone d'intervention..."
                style={{width:"100%",boxSizing:"border-box",minHeight:120,background:t.bg2,
                  border:`1px solid ${t.border2}`,borderRadius:8,padding:"10px 12px",
                  color:t.text,fontSize:14,lineHeight:1.6,resize:"vertical",
                  fontFamily:"inherit",outline:"none"}}/>
              <div style={{display:"flex",gap:8,marginTop:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setEditingBio(false)}
                  style={{padding:"7px 14px",borderRadius:7,border:`1px solid ${t.border}`,
                    background:"transparent",cursor:"pointer",color:t.text2,
                    fontSize:13,fontFamily:"inherit"}}>Annuler</button>
                <button onClick={saveBio} disabled={savingBio}
                  style={{padding:"7px 16px",borderRadius:7,border:"none",
                    background:t.primary,color:"#fff",cursor:"pointer",
                    fontSize:13,fontWeight:600,fontFamily:"inherit",
                    opacity:savingBio?0.6:1}}>
                  {savingBio?"Enregistrement...":"Enregistrer"}
                </button>
              </div>
            </div>
          ):(
            <p style={{margin:editingBio?0:"8px 0 0",color:worker.bio?t.text2:t.text3,
              fontSize:14,lineHeight:1.7}}>
              {worker.bio||"Aucune description. Cliquez sur Modifier pour ajouter votre présentation."}
            </p>
          )}
        </Card>

        {/* Photos */}
        <Card t={t} hover={false} style={{marginBottom:20,overflow:"hidden"}}>
          <div style={{display:"flex",borderBottom:`1px solid ${t.border}`,padding:"0 20px"}}>
            {[{id:"portfolio",l:"Portfolio"},{id:"profile",l:"Photo profil"}].map(tb=>(
              <button key={tb.id} onClick={()=>setImgTab(tb.id)} style={{padding:"13px 14px",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:imgTab===tb.id?700:500,color:imgTab===tb.id?t.primary:t.text2,borderBottom:`2px solid ${imgTab===tb.id?t.primary:"transparent"}`,marginBottom:-1,fontFamily:"inherit"}}>
                {tb.l}
              </button>
            ))}
            <Btn t={t} variant="outline" size="sm" style={{marginLeft:"auto",alignSelf:"center"}} onClick={()=>fileRef.current?.click()} disabled={uploading}>
              <><Icon d={IC.plus} size={13} color={t.text}/>{uploading?"Envoi...":"Ajouter"}</>
            </Btn>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFileSelect}/>
          </div>

          {/* Caption modal after selecting portfolio photo */}
          {showCaption&&pendingPreview&&(
            <div style={{padding:"16px 20px",borderBottom:`1px solid ${t.border}`,background:t.bg2}}>
              <img src={pendingPreview} alt="" style={{width:"100%",maxHeight:200,objectFit:"cover",borderRadius:10,marginBottom:10}}/>
              <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Légende (ex: Installation électrique, Casablanca)"
                style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1px solid ${t.border}`,background:t.card,color:t.text,fontSize:13,fontFamily:"inherit",marginBottom:10,boxSizing:"border-box"}}/>
              <div style={{display:"flex",gap:8}}>
                <Btn t={t} size="sm" onClick={()=>uploadPortfolio(pendingFile,caption)} disabled={uploading}><>{uploading?"Envoi...":"Ajouter"}</></Btn>
                <Btn t={t} variant="ghost" size="sm" onClick={()=>{setShowCaption(false);setPendingFile(null);setPendingPreview(null);}}>Annuler</Btn>
              </div>
            </div>
          )}

          <div style={{padding:"16px 20px"}}>
            {imgTab==="portfolio"&&(
              worker.portfolio.length===0
              ?<div style={{textAlign:"center",padding:"32px",color:t.text3}}><Icon d={IC.image} size={32} color={t.text3}/><p style={{fontSize:13,color:t.text3,marginTop:8}}>Ajoutez vos réalisations</p></div>
              :<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {worker.portfolio.map(item=>(
                  <div key={item.id} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${t.border}`,position:"relative"}}>
                    {item.url
                      ?<img src={item.url} alt={item.caption} style={{width:"100%",height:100,objectFit:"cover"}}/>
                      :<PortfolioGrad gi={item.gi} style={{height:100}}/>}
                    <div style={{padding:"6px 8px",background:t.bg2,fontSize:11,color:t.text2,lineHeight:1.3,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span>{item.caption}</span>
                      <button onClick={()=>deletePortfolioPhoto(item.id,item.url)}
                        style={{background:"none",border:"none",cursor:"pointer",color:t.danger,
                          padding:"2px",display:"flex",alignItems:"center"}}>
                        <Icon d={IC.trash} size={12} color={t.danger}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {imgTab==="profile"&&(
              <div style={{textAlign:"center",padding:"20px"}}>
                <Avatar worker={worker} size={80} t={t}/>
                <p style={{color:t.text2,fontSize:13,marginTop:12}}>Cliquez sur votre photo pour la changer</p>
                <Btn t={t} variant="ghost" size="sm" style={{marginTop:8}} onClick={()=>profileRef.current?.click()} disabled={uploading}>
                  {uploading?"Envoi en cours...":"Changer la photo"}
                </Btn>
              </div>
            )}
          </div>
        </Card>
        {/* Legal + Delete account */}
        <div style={{marginBottom:20,padding:"0 4px"}}>
          <div style={{display:"flex",gap:16,marginBottom:12,flexWrap:"wrap"}}>
            <a href="/privacy" target="_blank" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Politique de confidentialité</a>
            <a href="/terms" target="_blank" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Conditions d'utilisation</a>
          </div>
          <button onClick={async()=>{
            if(!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) return;
            if(!window.confirm("Dernière confirmation : toutes vos données seront supprimées définitivement.")) return;
            try {
              await supabase.from("portfolio_photos").delete().eq("worker_id", worker.id);
              await supabase.from("worker_professions").delete().eq("worker_id", worker.id);
              await supabase.from("reviews").delete().eq("worker_id", worker.id);
              await supabase.from("workers").delete().eq("id", worker.id);
              await supabase.auth.signOut();
              window.location.reload();
            } catch(e){ alert("Erreur: "+e.message); }
          }}
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:8,
              border:`1px solid ${t.danger}40`,background:"transparent",cursor:"pointer",
              color:t.danger,fontSize:12,fontFamily:"inherit"}}>
            <Icon d={IC.x} size={13} color={t.danger}/>Supprimer mon compte
          </button>
        </div>

        {/* Reviews */}
        <Card t={t} hover={false} style={{padding:"20px"}}>
          <div style={{fontWeight:800,fontSize:16,color:t.text,marginBottom:14}}>Mes avis ({worker.reviews.length})</div>
          {worker.reviews.length===0
          ?<div style={{textAlign:"center",padding:"32px",color:t.text3}}><Icon d={IC.messageCircle} size={32} color={t.text3}/><p style={{fontSize:13,color:t.text3,marginTop:8}}>Vos avis apparaîtront ici</p></div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {worker.reviews.map(r=>{const wt=WORK_TYPES.find(wt=>wt.id===r.workType);return(
              <div key={r.id} style={{background:t.bg2,borderRadius:12,padding:"13px",border:`1px solid ${t.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div><span style={{fontWeight:700,fontSize:13,color:t.text}}>{r.author_name||r.author||"Client"}</span><div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}><Stars rating={r.rating} size={11} t={t}/><span style={{color:t.text3,fontSize:11}}>{r.date}</span></div></div>
                  {wt&&<span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:10,background:`${t.primary}18`,color:t.primary}}>{wt.icon} {wt.label}</span>}
                </div>
                <p style={{margin:0,color:t.text2,fontSize:13,lineHeight:1.5}}>{r.comment}</p>
              </div>
            );})}
          </div>}
        </Card>
      </div>
    </div>
  );
}


// ─── CONSUMER DASHBOARD ───────────────────────────────────────────────────────
function ConsumerDash({ currentUser, workers, favorites, onToggleFav, onViewWorker, onSearch, t }) {
  const [tab, setTab] = useState("favorites");
  const favWorkers = workers.filter(w => favorites.includes(w.id));

  return (
    <div style={{minHeight:"100vh", background:t.bg, paddingBottom:80}}>
      {/* Header */}
      <div style={{background:t.card, borderBottom:`1px solid ${t.border}`, padding:"20px"}}>
        <div style={{maxWidth:700, margin:"0 auto"}}>
          <div style={{fontSize:11, fontWeight:700, color:t.text3, letterSpacing:"0.6px", marginBottom:14}}>MON ESPACE</div>
          <div style={{display:"flex", gap:14, alignItems:"center"}}>
            <div style={{width:56, height:56, borderRadius:"50%", background:t.cta, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"#fff", flexShrink:0}}>
              {currentUser.name ? currentUser.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase() : <Icon d={IC.user} size={14} color={t.text3}/>}
            </div>
            <div>
              <h2 style={{margin:0, fontSize:20, fontWeight:900, color:t.text}}>{currentUser.name||"Mon compte"}</h2>
              <div style={{color:t.text2, fontSize:13, marginTop:2}}><Icon d={IC.phone} size={11} color={t.text3}/>{currentUser.phone ? "0"+currentUser.phone : ""}</div>
              <div style={{display:"inline-flex", alignItems:"center", gap:5, marginTop:6, padding:"3px 10px", borderRadius:20, background:`${t.primary}18`, border:`1px solid ${t.primary}30`}}>
                <span style={{fontSize:10, fontWeight:700, color:t.primary}}>CONSOMMATEUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:700, margin:"0 auto", padding:"20px"}}>
        {/* Quick stats */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:20}}>
          <div style={{background:t.card, borderRadius:14, padding:"16px", border:`1px solid ${t.border}`, textAlign:"center"}}>
            <div style={{fontSize:24, fontWeight:600, color:t.text}}>{favWorkers.length}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,color:t.text3,fontSize:12,marginTop:2}}>
              <Icon d={IC.heart} size={11} color={t.text3}/>Favoris
            </div>
          </div>
          <div style={{background:t.card, borderRadius:14, padding:"16px", border:`1px solid ${t.border}`, textAlign:"center"}}>
            <div style={{fontSize:24, fontWeight:600, color:t.text}}>{workers.reduce((sum,w)=>sum+w.reviews.filter(r=>r.author===currentUser.name).length,0)}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,color:t.text3,fontSize:12,marginTop:2}}>
              <Icon d={IC.star} size={11} color={t.text3}/>Avis
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex", borderBottom:`1px solid ${t.border}`, marginBottom:16}}>
          {[{id:"favorites",l:"Favoris"},{id:"reviews",l:"Mes avis"}].map(tb=>(
            <button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"12px 16px", border:"none", background:"none", cursor:"pointer", fontSize:13, fontWeight:tab===tb.id?700:500, color:tab===tb.id?t.primary:t.text2, borderBottom:`2px solid ${tab===tb.id?t.primary:"transparent"}`, marginBottom:-1, fontFamily:"inherit"}}>
              {tb.l}
            </button>
          ))}
        </div>

        {/* Favorites tab */}
        {tab==="favorites"&&(
          favWorkers.length===0
          ? <div style={{textAlign:"center", padding:"48px 20px", color:t.text3}}>
              <div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><Icon d={IC.heart} size={32} color={t.text3}/></div>
              <p style={{fontSize:14, fontWeight:500, color:t.text2, margin:"0 0 6px"}}>Pas encore de favoris</p>
              <p style={{fontSize:13, color:t.text3, margin:"0 0 20px"}}>Sauvegardez vos artisans préférés depuis leur profil</p>
              <Btn t={t} onClick={onSearch}><Icon d={IC.search} size={13} color={t.ctaText}/>Chercher un artisan</Btn>
            </div>
          : <div style={{display:"flex", flexDirection:"column", gap:12}}>
              {favWorkers.map(w=>(
                <div key={w.id} style={{background:t.card, borderRadius:14, padding:"14px 16px", border:`1px solid ${t.border}`, display:"flex", gap:12, alignItems:"center", cursor:"pointer"}} onClick={()=>onViewWorker(w)}>
                  <div style={{position:"relative"}}>
                    {w.avatar_url
                      ? <img src={w.avatar_url} alt="" style={{width:46, height:46, borderRadius:"50%", objectFit:"cover"}}/>
                      : <div style={{width:46, height:46, borderRadius:"50%", background:`linear-gradient(135deg,${["#6366F1","#EC4899","#F59E0B","#10B981","#3B82F6","#8B5CF6"][w.gi%6]},${["#8B5CF6","#F43F5E","#EF4444","#06B6D4","#6366F1","#EC4899"][w.gi%6]})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:15}}>{w.initials}</div>
                    }
                    <div style={{position:"absolute", bottom:-2, right:-2, width:14, height:14, borderRadius:"50%", background:w.available?"#10B981":"#9CA3AF", border:`2px solid ${t.card}`}}/>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontWeight:700, fontSize:14, color:t.text}}>{w.name}</div>
                    <div style={{color:t.text3, fontSize:12}}><span style={{display:"flex",alignItems:"center",gap:3}}><Icon d={IC.mapPin} size={10} color={t.text3}/>{w.city}</span></div>
                    <div style={{display:"flex", gap:4, flexWrap:"wrap", marginTop:4}}>
                      {(w.professionData||[]).slice(0,2).map(p=>(
                        <Badge key={p.id} t={t} style={{fontSize:10,padding:"1px 7px",color:t.text3}}>
                          <ProfIcon iconKey={p.icon||"wrench_"} size={10} color={t.text3}/>{p.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6}}>
                    <button onClick={e=>{e.stopPropagation();onToggleFav(w.id);}}
                      style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,
                        borderRadius:6,border:`1px solid ${t.danger+"40"}`,background:t.dangerLight,cursor:"pointer"}}>
                      <Icon d={IC.heart} size={13} color={t.danger} style={{fill:t.danger,stroke:t.danger}}/>
                    </button>
                    <Icon d={IC.chevronRight} size={14} color={t.text3}/>
                  </div>
                </div>
              ))}
            </div>
        )}

        {/* My reviews tab */}
        {tab==="reviews"&&(()=>{
          const myReviews = workers.flatMap(w=>
            w.reviews.filter(r=>r.author===currentUser.name).map(r=>({...r, workerName:w.name, workerId:w.id, worker:w}))
          );
          return myReviews.length===0
          ? <div style={{textAlign:"center", padding:"48px 20px", color:t.text3}}>
              <div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><Icon d={IC.star} size={32} color={t.text3}/></div>
              <p style={{fontSize:14, fontWeight:500, color:t.text2, margin:"0 0 6px"}}>Pas encore d'avis</p>
              <p style={{fontSize:13, margin:"0 0 20px"}}>Partagez votre expérience avec les artisans que vous avez contactés.</p>
              <Btn t={t} onClick={onSearch}><Icon d={IC.search} size={13} color={t.ctaText}/>Trouver un artisan</Btn>
            </div>
          : <div style={{display:"flex", flexDirection:"column", gap:12}}>
              {myReviews.map(r=>(
                <div key={r.id} style={{background:t.card, borderRadius:14, padding:"14px 16px", border:`1px solid ${t.border}`}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8}}>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:t.text}}>{r.workerName}</div>
                      <div style={{display:"flex", gap:2, marginTop:3}}>
                        {[1,2,3,4,5].map(s=><Icon key={s} d={IC.star} size={12} color={s<=r.rating?"#d97706":t.border2} style={{fill:s<=r.rating?"#d97706":"none",stroke:s<=r.rating?"#d97706":t.border2}}/>)}
                      </div>
                    </div>
                    <div style={{fontSize:11, color:t.text3}}>{r.date}</div>
                  </div>
                  <p style={{margin:0, color:t.text2, fontSize:13, lineHeight:1.5}}>{r.comment}</p>
                  <button onClick={()=>onViewWorker(r.worker)} style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:4,background:"none",border:"none",cursor:"pointer",color:t.text2,fontSize:12,fontFamily:"inherit",padding:0}}>Voir le profil<Icon d={IC.chevronRight} size={12} color={t.text2}/></button>
                </div>
              ))}
            </div>;
        })()}
      </div>
    </div>
  );
}

// ─── NAV BAR ──────────────────────────────────────────────────────────────────
function NavBar({ page, setPage, dark, setDark, currentUser, onShowAuth, onLogout, t }) {
  const NAV=[
    {id:"home",l:"Accueil",ic:IC.home},
    {id:"search",l:"Chercher",ic:IC.compass},
    {id:"monespace",l:"Mon Espace",ic:IC.user}
  ];
  const initials = currentUser?.name
    ? currentUser.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase()
    : null;
  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,
        background:t.nav,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
        borderBottom:`1px solid ${t.border}`,height:56}}>
        <div style={{maxWidth:1100,margin:"0 auto",height:"100%",display:"flex",
          alignItems:"center",padding:"0 20px",gap:8}}>
          {/* Logo */}
          <button onClick={()=>setPage("home")}
            style={{display:"flex",alignItems:"center",gap:8,background:"none",
              border:"none",cursor:"pointer",padding:"0 8px 0 0",flexShrink:0}}>
            <div style={{width:28,height:28,borderRadius:7,background:t.bg3,border:`1px solid ${t.border2}`,
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Icon d={IC.wrench} size={14} color={t.text2}/>
            </div>
            <span style={{fontWeight:600,fontSize:16,color:t.text,letterSpacing:"-0.3px"}}>AloAji</span>
          </button>

          {/* Desktop nav links */}
          <div style={{display:"flex",gap:0,flex:1,justifyContent:"center"}} className="aloaji-desktop-only">
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>{if(n.id==="monespace"&&!currentUser){onShowAuth("login");return;}setPage(n.id);}}
                style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",
                  background:"transparent",color:page===n.id?t.text:t.text3,
                  fontSize:13,fontWeight:page===n.id?500:400,transition:"color .15s",fontFamily:"inherit"}}>
                {n.l}
              </button>
            ))}
          </div>
          <div style={{flex:1}} className="aloaji-mobile-nav"/>

          {/* Right side controls */}
          <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <button onClick={()=>setDark(d=>!d)}
              style={{width:32,height:32,borderRadius:6,border:`1px solid ${t.border}`,
                background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",
                justifyContent:"center",color:t.text3}}>
              <Icon d={dark?IC.sun:IC.moon} size={14} color={t.text3}/>
            </button>
            {currentUser?(
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>setPage("monespace")}
                  style={{width:32,height:32,borderRadius:"50%",border:`1px solid ${t.border}`,
                    background:t.bg2,cursor:"pointer",overflow:"hidden",display:"flex",
                    alignItems:"center",justifyContent:"center",padding:0}}>
                  {currentUser.avatarUrl
                    ? <img src={currentUser.avatarUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    : <span style={{fontSize:11,fontWeight:600,color:t.text2}}>
                        {initials||<Icon d={IC.user} size={14} color={t.text3}/>}
                      </span>}
                </button>
                <button onClick={onLogout}
                  style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:6,
                    border:`1px solid ${t.border}`,background:"transparent",color:t.text3,
                    fontSize:12,cursor:"pointer",fontFamily:"inherit"}} className="aloaji-desktop-only">
                  <Icon d={IC.logOut} size={13} color={t.text3}/>Quitter
                </button>
              </div>
            ):(
              <div style={{display:"flex",gap:6}}>
                <Btn t={t} variant="ghost" size="sm" onClick={()=>onShowAuth("login")}>Connexion</Btn>
                <span className="aloaji-desktop-only">
                  <Btn t={t} variant="outline" size="sm" onClick={()=>onShowAuth("register")}>S'inscrire</Btn>
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,
        background:t.nav,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
        borderTop:`1px solid ${t.border}`,display:"flex",
        paddingBottom:"env(safe-area-inset-bottom,0px)"}} className="aloaji-mobile-nav">
        {NAV.map(n=>{
          const isActive=page===n.id;
          const isProfile=n.id==="monespace";
          return (
            <button key={n.id}
              onClick={()=>{if(isProfile&&!currentUser){onShowAuth("login");return;}setPage(n.id);}}
              style={{flex:1,padding:"10px 0 12px",border:"none",background:"none",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontFamily:"inherit"}}>
              {isProfile&&currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt=""
                  style={{width:22,height:22,borderRadius:"50%",objectFit:"cover",
                    outline:isActive?`2px solid ${t.text}`:"2px solid transparent",outlineOffset:1}}/>
              ) : isProfile&&currentUser&&initials ? (
                <div style={{width:22,height:22,borderRadius:"50%",background:t.bg3,
                  border:`1px solid ${isActive?t.text:t.border}`,display:"flex",
                  alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,color:t.text2}}>
                  {initials}
                </div>
              ) : (
                <Icon d={n.ic} size={19} color={isActive?t.text:t.text3}/>
              )}
              <span style={{fontSize:9,fontWeight:500,color:isActive?t.text:t.text3,letterSpacing:"0.1px"}}>{n.l}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark,setDark]=useState(true);
  const t=dark?DARK:LIGHT;
  const [page,setPage]=useState("home");
  const [workers,setWorkers]=useState([]);
  const [professions,setProfessions]=useState(PROFESSIONS); // fallback to static
  const [cities,setCities]=useState(CITIES);               // fallback to static
  const [loading,setLoading]=useState(true);
  const [loadError,setLoadError]=useState(null);
  const [currentUser,setCurrentUser]=useState(null);
  const [workerProfile,setWorkerProfile]=useState(null);   // logged-in worker's data
  const [selectedWorker,setSelectedWorker]=useState(null);

  const openWorkerProfile = async (worker) => {
    setSelectedWorker(worker);
    // Don't count views if worker is viewing their own profile
    if(currentUser && currentUser.id === worker.id) return;
    try {
      await supabase.rpc("increment_views", { worker_id: worker.id });
    } catch(e) { /* silent fail */ }
  };
  const [showAuth,setShowAuth]=useState(false);
  const [authMode,setAuthMode]=useState("login");
  const [profFilter,setProfFilter]=useState("all");
  const [heroSearch,setHeroSearch]=useState("");
  const [heroCity,setHeroCity]=useState("all");
  const [favorites,setFavorites]=useState(()=>{
    try{ return JSON.parse(localStorage.getItem("aloaji_favs")||"[]"); }catch{ return []; }
  });
  const toggleFavorite = (workerId) => {
    setFavorites(prev=>{
      const next = prev.includes(workerId) ? prev.filter(id=>id!==workerId) : [...prev,workerId];
      localStorage.setItem("aloaji_favs", JSON.stringify(next));
      return next;
    });
  };

  // ── Load data from Supabase on startup ──────────────────────────────────────
  useEffect(()=>{
    loadData();
    checkSession();
  },[]);

  const loadData = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      // Load approved workers with their city, professions, reviews, portfolio
      const { data: dbWorkers, error } = await supabase
        .from("workers")
        .select(`
          *,
          city:cities(name, lat, lng),
          worker_professions(profession:professions(id, name, icon, color)),
          reviews(*),
          portfolio_photos(*)
        `)
        .eq("status","approved")
        .order("created_at", { ascending: false });

      if(error) throw error;

      // Shape data to match what the app expects
      const shaped = (dbWorkers||[]).map((w,i)=>({
        ...w,
        city: w.city?.name || "",
        professions: (w.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
        professionData: (w.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
        reviews: (w.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
        portfolio: (w.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
        initials: w.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),
        gi: i%6,
      }));

      setWorkers(shaped);

      // Load cities & professions for filters/forms
      const { data: dbCities } = await supabase.from("cities").select("*").order("name");
      const { data: dbProfs }  = await supabase.from("professions").select("*").order("name");
      if(dbCities?.length) setCities(dbCities.map(c=>({...c,id:c.id})));
      if(dbProfs?.length) setProfessions(dbProfs.map(p=>{
        // DB has icon as Lucide key (after migration), color from DB
        // bg: derive from color or use local fallback
        const local = PROFESSIONS.find(lp=>lp.name===p.name);
        return { ...p, bg: p.bg || local?.bg || "#E0F2FE" };
      }));

    } catch(err) {
      console.error("Supabase load failed:", err.message);
      setLoadError(err.message);
      setWorkers([]);
    }
    setLoading(false);
  };

  // ── Check if user is already logged in ──────────────────────────────────────
  const checkSession = async () => {
    const { data:{ session } } = await supabase.auth.getSession();
    if(!session) {
      // Restore consumer session from localStorage (consumers have no Supabase auth session)
      try {
        const saved = localStorage.getItem("aloaji_consumer");
        if(saved) {
          const consumer = JSON.parse(saved);
          setCurrentUser({ name:consumer.name, phone:consumer.phone, role:"consumer", status:"active" });
        }
      } catch(e) { /* ignore */ }
      return;
    }
    // Get phone from session
    const rawPhone = session.user.phone || "";
    // +212612345678 → 0612345678
    const digits0 = rawPhone.startsWith("+212") ? "0"+rawPhone.slice(4) : rawPhone;
    const digits  = rawPhone.startsWith("+212") ? rawPhone.slice(4) : rawPhone;
    // Look up worker by phone
    const phoneVariants = [digits0, digits, rawPhone];
    let worker = null;
    for(const ph of phoneVariants){
      const { data, error:pErr } = await supabase
        .from("workers")
        .select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`)
        .eq("phone", ph)
        .maybeSingle();
      if(data && !pErr){ worker = data; break; }
    }
    if(worker && worker.status==="approved"){
      const shaped = {
        ...worker,
        city: worker.city?.name||"",
        professions:(worker.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
        professionData:(worker.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
        reviews:(worker.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
        portfolio:(worker.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
        initials:worker.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),
        gi:0,
      };
      setCurrentUser({ id:worker.id, name:worker.name, phone:digits0, role:"worker", status:"approved", avatarUrl:worker.avatar_url||null });
      setWorkerProfile(shaped);
    } else if(worker && worker.status==="pending"){
      setCurrentUser({ id:worker.id, name:worker.name, phone:digits0, role:"pending", status:"pending" });
    } else if(worker && worker.status==="rejected"){
      // Rejected worker - don't restore session
    } else if(!worker){
      // Authenticated phone but not a worker — could be a consumer who verified OTP
      // Restore name from localStorage if available
      try {
        const saved = localStorage.getItem("aloaji_consumer");
        if(saved) {
          const consumer = JSON.parse(saved);
          setCurrentUser({ name:consumer.name, phone:digits0, role:"consumer", status:"active" });
        }
      } catch(e) { /* ignore */ }
    }
  };

  const loadWorkerProfile = async (workerId) => {
    const { data } = await supabase
      .from("workers")
      .select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`)
      .eq("id", workerId)
      .single();
    if(data) setWorkerProfile({
      ...data,
      city: data.city?.name||"",
      professions:(data.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
      professionData:(data.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
      reviews:(data.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
      portfolio:(data.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
      initials:data.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),
      gi:0,
    });
  };

  // ── Post a review ────────────────────────────────────────────────────────────
  const onReview = async (wid, review) => {
    if(!currentUser) return;
    try {
      await supabase.from("reviews").insert({
        worker_id:   wid,
        consumer_id: currentUser.role==="consumer" ? currentUser.id : null,
        author_name: currentUser.name,
        rating:      review.rating,
        comment:     review.comment,
        work_type:   review.workType,
      });
      await loadData(); // refresh workers list
    } catch(err) {
      console.error("Review failed:", err.message);
      // Optimistic fallback
      setWorkers(ws=>ws.map(w=>w.id===wid?{...w,reviews:[...w.reviews,{id:Date.now(),...review,author:currentUser.name,date:new Date().toISOString().split("T")[0]}]}:w));
    }
  };

  // ── Toggle availability (workers only) ──────────────────────────────────────
  const onToggle = async () => {
    if(!workerProfile) return;
    const newVal = !workerProfile.available;
    setWorkerProfile(p=>({...p,available:newVal}));
    await supabase.from("workers").update({available:newVal}).eq("id",workerProfile.id);
  };

  const freshSelected = selectedWorker ? workers.find(w=>w.id===selectedWorker.id)||selectedWorker : null;

  // ── Pending review — saved when user clicks "login to comment" ───────────────
  const [pendingReview, setPendingReview] = useState(null); // {workerId, review}
  const [reviewJustDone, setReviewJustDone] = useState(false); // show success in sheet after auto-submit

  const handleNavigate = (dest,params={}) => {
    if(dest==="search"){setHeroSearch(params.search||"");setHeroCity(params.city||"all");setPage("search");}
    else if(dest==="worker"&&params.worker) openWorkerProfile(params.worker);
    else setPage(dest);
  };

  const handleShowAuth = (mode) => { setAuthMode(mode); setShowAuth(true); };
  const handleAuth = async (user) => {
    setCurrentUser(user);
    setShowAuth(false);
    if(user.role==="worker"){
      if(user.workerData) setWorkerProfile(user.workerData);
      else loadWorkerProfile(user.id);
      setPage("monespace");
    } else if(user.role==="pending"){
      setPage("home");
    }
    // If there was a pending review waiting for auth, submit it now
    if(pendingReview && (user.role==="consumer" || user.role==="worker")){
      const { workerId, review } = pendingReview;
      setPendingReview(null);
      try {
        await supabase.from("reviews").insert({
          worker_id:   workerId,
          consumer_id: user.role==="consumer" ? user.id : null,
          author_name: user.name,
          rating:      review.rating,
          comment:     review.comment,
          work_type:   review.workType,
        });
        await loadData();
        // Re-open the worker sheet so user sees their review published
        const worker = workers.find(w=>w.id===workerId);
        if(worker) {
          setReviewJustDone(true);
          setTimeout(()=>{ openWorkerProfile(worker); }, 400);
        }
      } catch(err) {
        console.error("Pending review failed:", err.message);
      }
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("aloaji_consumer");
    setCurrentUser(null);
    setWorkerProfile(null);
    setPage("home");
  };

  return (
    <div style={{fontFamily:"'Geist','DM Sans','Segoe UI',system-ui,sans-serif",background:t.bg,color:t.text,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
        @media (min-width: 768px) { .aloaji-mobile-nav { display: none !important; } }
        @media (max-width: 767px) { .aloaji-desktop-only { display: none !important; } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; overflow-x: hidden; }
        button { -webkit-tap-highlight-color: transparent; }
        input, textarea, select { font-size: 16px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }
        .fade-in { animation: fadeIn 0.2s ease forwards; }
      `}</style>
      <NavBar page={page} setPage={setPage} dark={dark} setDark={setDark} currentUser={currentUser} onShowAuth={handleShowAuth} onLogout={handleLogout} t={t}/>
      <div style={{paddingTop:56}} className="aloaji-content">
        <style>{`.aloaji-content { padding-bottom: 0; } @media (max-width: 767px) { .aloaji-content { padding-bottom: 70px; } }`}</style>

        {/* Loading state */}
        {loading&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",flexDirection:"column",gap:16}}>
            <div style={{width:48,height:48,borderRadius:"50%",border:`4px solid ${t.border}`,borderTop:`4px solid ${t.primary}`,animation:"spin 1s linear infinite"}}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p style={{color:t.text3,fontSize:14}}>Chargement des artisans...</p>
          </div>
        )}

        {loading&&page==="home"&&<SkeletonHomePage t={t}/>}

        {!loading&&loadError&&(
          <ErrorPage error={loadError} onRetry={loadData} t={t}/>
        )}

        {!loading&&!loadError&&(
          <>
            {page==="home"&&<HomePage workers={workers} onNavigate={handleNavigate} setProfFilter={setProfFilter} t={t} dark={dark}/>}
            {page==="search"&&<SearchPage workers={workers} onSelect={w=>openWorkerProfile(w)} initSearch={heroSearch} initCity={heroCity} profFilter={profFilter} setProfFilter={setProfFilter} favorites={favorites} onToggleFav={toggleFavorite} t={t}/>}
            {page==="monespace"&&currentUser&&currentUser.role==="worker"&&!workerProfile&&(
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",flexDirection:"column",gap:16}}>
                <div style={{width:40,height:40,borderRadius:"50%",border:`4px solid ${t.border}`,borderTop:`4px solid ${t.primary}`,animation:"spin 1s linear infinite"}}/>
                <p style={{color:t.text3,fontSize:14}}>Chargement de votre espace...</p>
              </div>
            )}
            {page==="monespace"&&currentUser&&workerProfile&&<WorkerDash worker={workerProfile} onToggle={onToggle} onRefresh={async()=>{await loadWorkerProfile(workerProfile.id);await loadData();}} t={t}/>}
            {page==="monespace"&&currentUser&&currentUser.role==="pending"&&(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",padding:40,textAlign:"center"}}>
                <div style={{marginBottom:16}}><Icon d={IC.clock} size={36} color={t.text3}/></div>
                <h2 style={{margin:"0 0 10px",color:t.text}}>Demande en cours, {currentUser.name}!</h2>
                <p style={{color:t.text2,margin:"0 0 8px",fontSize:15}}>Votre compte artisan est en cours de vérification.</p>
                <p style={{color:t.text3,margin:"0 0 24px",fontSize:13}}>Vous recevrez un SMS dès que votre compte sera approuvé.</p>
                <Btn t={t} onClick={()=>setPage("home")}><Icon d={IC.home} size={13} color={t.ctaText}/>Retour à l'accueil</Btn>
              </div>
            )}
            {page==="monespace"&&currentUser&&!workerProfile&&currentUser.role==="consumer"&&(
              <ConsumerDash currentUser={currentUser} workers={workers} favorites={favorites} onToggleFav={toggleFavorite} onViewWorker={openWorkerProfile} onSearch={()=>setPage("search")} t={t}/>
            )}
            {page==="monespace"&&!currentUser&&(
              <div style={{minHeight:"calc(100vh - 56px)",background:t.bg}}>
                <div style={{maxWidth:480,margin:"0 auto",padding:"80px 24px 40px",textAlign:"center"}}>
                  {/* Icon */}
                  <div style={{width:64,height:64,borderRadius:16,background:t.bg2,border:`1px solid ${t.border}`,
                    display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
                    <Icon d={IC.user} size={28} color={t.text2}/>
                  </div>
                  <h2 style={{margin:"0 0 10px",fontSize:22,fontWeight:600,color:t.text,letterSpacing:"-0.3px"}}>
                    Bienvenue sur AloAji
                  </h2>
                  <p style={{color:t.text3,margin:"0 0 32px",fontSize:14,lineHeight:1.6}}>
                    Connectez-vous pour accéder à votre espace — que vous soyez client ou artisan.
                  </p>
                  {/* Two options side by side */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
                    {/* Client */}
                    <button onClick={()=>handleShowAuth("login")}
                      style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,
                        padding:"20px 16px",cursor:"pointer",textAlign:"center",fontFamily:"inherit",
                        transition:"background .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background=t.bg2}
                      onMouseLeave={e=>e.currentTarget.style.background=t.card}>
                      <div style={{width:40,height:40,borderRadius:10,background:t.bg2,border:`1px solid ${t.border}`,
                        display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                        <Icon d={IC.user} size={18} color={t.text2}/>
                      </div>
                      <div style={{fontWeight:600,fontSize:14,color:t.text,marginBottom:4}}>Je suis client</div>
                      <div style={{fontSize:12,color:t.text3,lineHeight:1.4}}>Retrouvez vos artisans favoris et vos avis</div>
                    </button>
                    {/* Artisan */}
                    <button onClick={()=>handleShowAuth("register")}
                      style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,
                        padding:"20px 16px",cursor:"pointer",textAlign:"center",fontFamily:"inherit",
                        transition:"background .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background=t.bg2}
                      onMouseLeave={e=>e.currentTarget.style.background=t.card}>
                      <div style={{width:40,height:40,borderRadius:10,background:t.bg2,border:`1px solid ${t.border}`,
                        display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                        <Icon d={IC.wrench} size={18} color={t.text2}/>
                      </div>
                      <div style={{fontWeight:600,fontSize:14,color:t.text,marginBottom:4}}>Je suis artisan</div>
                      <div style={{fontSize:12,color:t.text3,lineHeight:1.4}}>Créez votre profil et trouvez des clients</div>
                    </button>
                  </div>
                  <p style={{fontSize:12,color:t.text3}}>
                    Déjà inscrit ?{" "}
                    <button onClick={()=>handleShowAuth("login")}
                      style={{background:"none",border:"none",color:t.text2,cursor:"pointer",
                        fontSize:12,fontFamily:"inherit",fontWeight:500,textDecoration:"underline"}}>
                      Se connecter
                    </button>
                  </p>
                </div>

                {/* Feature list */}
                <div style={{maxWidth:480,margin:"0 auto",padding:"0 24px 60px"}}>
                  <div style={{borderTop:`1px solid ${t.border}`,paddingTop:32}}>
                    <div style={{fontSize:12,fontWeight:500,color:t.text3,letterSpacing:"0.5px",
                      textTransform:"uppercase",marginBottom:16}}>Ce que vous pouvez faire</div>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      {[
                        {ic:IC.heart, t:"Sauvegarder vos artisans favoris", d:"Retrouvez-les rapidement sans chercher"},
                        {ic:IC.messageCircle, t:"Laisser des avis", d:"Partagez votre expérience pour aider la communauté"},
                        {ic:IC.wrench, t:"Espace artisan complet", d:"Gérez vos disponibilités, photos et avis reçus"},
                      ].map((f,i)=>(
                        <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",
                          padding:"12px",background:t.bg2,borderRadius:8,border:`1px solid ${t.border}`}}>
                          <div style={{width:32,height:32,borderRadius:8,background:t.bg3,
                            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <Icon d={f.ic} size={14} color={t.text2}/>
                          </div>
                          <div>
                            <div style={{fontSize:13,fontWeight:500,color:t.text,marginBottom:2}}>{f.t}</div>
                            <div style={{fontSize:12,color:t.text3}}>{f.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {freshSelected&&<WorkerSheet
        worker={freshSelected}
        onClose={()=>{setSelectedWorker(null);setReviewJustDone(false);}}
        onReview={onReview}
        currentUser={currentUser}
        reviewAutoSubmitted={reviewJustDone}
        onNeedAuth={(review)=>{
          if(review) setPendingReview({workerId:freshSelected.id, review});
          handleShowAuth("login");
        }}
        isFav={favorites.includes(freshSelected.id)}
        onToggleFav={()=>toggleFavorite(freshSelected.id)}
        t={t}/>}
      {showAuth&&<PhoneAuth onClose={()=>setShowAuth(false)} onAuth={handleAuth} mode={authMode} t={t} dbCities={cities} dbProfessions={professions}/>}
    </div>
  );
}