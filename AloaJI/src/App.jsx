import { useState, useRef, useEffect } from "react";

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function AloAjiLogo({ height=24, dark=false }) {
  const textColor = dark ? "#F9FAFB" : "#1F2937";
  return (
    <svg height={height} viewBox="0 0 1345 396" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
      <rect width="396" height="396" fill="#16A34A"/>
      <path d="M204.941 121.434C204.941 125.551 200.779 128.806 198.594 132.286C198.367 132.648 198.165 133.039 197.993 133.461L165.2 213.665C163.248 218.441 166.735 223.685 171.864 223.685H197.736C201.715 223.685 204.941 226.934 204.941 230.942V248.474C204.941 252.481 201.715 255.73 197.736 255.73H152.806C149.878 255.73 147.242 257.517 146.136 260.248L123.852 315.303C122.747 318.034 120.111 319.82 117.182 319.82H95.2117C90.0503 319.82 86.5641 314.514 88.5801 309.729L185.18 80.422C186.309 77.7418 188.92 76.0006 191.811 76H197.736C201.715 76 204.941 79.2489 204.941 83.2565V121.434Z" fill="white"/>
      <path d="M152.538 306.094C149.489 303.771 149.191 299.374 151.608 296.39L163.953 281.149C166.558 277.933 171.292 277.606 174.695 279.947C184.744 286.862 197.375 290.91 210.243 290.91C238.256 290.91 258.315 270.011 258.315 235.528V181.22C258.315 177.213 261.541 173.964 265.52 173.964H287.424C291.403 173.964 294.629 177.213 294.629 181.22V241.101C294.629 291.607 259.699 324 211.972 324C188.454 324 167.982 317.865 152.538 306.094Z" fill="white"/>
      <path d="M257.908 163.376C258.116 163.697 258.392 163.969 258.716 164.171C259.125 164.426 259.598 164.562 260.078 164.565C272.615 164.632 282.586 164.69 290.95 164.728C291.547 164.73 292.032 164.243 292.032 163.642C292.032 163.442 292.087 163.246 292.19 163.075L306.944 138.745C307.963 137.065 308.26 135.04 307.768 133.135L294.988 83.6624C294.151 80.4239 291.224 78.1814 287.902 78.2338L259.77 78.6716C256.449 78.7226 253.592 81.0537 252.855 84.3155L241.58 134.161C241.146 136.081 241.504 138.095 242.574 139.743L257.908 163.376Z" fill="white"/>
      <path d="M505.6 255.424C505.6 221.248 529.024 200.896 569.728 198.208L630.784 193.6V180.928C630.784 158.656 616.192 145.216 590.464 145.216C571.648 145.216 554.368 150.976 537.856 164.032L520.576 136C540.928 118.72 566.656 110.272 595.84 110.272C640 110.272 668.8 136 668.8 175.936V264.256C668.8 271.552 672.64 275.392 680.32 275.392H690.304V309.568H671.104C652.288 309.568 638.464 300.352 633.472 284.992C620.416 303.04 598.528 313.792 572.416 313.792C534.016 313.792 505.6 289.6 505.6 255.424ZM542.848 255.04C542.848 271.936 558.208 283.456 580.096 283.456C608.128 283.456 630.784 263.872 630.784 239.296V223.168L575.488 227.776C553.984 229.312 542.848 238.912 542.848 255.04Z" fill={textColor}/>
      <path d="M753.85 309.568H715.066V40.768H753.85V309.568Z" fill={textColor}/>
      <path d="M994.702 211.648C994.702 268.096 947.854 314.176 889.486 314.176C831.118 314.176 784.27 268.096 784.27 211.648C784.27 155.2 831.118 109.504 889.486 109.504C947.854 109.504 994.702 155.2 994.702 211.648ZM955.918 211.648C955.918 174.016 926.35 144.064 889.486 144.064C852.622 144.064 823.054 174.016 823.054 211.648C823.054 249.664 852.622 279.616 889.486 279.616C926.35 279.616 955.918 249.664 955.918 211.648Z" fill={textColor}/>
      <path d="M1015.97 255.424C1015.97 221.248 1039.4 200.896 1080.1 198.208L1141.16 193.6V180.928C1141.16 158.656 1126.57 145.216 1100.84 145.216C1082.02 145.216 1064.74 150.976 1048.23 164.032L1030.95 136C1051.3 118.72 1077.03 110.272 1106.21 110.272C1150.37 110.272 1179.17 136 1179.17 175.936V264.256C1179.17 271.552 1183.01 275.392 1190.69 275.392H1200.68V309.568H1181.48C1162.66 309.568 1148.84 300.352 1143.85 284.992C1130.79 303.04 1108.9 313.792 1082.79 313.792C1044.39 313.792 1015.97 289.6 1015.97 255.424ZM1053.22 255.04C1053.22 271.936 1068.58 283.456 1090.47 283.456C1118.5 283.456 1141.16 263.872 1141.16 239.296V223.168L1085.86 227.776C1064.36 229.312 1053.22 238.912 1053.22 255.04Z" fill={textColor}/>
      <path d="M1245.02 86.464C1231.97 86.464 1221.6 76.096 1221.6 63.04C1221.6 50.368 1231.97 40 1245.02 40C1257.7 40 1267.68 50.368 1267.68 63.04C1267.68 76.096 1257.7 86.464 1245.02 86.464ZM1218.91 386.752H1197.79V353.728H1209.7C1219.68 353.728 1225.44 348.736 1225.44 338.752V113.728H1264.22V344.512C1264.22 367.936 1246.94 386.752 1218.91 386.752Z" fill={textColor}/>
      <path d="M1321.52 86.464C1308.47 86.464 1298.1 76.096 1298.1 63.04C1298.1 50.368 1308.47 40 1321.52 40C1334.2 40 1344.18 50.368 1344.18 63.04C1344.18 76.096 1334.2 86.464 1321.52 86.464ZM1340.72 113.728V309.568H1301.94V113.728H1340.72Z" fill={textColor}/>
    </svg>
  );
}

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

const PRICE_LEVELS = [
  { id: 1, label: "€", desc: "Économique", color: "#16A34A" },
  { id: 2, label: "€€", desc: "Modéré", color: "#D97706" },
  { id: 3, label: "€€€", desc: "Premium", color: "#DC2626" },
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

const GRAD_A = ["#6366F1","#EC4899","#F59E0B","#10B981","#3B82F6","#8B5CF6"];
const GRAD_B = ["#8B5CF6","#F43F5E","#EF4444","#06B6D4","#6366F1","#EC4899"];

function Avatar({ worker, size=48, t }) {
  const gi = (worker.gi||0) % GRAD_A.length;
  const bg = `linear-gradient(135deg,${GRAD_A[gi]},${GRAD_B[gi]})`;
  if(worker.avatar_url) return (
    <img src={worker.avatar_url} alt={worker.initials}
      style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
  );
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:bg,
      display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.34,
      fontWeight:700,color:"#fff",flexShrink:0,letterSpacing:"-0.5px"}}>
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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  return (
    <div style={{position:"fixed",inset:0,background:t.overlay,display:"flex",
      alignItems:isMobile?"flex-end":"center",justifyContent:"center",
      zIndex:2000,backdropFilter:"blur(4px)",padding:isMobile?0:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:t.card,
        border:`1px solid ${t.border}`,
        borderRadius:isMobile?"20px 20px 0 0":"16px",
        width:"100%",
        maxWidth:isMobile?"100%":maxW,
        maxHeight:isMobile?"92vh":"90vh",
        overflow:"auto",
        boxShadow:t.shadowLg,
      }}>
        {isMobile&&(
          <div style={{display:"flex",justifyContent:"center",paddingTop:12,paddingBottom:4}}>
            <div style={{width:36,height:4,borderRadius:2,background:t.border}}/>
          </div>
        )}
        {children}
      </div>
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
// ─── RESET PASSWORD MODAL ────────────────────────────────────────────────────
function ResetPasswordModal({ onClose, t }) {
  const [pwd,  setPwd]  = useState("");
  const [pwd2, setPwd2] = useState("");
  const [show, setShow] = useState(false);
  const [err,  setErr]  = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const inp = {
    width:"100%", boxSizing:"border-box",
    background:t.bg2, border:`1px solid ${t.border}`,
    borderRadius:10, padding:"12px 14px",
    color:t.text, fontSize:15, outline:"none", fontFamily:"inherit",
  };
  const lbl = {
    fontSize:11, fontWeight:700, color:t.text3,
    display:"block", marginBottom:6, letterSpacing:"0.5px", textTransform:"uppercase",
  };

  const doReset = async () => {
    if(pwd.length < 6){ setErr("Mot de passe minimum 6 caractères"); return; }
    if(pwd !== pwd2){ setErr("Les mots de passe ne correspondent pas"); return; }
    setSaving(true); setErr("");
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setSaving(false);
    if(error){ setErr(error.message); return; }
    setDone(true);
  };

  return (
    <Modal onClose={onClose} t={t} maxW={420}>
      <div style={{padding:"24px 24px 32px"}}>
        {done ? (
          <div style={{textAlign:"center",padding:"8px 0"}}>
            <div style={{fontSize:52,marginBottom:14}}>✅</div>
            <h2 style={{margin:"0 0 10px",fontSize:20,fontWeight:800,color:t.text}}>
              Mot de passe mis à jour !
            </h2>
            <p style={{color:t.text2,fontSize:14,lineHeight:1.7,margin:"0 0 24px"}}>
              Votre mot de passe a été modifié avec succès.<br/>
              Vous pouvez maintenant vous connecter.
            </p>
            <Btn t={t} style={{width:"100%"}} onClick={onClose}>Se connecter</Btn>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:t.text}}>
                Nouveau mot de passe
              </h2>
              <p style={{margin:0,color:t.text3,fontSize:13}}>
                Choisissez un mot de passe sécurisé
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <label style={lbl}>Nouveau mot de passe</label>
                <div style={{position:"relative"}}>
                  <input value={pwd} onChange={e=>setPwd(e.target.value)}
                    type={show?"text":"password"} placeholder="Minimum 6 caractères"
                    style={{...inp,paddingRight:60}}
                    onKeyDown={e=>e.key==="Enter"&&doReset()}/>
                  <button type="button" onClick={()=>setShow(v=>!v)}
                    style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",
                      background:"none",border:"none",color:t.text3,fontSize:11,
                      cursor:"pointer",fontFamily:"inherit"}}>
                    {show?"Cacher":"Voir"}
                  </button>
                </div>
              </div>
              <div>
                <label style={lbl}>Confirmer le mot de passe</label>
                <input value={pwd2} onChange={e=>setPwd2(e.target.value)}
                  type={show?"text":"password"} placeholder="Répétez le mot de passe"
                  style={inp} onKeyDown={e=>e.key==="Enter"&&doReset()}/>
                {pwd2&&pwd!==pwd2&&(
                  <span style={{fontSize:11,color:t.danger,marginTop:4,display:"block"}}>
                    Les mots de passe ne correspondent pas
                  </span>
                )}
                {pwd2&&pwd===pwd2&&pwd.length>=6&&(
                  <span style={{fontSize:11,color:"#10B981",marginTop:4,display:"block"}}>
                    ✓ Les mots de passe correspondent
                  </span>
                )}
              </div>
            </div>
            {err&&(
              <div style={{background:t.dangerLight,border:`1px solid ${t.danger}40`,
                borderRadius:8,padding:"10px 14px",color:t.danger,fontSize:13}}>{err}</div>
            )}
            <Btn t={t} size="lg" onClick={doReset} style={{width:"100%"}}
              disabled={saving||pwd!==pwd2||pwd.length<6}>
              {saving?"Mise à jour...":"Confirmer le nouveau mot de passe →"}
            </Btn>
          </div>
        )}
      </div>
    </Modal>
  );
}

function PhoneAuth({ onClose, onAuth, mode:initMode="login", t, dbCities=[], dbProfessions=[] }) {
  const [step, setStep]         = useState(initMode==="register" ? "choose" : "login");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [bio, setBio]           = useState("");
  const [profs, setProfs]       = useState([]);
  const [city, setCity]         = useState("");
  const [price, setPrice]       = useState(0);
  const [err, setErr]           = useState("");
  const [saving, setSaving]     = useState(false);

  const go = s => { setErr(""); setStep(s); };
  const toggleP = pid => { const s=String(pid); setProfs(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]); };
  const profList = dbProfessions.length ? dbProfessions : PROFESSIONS;
  const cityList = dbCities.length ? dbCities : CITIES;

  // Shared input style — same as login spacing the user likes
  const inp = {
    width:"100%", boxSizing:"border-box",
    background:t.bg2, border:`1px solid ${t.border}`,
    borderRadius:10, padding:"12px 14px",
    color:t.text, fontSize:15, outline:"none", fontFamily:"inherit",
  };
  const lbl = {
    fontSize:11, fontWeight:700, color:t.text3,
    display:"block", marginBottom:6, letterSpacing:"0.5px", textTransform:"uppercase",
  };

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const doLogin = async () => {
    if(!email.trim()||!password){ setErr("Email et mot de passe requis"); return; }
    setSaving(true); setErr("");

    // Check worker status FIRST (before auth, works even unauthenticated via public select)
    const { data:workerCheck } = await supabase
      .from("workers")
      .select("status, name")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if(workerCheck?.status==="pending"){
      setErr("PENDING");
      setSaving(false); return;
    }
    if(workerCheck?.status==="rejected"){
      setErr("Votre demande a été refusée. Contactez-nous pour plus d'informations.");
      setSaving(false); return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email:email.trim(), password });
    if(error){
      setErr("Email ou mot de passe incorrect");
      setSaving(false); return;
    }
    const { data:worker } = await supabase
      .from("workers")
      .select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`)
      .eq("email", email.trim().toLowerCase()).maybeSingle();
    if(worker){
      const shaped = {
        ...worker, city:worker.city?.name||"",
        professions:(worker.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
        professionData:(worker.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
        reviews:(worker.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
        portfolio:(worker.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
        initials:worker.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),gi:0,
      };
      const role = worker.status==="approved"?"worker":worker.status==="pending"?"pending":"rejected";
      onAuth({ name:worker.name, email:email.trim(), role, status:worker.status, id:worker.id, workerData:shaped });
    } else {
      // Not a worker — look up user_profiles
      const { data:profile } = await supabase
        .from("user_profiles")
        .select("name, email")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();
      const displayName = profile?.name || email.trim().split("@")[0];
      onAuth({ name:displayName, email:email.trim(), role:"consumer", status:"active" });
    }
    setSaving(false);
  };

  // ── FORGOT PASSWORD ───────────────────────────────────────────────────────
  const doForgot = async () => {
    if(!email.trim()){ setErr("Entrez votre email"); return; }
    setSaving(true); setErr("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin + "?reset=1",
    });
    setSaving(false);
    if(error){ setErr(error.message); return; }
    go("reset_sent");
  };

  // ── REGISTER WORKER ────────────────────────────────────────────────────────
  const doRegisterWorker = async () => {
    if(!profs.length){ setErr("Sélectionnez au moins un métier"); return; }
    if(!city){ setErr("Sélectionnez votre ville"); return; }
    setSaving(true); setErr("");
    const { error:signUpErr } = await supabase.auth.signUp({
      email:email.trim(), password, options:{data:{name:name.trim()}}
    });
    if(signUpErr){ setErr(signUpErr.message); setSaving(false); return; }
    try {
      const cityRow = cityList.find(c=>c.name===city);
      if(!cityRow) throw new Error("Ville introuvable");
      const { data:newW, error:wErr } = await supabase
        .from("workers")
        .insert({
          name:name.trim(), email:email.trim().toLowerCase(),
          phone:phone.trim(), city_id:cityRow.id,
          bio:bio.trim(), available:false, status:"pending", price_level:price||null,
        }).select().single();
      if(wErr) throw wErr;
      if(profs.length && newW){
        await supabase.from("worker_professions").insert(
          profs.map(pid=>({ worker_id:newW.id, profession_id:pid }))
        );
      }
      go("pending");
    } catch(e){
      setErr(e.message?.includes("workers_email_key")?"Cet email est déjà utilisé.":"Erreur: "+e.message);
    }
    setSaving(false);
  };

  // ── REGISTER CLIENT ────────────────────────────────────────────────────────
  const doRegisterClient = async () => {
    if(!name.trim()){ setErr("Entrez votre prénom"); return; }
    if(!email.trim()){ setErr("Entrez votre email"); return; }
    if(password.length<6){ setErr("Mot de passe minimum 6 caractères"); return; }
    setSaving(true); setErr("");
    const { data:signUpData, error } = await supabase.auth.signUp({
      email:email.trim(), password, options:{data:{name:name.trim()}}
    });
    if(error){ setErr(error.message); setSaving(false); return; }
    // Insert into user_profiles (consumers table)
    const userId = signUpData?.user?.id;
    if(userId){
      await supabase.from("user_profiles").upsert({
        id: userId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
      });
    }
    onAuth({ name:name.trim(), email:email.trim(), role:"consumer", status:"active" });
    setSaving(false);
  };

  // ── SHARED INLINE PIECES (not components — avoids focus loss on re-render) ──
  const pwdField = (placeholder="••••••••", onEnter=null) => (
    <div style={{position:"relative"}}>
      <input value={password} onChange={e=>setPassword(e.target.value)}
        type={showPwd?"text":"password"} placeholder={placeholder}
        style={{...inp,paddingRight:60}}
        onKeyDown={e=>{ if(e.key==="Enter"&&onEnter) onEnter(); }}/>
      <button type="button" onClick={()=>setShowPwd(v=>!v)}
        style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",
          background:"none",border:"none",color:t.text3,fontSize:11,
          cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
        {showPwd?"Cacher":"Voir"}
      </button>
    </div>
  );

  const errBox = err==="PENDING" ? (
    <div style={{background:"#FEF3C7",border:"1px solid #D9770640",borderRadius:10,
      padding:"14px 16px",display:"flex",flexDirection:"column",gap:6}}>
      <div style={{fontWeight:700,fontSize:14,color:"#92400E"}}>⏳ Compte en cours de vérification</div>
      <div style={{fontSize:13,color:"#78350F",lineHeight:1.6}}>
        Votre demande artisan est bien reçue. Notre équipe vérifie votre profil pour garantir la qualité d'AloAji.
        Vous recevrez un <strong>email de confirmation</strong> dès validation. Merci de votre patience !
      </div>
    </div>
  ) : err ? (
    <div style={{background:t.dangerLight,border:`1px solid ${t.danger}40`,
      borderRadius:8,padding:"10px 14px",color:t.danger,fontSize:13}}>{err}</div>
  ) : null;

  const stepBar = (n) => (
    <div style={{display:"flex",gap:6,marginBottom:4}}>
      {[1,2].map(i=>(
        <div key={i} style={{flex:1,height:3,borderRadius:2,
          background:i<=n?t.primary:t.border,transition:"background .3s"}}/>
      ))}
    </div>
  );

  const backBtn = (to) => (
    <button onClick={()=>go(to)} style={{background:"none",border:"none",cursor:"pointer",
      padding:0,display:"flex",alignItems:"center",gap:6,color:t.text3,
      fontFamily:"inherit",fontSize:13,marginBottom:2}}>
      <Icon d={IC.arrowLeft} size={15} color={t.text3}/>Retour
    </button>
  );

  return (
    <Modal onClose={onClose} t={t} maxW={440}>
      <div style={{padding:"24px 24px 32px"}}>

        {/* ── LOGIN ─────────────────────────────────────────────────── */}
        {step==="login"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:t.text}}>Connexion</h2>
              <p style={{margin:0,color:t.text3,fontSize:13}}>Accédez à votre espace</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <label style={lbl}>Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                  placeholder="votre@email.com" style={inp}
                  onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
              </div>
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
                <label style={{...lbl,marginBottom:0}}>Mot de passe</label>
                <button onClick={()=>go("forgot")} style={{background:"none",border:"none",
                  color:t.text3,fontSize:11,cursor:"pointer",fontFamily:"inherit",
                  textDecoration:"underline",textUnderlineOffset:3,padding:0}}>
                  Mot de passe oublié ?
                </button>
              </div>
                {pwdField("••••••••", doLogin)}
              </div>
            </div>
            {errBox}
            <Btn t={t} size="lg" onClick={doLogin} style={{width:"100%"}} disabled={saving}>
              {saving?"Connexion...":"Se connecter →"}
            </Btn>
            <div style={{textAlign:"center",paddingTop:8,borderTop:`1px solid ${t.border}`}}>
              <span style={{color:t.text3,fontSize:13}}>Pas encore de compte ? </span>
              <button onClick={()=>go("choose")} style={{background:"none",border:"none",
                color:t.primary,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                Créer un compte
              </button>
            </div>
          </div>
        )}

        {/* ── FORGOT PASSWORD ──────────────────────────────────────── */}
        {step==="forgot"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {backBtn("login")}
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:t.text}}>
                Mot de passe oublié
              </h2>
              <p style={{margin:0,color:t.text3,fontSize:13}}>
                Entrez votre email — nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>
            <div>
              <label style={lbl}>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                placeholder="votre@email.com" style={inp}
                onKeyDown={e=>e.key==="Enter"&&doForgot()}/>
            </div>
            {errBox}
            <Btn t={t} size="lg" style={{width:"100%"}} onClick={doForgot} disabled={saving}>
              {saving?"Envoi en cours...":"Envoyer le lien →"}
            </Btn>
          </div>
        )}

        {/* ── RESET SENT ────────────────────────────────────────────── */}
        {step==="reset_sent"&&(
          <div style={{textAlign:"center",padding:"8px 0"}}>
            <div style={{fontSize:52,marginBottom:14}}>📬</div>
            <h2 style={{margin:"0 0 10px",fontSize:20,fontWeight:800,color:t.text}}>
              Email envoyé !
            </h2>
            <p style={{color:t.text2,fontSize:14,lineHeight:1.7,margin:"0 0 6px"}}>
              Un lien de réinitialisation a été envoyé à
            </p>
            <p style={{color:t.primary,fontWeight:700,fontSize:14,margin:"0 0 24px",wordBreak:"break-all"}}>
              {email}
            </p>
            <p style={{color:t.text3,fontSize:12,lineHeight:1.6,margin:"0 0 24px"}}>
              Vérifiez vos spams si vous ne le recevez pas.<br/>
              Le lien expire dans <strong>1 heure</strong>.
            </p>
            <Btn t={t} style={{width:"100%"}} onClick={onClose}>Fermer</Btn>
            <button onClick={()=>go("login")} style={{marginTop:12,background:"none",border:"none",
              color:t.text3,fontSize:12,cursor:"pointer",fontFamily:"inherit",
              textDecoration:"underline",textUnderlineOffset:3}}>
              Retour à la connexion
            </button>
          </div>
        )}

        {/* ── CHOOSE TYPE ───────────────────────────────────────────── */}
        {step==="choose"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {backBtn("login")}
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:t.text}}>Créer un compte</h2>
              <p style={{margin:0,color:t.text3,fontSize:13}}>Qui êtes-vous ?</p>
            </div>
            {[
              {to:"w1",emoji:"🔨",title:"Je suis artisan",sub:"Créez votre profil et soyez contacté par des clients"},
              {to:"client",emoji:"🏠",title:"Je cherche un artisan",sub:"Trouvez, sauvegardez et notez des artisans"},
            ].map(opt=>(
              <button key={opt.to} onClick={()=>go(opt.to)}
                style={{padding:"16px 18px",borderRadius:14,border:`1.5px solid ${t.border}`,
                  background:t.bg2,cursor:"pointer",textAlign:"left",fontFamily:"inherit",
                  display:"flex",gap:14,alignItems:"center"}}>
                <div style={{fontSize:28,flexShrink:0}}>{opt.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,color:t.text,marginBottom:2}}>{opt.title}</div>
                  <div style={{fontSize:12,color:t.text3,lineHeight:1.5}}>{opt.sub}</div>
                </div>
                <Icon d={IC.chevronRight} size={15} color={t.text3} style={{flexShrink:0}}/>
              </button>
            ))}
          </div>
        )}

        {/* ── WORKER STEP 1 ─────────────────────────────────────────── */}
        {step==="w1"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {backBtn("choose")}
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
                <h2 style={{margin:0,fontSize:22,fontWeight:800,color:t.text}}>Compte artisan</h2>
                <span style={{fontSize:12,color:t.text3,fontWeight:500}}>1 / 2</span>
              </div>
              {stepBar(1)}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <label style={lbl}>Nom complet</label>
                <input value={name} onChange={e=>setName(e.target.value)}
                  placeholder="Youssef El Fassi" style={inp}/>
              </div>
              <div>
                <label style={lbl}>Téléphone</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)}
                  type="tel" placeholder="06 12 34 56 78" style={inp}/>
                <span style={{fontSize:11,color:t.text3,marginTop:5,display:"block"}}>
                  Utilisé pour WhatsApp et appels clients
                </span>
              </div>
              <div>
                <label style={lbl}>Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                  placeholder="votre@email.com" style={inp}/>
              </div>
              <div>
                <label style={lbl}>Mot de passe</label>
                {pwdField("Minimum 6 caractères")}
              </div>
            </div>
            {errBox}
            <Btn t={t} size="lg" style={{width:"100%"}} disabled={saving} onClick={async()=>{
              if(!name.trim()){ setErr("Entrez votre nom complet"); return; }
              if(!phone.trim()){ setErr("Entrez votre numéro de téléphone"); return; }
              if(!email.trim()){ setErr("Entrez votre email"); return; }
              if(password.length<6){ setErr("Mot de passe minimum 6 caractères"); return; }
              // Check if email already in use BEFORE going to step 2
              setSaving(true); setErr("");
              const { data:existing } = await supabase
                .from("workers").select("status").eq("email",email.trim().toLowerCase()).maybeSingle();
              if(existing){
                if(existing.status==="pending") setErr("PENDING");
                else setErr("Cet email est déjà utilisé. Connectez-vous.");
                setSaving(false); return;
              }
              setSaving(false);
              go("w2");
            }}>Continuer →</Btn>
          </div>
        )}

        {/* ── WORKER STEP 2 ─────────────────────────────────────────── */}
        {step==="w2"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {backBtn("w1")}
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
                <h2 style={{margin:0,fontSize:22,fontWeight:800,color:t.text}}>Votre activité</h2>
                <span style={{fontSize:12,color:t.text3,fontWeight:500}}>2 / 2</span>
              </div>
              {stepBar(2)}
            </div>
            <div>
              <label style={lbl}>Métier(s) <span style={{color:t.primary,fontWeight:900}}>*</span></label>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                {profList.map(p=>{
                  const sel=profs.includes(String(p.id));
                  return (
                    <button key={p.id} onClick={()=>toggleP(p.id)}
                      style={{padding:"12px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
                        fontFamily:"inherit",border:`1.5px solid ${sel?p.color:t.border}`,
                        background:sel?p.color+"18":t.bg2,transition:"all .15s"}}>
                      <div style={{display:"flex",justifyContent:"center",marginBottom:5}}>
                        <ProfIcon iconKey={p.icon} size={22} color={sel?p.color:t.text3}/>
                      </div>
                      <div style={{fontSize:9,fontWeight:700,color:sel?p.color:t.text3,lineHeight:1.3}}>
                        {p.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={lbl}>Ville <span style={{color:t.primary,fontWeight:900}}>*</span></label>
              <select value={city} onChange={e=>setCity(e.target.value)}
                style={{...inp,color:city?t.text:t.text3}}>
                <option value="">Sélectionner votre ville...</option>
                {cityList.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Niveau de prix</label>
              <div style={{display:"flex",gap:8}}>
                {[{id:0,label:"–",color:t.text3},...PRICE_LEVELS].map(pl=>(
                  <button key={pl.id} onClick={()=>setPrice(pl.id)}
                    style={{flex:1,padding:"10px 4px",borderRadius:10,cursor:"pointer",
                      fontFamily:"inherit",fontWeight:700,fontSize:13,
                      border:`1.5px solid ${price===pl.id?pl.color:t.border}`,
                      background:price===pl.id?pl.color+"18":t.bg2,
                      color:price===pl.id?pl.color:t.text3,transition:"all .15s"}}>
                    {pl.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={lbl}>Bio <span style={{color:t.text3,fontWeight:400,
                textTransform:"none",fontSize:11}}>(optionnel)</span></label>
              <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3}
                placeholder="Décrivez votre expérience, spécialités..."
                style={{...inp,resize:"none"}}/>
            </div>
            {errBox}
            <Btn t={t} size="lg" onClick={doRegisterWorker} style={{width:"100%"}} disabled={saving}>
              {saving?"Création en cours...":"Créer mon compte →"}
            </Btn>
          </div>
        )}

        {/* ── CLIENT ────────────────────────────────────────────────── */}
        {step==="client"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {backBtn("choose")}
            <div>
              <h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:t.text}}>Compte client</h2>
              <p style={{margin:0,color:t.text3,fontSize:13}}>Trouvez des artisans vérifiés</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <label style={lbl}>Prénom</label>
                <input value={name} onChange={e=>setName(e.target.value)}
                  placeholder="Votre prénom" style={inp}/>
              </div>
              <div>
                <label style={lbl}>Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
                  placeholder="votre@email.com" style={inp}/>
              </div>
              <div>
                <label style={lbl}>Mot de passe</label>
                {pwdField("Minimum 6 caractères", doRegisterClient)}
              </div>
            </div>
            {errBox}
            <Btn t={t} size="lg" onClick={doRegisterClient} style={{width:"100%"}} disabled={saving}>
              {saving?"Création en cours...":"Créer mon compte →"}
            </Btn>
          </div>
        )}

        {/* ── PENDING ───────────────────────────────────────────────── */}
        {step==="pending"&&(
          <div style={{textAlign:"center",padding:"8px 0 8px"}}>
            <div style={{fontSize:52,marginBottom:14}}>⏳</div>
            <h2 style={{margin:"0 0 10px",fontSize:20,fontWeight:800,color:t.text}}>Demande envoyée !</h2>
            <p style={{color:t.text2,fontSize:14,lineHeight:1.7,margin:"0 0 24px"}}>
              Votre profil est en cours de vérification.<br/>
              Vous recevrez un <strong>email</strong> sous <strong style={{color:t.primary}}>24h</strong>.
            </p>
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
            <div style={{fontWeight:700,fontSize:15,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{worker.name}</div>
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
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            {rating
              ?<><Stars rating={parseFloat(rating)} size={11} t={t}/>
                <span style={{color:t.text2,fontSize:12,fontWeight:500}}>{rating}</span>
                <span style={{color:t.text3,fontSize:11}}>({worker.reviews.length})</span></>
              :<span style={{color:t.text3,fontSize:12}}>Aucun avis</span>}
          </div>
          {worker.price_level>0&&PRICE_LEVELS.find(p=>p.id===worker.price_level)&&(
            <span style={{
              padding:"2px 7px",borderRadius:6,fontSize:11,fontWeight:800,
              background:PRICE_LEVELS.find(p=>p.id===worker.price_level).color+"18",
              color:PRICE_LEVELS.find(p=>p.id===worker.price_level).color,
              border:`1px solid ${PRICE_LEVELS.find(p=>p.id===worker.price_level).color}40`
            }}>{PRICE_LEVELS.find(p=>p.id===worker.price_level).label}</span>
          )}
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
    // Only auto-submit if user just logged in (not registered) via showAuthPrompt
    // reviewAutoSubmitted=true means handleAuth already submitted it — skip
    if(currentUser && showAuthPrompt && rf.comment.trim() && rf.workType && !reviewAutoSubmitted){
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
      <div style={{padding:"12px 16px 0",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{width:32,height:4,borderRadius:2,background:t.border2}}/>
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
          <div style={{marginLeft:"auto",paddingBottom:4,display:"flex",alignItems:"center",gap:8}}>
            <button onClick={onToggleFav}
              style={{width:34,height:34,borderRadius:8,border:`1px solid ${isFav?t.danger+"40":t.border}`,
                background:isFav?t.dangerLight:t.bg2,cursor:"pointer",display:"flex",
                alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon d={IC.heart} size={15} color={isFav?t.danger:t.text3}
                style={{fill:isFav?t.danger:"none",stroke:isFav?t.danger:t.text3}}/>
            </button>
            <AvailBadge available={worker.available} t={t}/>
          </div>
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
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"0.5px"}}>À PROPOS</div>
                {worker.price_level>0&&(<span style={{fontSize:13,fontWeight:800,color:PRICE_LEVELS.find(p=>p.id===worker.price_level)?.color}}>{PRICE_LEVELS.find(p=>p.id===worker.price_level)?.label} {PRICE_LEVELS.find(p=>p.id===worker.price_level)?.desc}</span>)}
              </div>
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
                    <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,
                      background:`linear-gradient(135deg,${GRAD_A[((r.author||"?").charCodeAt(0))%GRAD_A.length]},${GRAD_B[((r.author||"?").charCodeAt(0))%GRAD_B.length]})`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:14,fontWeight:700,color:"#fff"}}>
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
                    <div style={{fontSize:11,color:t.text3,marginBottom:8,fontWeight:500}}>VOTRE AVIS</div>
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
                        : <><Icon d={IC.user} size={13} color={t.ctaText}/>Se connecter pour publier</>}
                  </Btn>
                  {!currentUser&&rf.workType&&rf.comment.trim()&&(
                    <p style={{textAlign:"center",fontSize:11,color:t.text3,margin:"8px 0 0"}}>
                      Votre avis sera publié après connexion à votre compte
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
function HomePage({ workers, banner, onNavigate, setProfFilter, t, dark, onShowAuth }) {
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
        {/* Banner — managed from admin panel */}
        {banner?.url && (
          <div style={{margin:"0 0 32px",borderRadius:16,overflow:"hidden",border:`1px solid ${t.border}`,cursor:banner.link?"pointer":"default",flexShrink:0}}
            onClick={()=>banner.link&&window.open(banner.link,"_blank")}>
            <img src={banner.url} alt="Bannière" style={{width:"100%",display:"block",maxHeight:200,objectFit:"cover"}}/>
          </div>
        )}
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
      <Footer t={t} dark={dark}/>
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

// ─── DELETE ACCOUNT MODAL ──────────────────────────────────────────────────────
function DeleteAccountModal({ worker, t, onClose }) {
  const [txt,setTxt]=useState("");
  const [deleting,setDeleting]=useState(false);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:t.card,borderRadius:20,padding:28,maxWidth:400,width:"100%",border:`1px solid ${t.border}`}}>
        <div style={{fontSize:44,textAlign:"center",marginBottom:12}}>⚠️</div>
        <h3 style={{textAlign:"center",margin:"0 0 8px",color:t.text,fontSize:18,fontWeight:800}}>Supprimer mon compte</h3>
        <p style={{color:t.text2,fontSize:13,textAlign:"center",lineHeight:1.7,margin:"0 0 8px"}}>
          Cette action est <strong style={{color:t.danger}}>irréversible</strong>. Toutes vos données seront supprimées définitivement :
        </p>
        <ul style={{color:t.text3,fontSize:12,margin:"0 0 20px 16px",lineHeight:2}}>
          <li>Votre profil et informations personnelles</li>
          <li>Vos photos de portfolio</li>
          <li>Vos avis reçus</li>
        </ul>
        <div style={{background:t.dangerLight,border:`1px solid ${t.danger}30`,borderRadius:10,padding:"12px 14px",marginBottom:20}}>
          <p style={{color:t.danger,fontSize:12,margin:"0 0 8px",fontWeight:600}}>Tapez <strong>SUPPRIMER</strong> pour confirmer :</p>
          <input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="SUPPRIMER"
            style={{width:"100%",boxSizing:"border-box",background:t.bg,border:`1.5px solid ${txt==="SUPPRIMER"?t.danger:t.border}`,borderRadius:8,padding:"10px 12px",color:t.text,fontSize:14,fontFamily:"inherit",outline:"none"}}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"11px",borderRadius:10,border:`1px solid ${t.border}`,background:t.bg2,color:t.text,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Annuler</button>
          <button disabled={txt!=="SUPPRIMER"||deleting} onClick={async()=>{
            setDeleting(true);
            try {
              await supabase.from("portfolio_photos").delete().eq("worker_id",worker.id);
              await supabase.from("worker_professions").delete().eq("worker_id",worker.id);
              await supabase.from("reviews").delete().eq("worker_id",worker.id);
              await supabase.from("workers").delete().eq("id",worker.id);
              await supabase.auth.signOut();
              window.location.reload();
            } catch(e){ alert("Erreur: "+e.message); setDeleting(false); }
          }} style={{flex:1,padding:"11px",borderRadius:10,border:"none",background:txt==="SUPPRIMER"&&!deleting?t.danger:"#ccc",color:"white",fontWeight:700,fontSize:13,cursor:txt==="SUPPRIMER"&&!deleting?"pointer":"not-allowed",fontFamily:"inherit"}}>
            {deleting?"Suppression...":"Supprimer définitivement"}
          </button>
        </div>
      </div>
    </div>
  );
}


// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ t, dark=false }) {
  return (
    <footer style={{background:t.card,borderTop:`1px solid ${t.border}`,padding:"32px 24px",marginTop:"auto"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:16,textAlign:"center"}}>
        <AloAjiLogo height={24} dark={dark}/>
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
          <a href="mailto:contact@aloaji.ma" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>
            contact@aloaji.ma
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

  const [priceFilter,setPriceFilter]=useState(0); // 0=all
  const filtered=workers.filter(w=>{
    const ms=!search||w.name.toLowerCase().includes(search.toLowerCase())||(w.professionData&&w.professionData.some(p=>p&&p.name&&p.name.toLowerCase().includes(search.toLowerCase())))||PROFESSIONS.filter(p=>w.professions.some(pid=>String(pid)===String(p.id))).some(p=>p.name.toLowerCase().includes(search.toLowerCase()));
    const pp=priceFilter===0||(w.price_level||0)===priceFilter;
    const mc=city==="all"||w.city===city;
    const profObj=PROFESSIONS.find(p=>String(p.id)===String(profFilter));
    const mp=profFilter==="all"||!profObj||(w.professionData&&w.professionData.some(pd=>pd&&pd.name===profObj.name))||(w.professions&&w.professions.some(pid=>String(pid)===String(profFilter)));
    const ma=!avail||w.available;
    return ms&&mc&&mp&&ma&&pp;
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
          {/* Row 2: price filter */}
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
            <button onClick={()=>setPriceFilter(0)} style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${priceFilter===0?t.primary:t.border}`,background:priceFilter===0?t.primary+"18":"transparent",color:priceFilter===0?t.primary:t.text3,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",flexShrink:0,whiteSpace:"nowrap"}}>Tous prix</button>
            {PRICE_LEVELS.map(pl=>(
              <button key={pl.id} onClick={()=>setPriceFilter(pl.id)} style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${priceFilter===pl.id?pl.color:t.border}`,background:priceFilter===pl.id?pl.color+"18":"transparent",color:priceFilter===pl.id?pl.color:t.text3,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0,whiteSpace:"nowrap"}}>{pl.label} {pl.desc}</button>
            ))}
          </div>
          {/* Row 3: availability + profession chips */}
          <div style={{display:"flex",gap:6,alignItems:"center",overflowX:"auto",paddingBottom:2}}>
            <button onClick={()=>setAvail(v=>!v)}
              style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 10px",
                borderRadius:6,border:`1px solid ${avail?t.success+"60":t.border}`,
                background:avail?t.successLight:"transparent",
                color:avail?t.success:t.text3,fontSize:13,fontWeight:500,cursor:"pointer",
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


// ─── DELETE ACCOUNT MODAL ──────────────────────────────────────────────────────

// ─── WORKER DASHBOARD ─────────────────────────────────────────────────────────
function WorkerDash({ worker, onToggle, onRefresh, t }) {
  const [imgTab,setImgTab]=useState("portfolio");
  const [uploading,setUploading]=useState(false);
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [deleteConfirmText,setDeleteConfirmText]=useState("");
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
        {/* Price Level */}
        <Card t={t} hover={false} style={{padding:"20px",marginBottom:20}}>
          <div style={{fontWeight:700,fontSize:15,color:t.text,marginBottom:14}}>Mon niveau de prix</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[{id:0,label:"Non défini",color:t.text3,desc:""},...PRICE_LEVELS].map(pl=>(
              <button key={pl.id} onClick={async()=>{
                await supabase.from("workers").update({price_level:pl.id||null}).eq("id",worker.id);
                if(onRefresh) await onRefresh();
              }} style={{padding:"8px 16px",borderRadius:10,
                border:`1.5px solid ${(worker.price_level||0)===pl.id?pl.color||t.border2:t.border}`,
                background:(worker.price_level||0)===pl.id?`${pl.color||t.primary}18`:t.bg2,
                color:(worker.price_level||0)===pl.id?pl.color||t.primary:t.text3,
                fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
                {pl.label}{pl.desc?" — "+pl.desc:""}
              </button>
            ))}
          </div>
          <p style={{color:t.text3,fontSize:11,margin:"10px 0 0"}}>Visible sur votre fiche et dans les filtres de recherche.</p>
        </Card>

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

        {/* Legal + Delete — below reviews per Apple guidelines */}
        <div style={{marginTop:24,padding:"0 4px"}}>
          <div style={{display:"flex",gap:20,marginBottom:14,flexWrap:"wrap"}}>
            <a href="/privacy.html" target="_blank" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Politique de confidentialité</a>
            <a href="/terms.html" target="_blank" style={{color:t.text3,fontSize:12,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Conditions d'utilisation</a>
          </div>
          <button onClick={()=>setShowDeleteModal(true)}
            style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:8,
              border:`1px solid ${t.danger}40`,background:t.dangerLight,cursor:"pointer",
              color:t.danger,fontSize:13,fontWeight:600,fontFamily:"inherit"}}>
            <Icon d={IC.x} size={14} color={t.danger}/>Supprimer mon compte
          </button>
        </div>

        {showDeleteModal&&<DeleteAccountModal worker={worker} t={t}
          onClose={()=>setShowDeleteModal(false)}
          onConfirm={async()=>{
            try {
              await supabase.from("portfolio_photos").delete().eq("worker_id", worker.id);
              await supabase.from("worker_professions").delete().eq("worker_id", worker.id);
              await supabase.from("reviews").delete().eq("worker_id", worker.id);
              await supabase.from("workers").delete().eq("id", worker.id);
              await supabase.auth.signOut();
              window.location.reload();
            } catch(e){ alert("Erreur: "+e.message); setShowDeleteModal(false); }
          }}/>}
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
            <div style={{width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,${GRAD_A[0]},${GRAD_B[0]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"#fff", flexShrink:0}}>
              {currentUser.name ? currentUser.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase() : <Icon d={IC.user} size={14} color={t.text3}/>}
            </div>
            <div>
              <h2 style={{margin:0, fontSize:20, fontWeight:900, color:t.text}}>{currentUser.name||"Mon compte"}</h2>
              <div style={{color:t.text3, fontSize:13, marginTop:2}}>{currentUser.email||""}</div>
              <div style={{display:"inline-flex", alignItems:"center", gap:5, marginTop:6, padding:"3px 10px", borderRadius:20, background:`${t.primary}18`, border:`1px solid ${t.primary}30`}}>
                <span style={{fontSize:10, fontWeight:700, color:t.primary}}>✨ Membre AloAji</span>
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
                      : <div style={{width:46, height:46, borderRadius:"50%", background:`linear-gradient(135deg,${GRAD_A[(w.gi||0)%GRAD_A.length]},${GRAD_B[(w.gi||0)%GRAD_B.length]})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:15}}>{w.initials}</div>
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
            <AloAjiLogo height={22} dark={dark}/>
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
                <Btn t={t} variant="ghost" size="sm" onClick={()=>onShowAuth("login")} style={{fontSize:14,padding:"7px 14px"}}>Connexion</Btn>
                <span className="aloaji-desktop-only">
                  <Btn t={t} variant="outline" size="sm" onClick={()=>onShowAuth("register")} style={{fontSize:14,padding:"7px 14px"}}>S'inscrire</Btn>
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
              style={{flex:1,padding:"12px 0 14px",border:"none",background:"none",cursor:"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:5,fontFamily:"inherit"}}>
              {isProfile&&currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt=""
                  style={{width:22,height:22,borderRadius:"50%",objectFit:"cover",
                    outline:isActive?`2px solid ${t.text}`:"2px solid transparent",outlineOffset:1}}/>
              ) : isProfile&&currentUser&&initials ? (
                <div style={{width:22,height:22,borderRadius:"50%",
                  background:`linear-gradient(135deg,${GRAD_A[0]},${GRAD_B[0]})`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:8,fontWeight:700,color:"#fff"}}>
                  {initials}
                </div>
              ) : (
                <Icon d={n.ic} size={22} color={isActive?t.text:t.text3}/>
              )}
              <span style={{fontSize:11,fontWeight:500,color:isActive?t.text:t.text3,letterSpacing:"0.1px"}}>{n.l}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark,setDark]=useState(false);
  const t=dark?DARK:LIGHT;
  const [page,setPage]=useState("home");
  const [workers,setWorkers]=useState([]);
  const [banner,setBanner]=useState(null);
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
  const [showResetPwd,setShowResetPwd]=useState(false);
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
    // Listen for Supabase auth events — catches password recovery redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if(event === "PASSWORD_RECOVERY"){
        setShowResetPwd(true);
        // Clean the URL hash so it doesn't re-trigger on refresh
        window.history.replaceState(null,"",window.location.pathname);
      }
    });
    checkSession();
    return () => subscription.unsubscribe();
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
        price_level: w.price_level||0,
        reviews: (w.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
        portfolio: (w.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
        initials: w.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),
        gi: i%6,
      }));

      setWorkers(shaped);

      // Load banner
      const { data: bannerData } = await supabase.from("banner").select("*").eq("active", true).maybeSingle();
      setBanner(bannerData || null);

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
    if(!session) return;

    const userEmail = session.user.email || "";

    // 1. Check workers table first
    const { data:worker } = await supabase
      .from("workers")
      .select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`)
      .eq("email", userEmail.toLowerCase())
      .maybeSingle();

    if(worker){
      if(worker.status==="approved"){
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
        setCurrentUser({ id:worker.id, name:worker.name, email:userEmail, role:"worker", status:"approved", avatarUrl:worker.avatar_url||null });
        setWorkerProfile(shaped);
      } else if(worker.status==="pending"){
        setCurrentUser({ id:worker.id, name:worker.name, email:userEmail, role:"pending", status:"pending" });
      }
      return;
    }

    // 2. Check user_profiles (consumers)
    const { data:profile } = await supabase
      .from("user_profiles")
      .select("name, email")
      .eq("email", userEmail.toLowerCase())
      .maybeSingle();

    const displayName = profile?.name || session.user.user_metadata?.name || userEmail.split("@")[0];
    setCurrentUser({ name:displayName, email:userEmail, role:"consumer", status:"active" });
  };

  const loadWorkerProfile = async (workerId) => {
    const { data } = await supabase
      .from("workers")
      .select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`)
      .eq("id", workerId).maybeSingle();
    if(data){
      const shaped = {
        ...data,
        city: data.city?.name||"",
        professions:(data.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
        professionData:(data.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
        reviews:(data.reviews||[]).map(r=>({...r,author:r.author_name,workType:r.work_type,date:r.created_at?.split("T")[0]})),
        portfolio:(data.portfolio_photos||[]).map((p,j)=>({...p,gi:j%6})),
        initials:data.name.trim().split(" ").slice(0,2).map(n=>n[0]||"").join("").toUpperCase(),
        gi:0,
      };
      setWorkerProfile(shaped);
    }
  };

  const [pendingReview,setPendingReview]=useState(null);
  const [reviewJustSubmitted,setReviewJustSubmitted]=useState(false);

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
    if(pendingReview && (user.role==="consumer"||user.role==="worker")){
      const { workerId, review } = pendingReview;
      setPendingReview(null);
      setReviewJustSubmitted(true);
      setTimeout(()=>setReviewJustSubmitted(false), 3000);
      try {
        await supabase.from("reviews").insert({
          worker_id: workerId,
          author_name: user.name,
          rating: review.rating,
          comment: review.comment,
          work_type: review.workType,
        });
        await loadData();
      } catch(e){ console.error("Review post-auth failed:", e); }
    }
  };

  const handleShowAuth = (mode="login") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setWorkerProfile(null);
    setPage("home");
  };

  const handleNavigate = (target, params={}) => {
    if(target==="search"){
      if(params.search!==undefined) setHeroSearch(params.search);
      if(params.city!==undefined) setHeroCity(params.city);
      setPage("search");
    } else if(target==="worker" && params.worker){
      openWorkerProfile(params.worker);
    } else {
      setPage(target);
    }
  };

  const handleNeedAuth = (reviewData, workerId) => {
    setPendingReview({ workerId, review: reviewData });
    handleShowAuth("login");
  };

  const handleReview = async (workerId, review) => {
    if(!currentUser){
      handleNeedAuth(review, workerId);
      return;
    }
    try {
      const { data: newReview, error } = await supabase.from("reviews").insert({
        worker_id: workerId,
        author_name: currentUser.name,
        rating: review.rating,
        comment: review.comment,
        work_type: review.workType,
      }).select().single();
      if(error) throw error;

      // Update selectedWorker locally — no full page reload
      const shaped = {
        ...newReview,
        author: currentUser.name,
        workType: newReview.work_type,
        date: newReview.created_at?.split("T")[0],
      };
      setSelectedWorker(prev => {
        if(!prev || prev.id !== workerId) return prev;
        const updatedReviews = [...(prev.reviews||[]), shaped];
        const avg = updatedReviews.reduce((s,r)=>s+r.rating,0) / updatedReviews.length;
        return { ...prev, reviews: updatedReviews, rating: Math.round(avg*10)/10 };
      });
      // Also update workers list rating silently in background
      setWorkers(ws => ws.map(w => {
        if(w.id !== workerId) return w;
        const updatedReviews = [...(w.reviews||[]), shaped];
        const avg = updatedReviews.reduce((s,r)=>s+r.rating,0) / updatedReviews.length;
        return { ...w, reviews: updatedReviews, rating: Math.round(avg*10)/10 };
      }));
      // If it's our own worker profile, update that too
      if(workerProfile?.id===workerId) {
        setWorkerProfile(prev => {
          const updatedReviews = [...(prev.reviews||[]), shaped];
          const avg = updatedReviews.reduce((s,r)=>s+r.rating,0) / updatedReviews.length;
          return { ...prev, reviews: updatedReviews, rating: Math.round(avg*10)/10 };
        });
      }
    } catch(e){ console.error("Review failed:", e); }
  };

  const handleToggleAvailable = async () => {
    if(!workerProfile) return;
    const newVal = !workerProfile.available;
    await supabase.from("workers").update({available:newVal}).eq("id",workerProfile.id);
    setWorkerProfile(p=>({...p,available:newVal}));
    setWorkers(ws=>ws.map(w=>w.id===workerProfile.id?{...w,available:newVal}:w));
  };

  const refreshWorkerProfile = async (newAvatarUrl) => {
    if(!workerProfile) return;
    await loadWorkerProfile(workerProfile.id);
    if(newAvatarUrl) setCurrentUser(u=>({...u,avatarUrl:newAvatarUrl}));
    await loadData();
  };

  if(loading) return <SkeletonHomePage t={t}/>;
  if(loadError) return <ErrorPage error={loadError} onRetry={loadData} t={t}/>;

  return (
    <div style={{paddingTop:56,paddingBottom:60,minHeight:"100vh",background:t.bg,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <NavBar page={page} setPage={setPage} dark={dark} setDark={setDark}
        currentUser={currentUser} onShowAuth={handleShowAuth} onLogout={handleLogout} t={t}/>

      {page==="home"&&<HomePage workers={workers} banner={banner} onNavigate={handleNavigate}
        setProfFilter={setProfFilter} t={t} dark={dark} onShowAuth={handleShowAuth}/>}

      {page==="search"&&<SearchPage workers={workers} onSelect={openWorkerProfile}
        initSearch={heroSearch} initCity={heroCity} profFilter={profFilter}
        setProfFilter={setProfFilter} favorites={favorites} onToggleFav={toggleFavorite} t={t}/>}

      {page==="monespace"&&currentUser&&currentUser.role==="worker"&&workerProfile&&(
        <WorkerDash worker={workerProfile} onToggle={handleToggleAvailable}
          onRefresh={refreshWorkerProfile} t={t}/>
      )}
      {page==="monespace"&&currentUser&&(currentUser.role==="consumer")&&(
        <ConsumerDash currentUser={currentUser} workers={workers} favorites={favorites}
          onToggleFav={toggleFavorite} onViewWorker={openWorkerProfile}
          onSearch={()=>setPage("search")} t={t}/>
      )}
      {page==="monespace"&&currentUser&&currentUser.role==="pending"&&(
        <div style={{padding:"60px 24px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>⏳</div>
          <h2 style={{color:t.text,marginBottom:8}}>Compte en cours de validation</h2>
          <p style={{color:t.text2,fontSize:14}}>Notre équipe vérifie votre profil. Vous recevrez un email sous 24h.</p>
        </div>
      )}
      {page==="monespace"&&!currentUser&&(
        <div style={{padding:"80px 24px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>👤</div>
          <h2 style={{color:t.text,marginBottom:12}}>Connectez-vous</h2>
          <p style={{color:t.text2,marginBottom:24,fontSize:14}}>Accédez à votre espace artisan ou client.</p>
          <button onClick={()=>handleShowAuth("login")}
            style={{padding:"12px 32px",borderRadius:10,background:t.cta,color:t.ctaText,
              border:`1px solid ${t.ctaBorder}`,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Se connecter
          </button>
        </div>
      )}

      {/* Worker profile sheet */}
      {selectedWorker&&(
        <WorkerSheet worker={selectedWorker} onClose={()=>setSelectedWorker(null)}
          onReview={handleReview} currentUser={currentUser}
          onNeedAuth={(rv)=>handleNeedAuth(rv, selectedWorker.id)}
          isFav={favorites.includes(selectedWorker.id)}
          onToggleFav={()=>toggleFavorite(selectedWorker.id)}
          reviewAutoSubmitted={reviewJustSubmitted}
          t={t}/>
      )}

      {/* Auth modal */}
      {showResetPwd&&(
        <ResetPasswordModal onClose={()=>{ setShowResetPwd(false); checkSession(); }} t={t}/>
      )}
      {showAuth&&!showResetPwd&&(
        <PhoneAuth onClose={()=>setShowAuth(false)} onAuth={handleAuth}
          mode={authMode} t={t} dbCities={cities} dbProfessions={professions}/>
      )}

      {/* Mobile bottom nav */}
      <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,
        background:t.nav,backdropFilter:"blur(12px)",borderTop:`1px solid ${t.border}`,
        display:"flex",justifyContent:"space-around",alignItems:"center",height:60,
        paddingBottom:"env(safe-area-inset-bottom)"}}>
        {[
          {id:"home",   label:"Accueil", ic:IC.home},
          {id:"search", label:"Chercher",ic:IC.search},
          {id:"monespace",label:"Mon Espace",ic:IC.user},
        ].map(item=>(
          <button key={item.id} onClick={()=>setPage(item.id)}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              background:"none",border:"none",cursor:"pointer",padding:"8px 12px",
              color:page===item.id?t.primary:t.text3,fontFamily:"inherit"}}>
            <Icon d={item.ic} size={22} color={page===item.id?t.primary:t.text3}/>
            <span style={{fontSize:11,fontWeight:page===item.id?600:400}}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}