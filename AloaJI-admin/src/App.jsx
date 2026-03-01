import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Admin uses the SERVICE ROLE key so it bypasses RLS and can write to all tables
// This key must be kept server-side only in production — for now it's in the admin-only bundle
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ── Admin allowlist — only these emails can access the admin panel ──────────
// Add your admin emails here. These must also exist in Supabase Auth → Users.
const ADMIN_EMAILS = [
  "hello@ayoubka.com",
];

// ─── DESIGN TOKENS (matches main app DARK theme) ─────────────────────────────
const T = {
  bg:       "#09090b", bg2:     "#18181b", bg3:     "#27272a",
  border:   "#27272a", border2: "#3f3f46",
  text:     "#fafafa", text2:   "#a1a1aa", text3:   "#71717a",
  card:     "#09090b", cardHov: "#18181b",
  nav:      "rgba(9,9,11,0.92)",
  accent:   "#f59e0b", accentLight: "#f59e0b18",
  primary:  "#e4e4e7",
  success:  "#22c55e", successLight: "#22c55e12",
  danger:   "#ef4444", dangerLight:  "#ef444412",
  warning:  "#f59e0b", warningLight: "#f59e0b12",
  info:     "#38bdf8", infoLight:    "#38bdf812",
};

// ─── ICON SYSTEM (same as main app) ──────────────────────────────────────────
const Icon = ({ d, size=16, color="currentColor", strokeWidth=1.5, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    style={{display:"inline-block",flexShrink:0,...style}}>
    {Array.isArray(d) ? d.map((p,i)=><path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);

const IC = {
  search:      "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  plus:        "M12 5v14M5 12h14",
  edit:        ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  trash:       ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  check:       "M20 6L9 17l-5-5",
  x:           "M18 6L6 18M6 6l12 12",
  logOut:      ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
  home:        ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"],
  user:        ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  users:       ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
  clock:       ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
  star:        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  mapPin:      "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  phone:       "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  wrench:      "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  messageCircle: ["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"],
  barChart:    ["M12 20V10","M18 20V4","M6 20v-4"],
  filter:      "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  eye:         ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  chevronRight:"M9 18l6-6-6-6",
  chevronDown: "M6 9l6 6 6-6",
  arrowLeft:   ["M19 12H5","M12 19l-7-7 7-7"],
  loader:      ["M12 2v4","M12 18v4","M4.93 4.93l2.83 2.83","M16.24 16.24l2.83 2.83","M2 12h4","M18 12h4","M4.93 19.07l2.83-2.83","M16.24 7.76l2.83-2.83"],
  // profession icons
  droplets:    ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"],
  zap:         "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  paintbrush2: ["M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z","M12 11v4","M12 19a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z"],
  bricks:      ["M3 4h18v4H3z","M3 12h18v4H3z","M7 4v4","M12 4v4","M17 4v4","M5 12v4","M10 12v4","M15 12v4","M20 12v4"],
  hammer2:     ["M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"],
  grid2:       ["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"],
  thermometer: ["M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"],
  image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
  flame2:      "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
};

// ─── STATIC DATA (used as fallback when Supabase not loaded) ──────────────────
const PROFS0 = [
  { id:1, name:"Plombier",      icon:"droplets",    color:"#0284C7", bg:"#E0F2FE" },
  { id:2, name:"Électricien",   icon:"zap",         color:"#D97706", bg:"#FEF3C7" },
  { id:3, name:"Peintre",       icon:"paintbrush2", color:"#DB2777", bg:"#FCE7F3" },
  { id:4, name:"Maçon",         icon:"bricks",      color:"#7C3AED", bg:"#EDE9FE" },
  { id:5, name:"Menuisier",     icon:"hammer2",     color:"#059669", bg:"#D1FAE5" },
  { id:6, name:"Carreleur",     icon:"grid2",       color:"#4338CA", bg:"#E0E7FF" },
  { id:7, name:"Climatisation", icon:"thermometer", color:"#0891B2", bg:"#CFFAFE" },
  { id:8, name:"Soudeur",       icon:"flame2",      color:"#DC2626", bg:"#FEE2E2" },
];
const CITIES0 = [
  { id:1, name:"Casablanca", lat:33.5731, lng:-7.5898 },
  { id:2, name:"Rabat",      lat:34.0209, lng:-6.8416 },
  { id:3, name:"Marrakech",  lat:31.6295, lng:-7.9811 },
  { id:4, name:"Fès",        lat:34.0181, lng:-5.0078 },
  { id:5, name:"Tanger",     lat:35.7595, lng:-5.834  },
  { id:6, name:"Agadir",     lat:30.4278, lng:-9.5981 },
  { id:7, name:"Meknès",     lat:33.8935, lng:-5.5473 },
  { id:8, name:"Oujda",      lat:34.6805, lng:-1.9076 },
];

const ICON_OPTIONS = [
  { key:"droplets",    label:"Plombier / Eau" },
  { key:"zap",         label:"Électricité" },
  { key:"paintbrush2", label:"Peinture" },
  { key:"bricks",      label:"Maçonnerie" },
  { key:"hammer2",     label:"Menuiserie" },
  { key:"grid2",       label:"Carrelage" },
  { key:"thermometer", label:"Climatisation" },
  { key:"flame2",      label:"Soudure / Feu" },
  { key:"wrench",      label:"Réparation" },
  { key:"phone",       label:"Service" },
  { key:"shield",      label:"Sécurité" },
  { key:"home",        label:"Immobilier" },
];
const COLOR_OPTIONS = [
  { hex:"#0284C7", bg:"#E0F2FE", name:"Bleu" },
  { hex:"#D97706", bg:"#FEF3C7", name:"Ambre" },
  { hex:"#DB2777", bg:"#FCE7F3", name:"Rose" },
  { hex:"#7C3AED", bg:"#EDE9FE", name:"Violet" },
  { hex:"#059669", bg:"#D1FAE5", name:"Vert" },
  { hex:"#4338CA", bg:"#E0E7FF", name:"Indigo" },
  { hex:"#0891B2", bg:"#CFFAFE", name:"Cyan" },
  { hex:"#DC2626", bg:"#FEE2E2", name:"Rouge" },
  { hex:"#EA580C", bg:"#FFEDD5", name:"Orange" },
  { hex:"#65A30D", bg:"#ECFCCB", name:"Lime" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const avg = rs => rs?.length ? (rs.reduce((a,r)=>a+r.rating,0)/rs.length).toFixed(1) : null;
const initials = n => n?.trim().split(" ").slice(0,2).map(x=>x[0]||"").join("").toUpperCase() || "?";
const ago = s => {
  const m = Math.round((Date.now()-new Date(s))/60000);
  return m<60?`${m}min`:m<1440?`${Math.round(m/60)}h`:`${Math.round(m/1440)}j`;
};
const GRAD_COLORS = [["#1e3a5f","#2d5a8e"],["#3d1a5f","#6b3fa0"],["#1a3d2d","#2d6b4a"],["#5f3a1a","#a06b2d"],["#1a2d5f","#2d4aa0"],["#5f1a3a","#a02d6b"]];


const PRICE_LEVELS = [
  { id:1, label:"€",   desc:"Économique", color:"#16A34A" },
  { id:2, label:"€€",  desc:"Modéré",     color:"#D97706" },
  { id:3, label:"€€€", desc:"Premium",    color:"#DC2626" },
];

// ─── BASE COMPONENTS ──────────────────────────────────────────────────────────
function Avatar({ name, size=40, gi=0 }) {
  const [g1,g2] = GRAD_COLORS[gi%GRAD_COLORS.length];
  return (
    <div style={{width:size,height:size,borderRadius:"50%",
      background:`linear-gradient(135deg,${g1},${g2})`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*.32,fontWeight:600,color:"#fff",flexShrink:0}}>
      {initials(name)}
    </div>
  );
}

function ProfIcon({ iconKey, size=16, color="currentColor" }) {
  const d = IC[iconKey] || IC.wrench;
  return <Icon d={d} size={size} color={color}/>;
}

function Badge({ children, color, style={} }) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:4,
      fontSize:11,padding:"2px 8px",borderRadius:6,fontWeight:500,
      background:`${color}18`,color,border:`1px solid ${color}28`,...style}}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    approved: { color:T.success, label:"Approuvé" },
    pending:  { color:T.warning, label:"En attente" },
    rejected: { color:T.danger,  label:"Rejeté" },
  };
  const s = map[status] || map.pending;
  return <Badge color={s.color}>{s.label}</Badge>;
}

function Btn({ children, variant="default", size="md", onClick, disabled, style={}, full }) {
  const pad = { sm:"5px 10px", md:"8px 14px", lg:"11px 20px" }[size];
  const fs  = { sm:11, md:13, lg:14 }[size];
  const variants = {
    default: { background:T.primary,  color:"#09090b",  border:`1px solid ${T.primary}` },
    outline: { background:"transparent", color:T.text,  border:`1px solid ${T.border2}` },
    ghost:   { background:"transparent", color:T.text2, border:"none" },
    danger:  { background:T.dangerLight, color:T.danger, border:`1px solid ${T.danger}28` },
    success: { background:T.successLight,color:T.success,border:`1px solid ${T.success}28` },
    warning: { background:T.warningLight,color:T.warning,border:`1px solid ${T.warning}28` },
  };
  const v = variants[variant] || variants.default;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{...v,padding:pad,borderRadius:7,fontWeight:500,fontSize:fs,
        cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,
        fontFamily:"inherit",display:"inline-flex",alignItems:"center",
        justifyContent:"center",gap:6,transition:"all .15s",
        width:full?"100%":"auto",...style}}>
      {children}
    </button>
  );
}

function Input({ label, placeholder, value, onChange, type="text", leftIcon, onKeyDown, style={} }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      {label&&<label style={{fontSize:11,fontWeight:500,color:T.text3,letterSpacing:"0.3px"}}>{label}</label>}
      <div style={{position:"relative"}}>
        {leftIcon&&<span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",display:"flex",pointerEvents:"none"}}>
          <Icon d={leftIcon} size={14} color={T.text3}/>
        </span>}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{width:"100%",boxSizing:"border-box",
            background:T.bg2,border:`1px solid ${focused?T.border2:T.border}`,
            borderRadius:7,padding:`8px ${leftIcon?"8px 8px 32px":"10px"}`,
            paddingLeft:leftIcon?"32px":"10px",
            color:T.text,fontSize:13,outline:"none",fontFamily:"inherit",
            transition:"border-color .15s",...style}}/>
      </div>
    </div>
  );
}

function Select({ label, children, value, onChange }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      {label&&<label style={{fontSize:11,fontWeight:500,color:T.text3,letterSpacing:"0.3px"}}>{label}</label>}
      <select value={value} onChange={onChange}
        style={{background:T.bg2,border:`1px solid ${T.border}`,
          borderRadius:7,padding:"8px 10px",color:T.text,fontSize:13,
          fontFamily:"inherit",outline:"none"}}>
        {children}
      </select>
    </div>
  );
}

function Card({ children, style={}, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:T.bg,border:`1px solid ${hov&&onClick?T.border2:T.border}`,
        borderRadius:10,transition:"all .15s",
        cursor:onClick?"pointer":"default",...style}}>
      {children}
    </div>
  );
}

function Toast({ msg }) {
  if(!msg) return null;
  return (
    <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",
      background:T.success,color:"#fff",padding:"10px 20px",borderRadius:8,
      fontWeight:500,fontSize:13,zIndex:9999,whiteSpace:"nowrap",
      boxShadow:"0 4px 12px rgba(0,0,0,0.3)"}}>
      {msg}
    </div>
  );
}

function Separator() {
  return <div style={{height:1,background:T.border,margin:"4px 0"}}/>;
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, onClick }) {
  return (
    <Card onClick={onClick} style={{padding:"16px",cursor:onClick?"pointer":"default"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{fontSize:12,color:T.text3,fontWeight:400}}>{label}</div>
        <div style={{width:32,height:32,borderRadius:7,background:`${color}18`,
          display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon d={icon} size={15} color={color}/>
        </div>
      </div>
      <div style={{fontSize:26,fontWeight:600,color:T.text,letterSpacing:"-0.5px"}}>{value}</div>
    </Card>
  );
}

// ─── SECTION: DASHBOARD ───────────────────────────────────────────────────────
function Dashboard({ workers, pending, consumers=[], cities, profs, go }) {
  const total = workers.length;
  const avail = workers.filter(w=>w.available).length;
  const allR  = workers.flatMap(w=>w.reviews||[]);
  const gr    = allR.length ? (allR.reduce((a,r)=>a+r.rating,0)/allR.length).toFixed(1) : "—";
  const totalConsumers = consumers.length;

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:600,color:T.text}}>Dashboard</h2>
        <p style={{color:T.text3,margin:0,fontSize:13}}>Vue d'ensemble AloAji</p>
      </div>

      {/* Pending alert */}
      {pending.length>0&&(
        <div onClick={()=>go("pending")}
          style={{background:T.warningLight,border:`1px solid ${T.warning}30`,
            borderRadius:10,padding:"14px 18px",marginBottom:20,
            display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
          <Icon d={IC.clock} size={20} color={T.warning}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:500,fontSize:14,color:T.warning}}>
              {pending.length} demande{pending.length>1?"s":""} en attente
            </div>
            <div style={{color:T.text3,fontSize:12,marginTop:1}}>Cliquez pour traiter</div>
          </div>
          <Btn variant="warning" size="sm" onClick={()=>go("pending")}>
            Traiter <Icon d={IC.chevronRight} size={13} color={T.warning}/>
          </Btn>
        </div>
      )}

      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:24}}>
        <StatCard label="Artisans approuvés" value={total}           icon={IC.users}    color={T.info}/>
        <StatCard label="Membres inscrits"    value={totalConsumers} icon={IC.user}    color={T.primary} onClick={()=>go("membres")}/>
        <StatCard label="Disponibles"         value={avail}          icon={IC.check}   color={T.success}/>
        <StatCard label="En attente"          value={pending.length} icon={IC.clock}   color={T.warning} onClick={()=>go("pending")}/>
        <StatCard label="Avis clients"       value={allR.length}    icon={IC.messageCircle} color={T.accent}/>
        <StatCard label="Note moyenne"       value={gr+"★"}         icon={IC.star}   color={T.accent}/>
        <StatCard label="Villes"             value={cities.length}  icon={IC.mapPin} color={T.info} onClick={()=>go("cities")}/>
        <StatCard label="Métiers"            value={profs.length}   icon={IC.wrench} color="#a78bfa" onClick={()=>go("professions")}/>
        <StatCard label="Indisponibles"      value={total-avail}    icon={IC.x}      color={T.text3}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {/* By city */}
        <Card style={{padding:"18px"}}>
          <div style={{fontWeight:500,fontSize:14,color:T.text,marginBottom:16,display:"flex",alignItems:"center",gap:6}}>
            <Icon d={IC.mapPin} size={14} color={T.text3}/>Répartition par ville
          </div>
          {cities.filter(c=>workers.some(w=>w.city===c.name)).map(city=>{
            const n = workers.filter(w=>w.city===city.name).length;
            const pct = total?(n/total)*100:0;
            return (
              <div key={city.id} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:T.text2}}>{city.name}</span>
                  <span style={{fontSize:11,color:T.text3}}>{n}</span>
                </div>
                <div style={{height:4,background:T.bg3,borderRadius:2,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:T.info,borderRadius:2}}/>
                </div>
              </div>
            );
          })}
        </Card>

        {/* Recent workers */}
        <Card style={{padding:"18px"}}>
          <div style={{fontWeight:500,fontSize:14,color:T.text,marginBottom:16,display:"flex",alignItems:"center",gap:6}}>
            <Icon d={IC.users} size={14} color={T.text3}/>Artisans récents
          </div>
          {[...workers].reverse().slice(0,5).map(w=>(
            <div key={w.id} style={{display:"flex",gap:9,alignItems:"center",
              padding:"8px",background:T.bg2,borderRadius:8,marginBottom:6,
              border:`1px solid ${T.border}`}}>
              <Avatar name={w.name} size={30} gi={w.gi||0}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:500,fontSize:12,color:T.text,
                  whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{w.name}</div>
                <div style={{fontSize:10,color:T.text3,marginTop:1,display:"flex",alignItems:"center",gap:3}}>
                  <Icon d={IC.mapPin} size={9} color={T.text3}/>{w.city}
                  {w.price_level>0&&PRICE_LEVELS.find(p=>p.id===w.price_level)&&(
                    <span style={{marginLeft:4,fontSize:10,fontWeight:800,
                      color:PRICE_LEVELS.find(p=>p.id===w.price_level).color}}>
                      {PRICE_LEVELS.find(p=>p.id===w.price_level).label}
                    </span>
                  )}
                </div>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px",
                borderRadius:20,background:w.available?T.successLight:T.bg3,
                border:`1px solid ${w.available?T.success+"30":T.border}`,
                fontSize:10,fontWeight:500,color:w.available?T.success:T.text3}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:w.available?T.success:T.text3}}/>
                {w.available?"Dispo":"Indispo"}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── SECTION: PENDING ─────────────────────────────────────────────────────────
function Pending({ pending, profs, onApprove, onReject, onRefresh }) {
  const [detail, setDetail] = useState(null);

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:600,color:T.text}}>Demandes en attente</h2>
        <p style={{color:T.text3,margin:0,fontSize:13}}>{pending.length} demande{pending.length!==1?"s":""} à traiter</p>
      </div>

      {pending.length===0?(
        <Card style={{padding:"60px 40px",textAlign:"center"}}>
          <div style={{width:48,height:48,borderRadius:12,background:T.successLight,
            border:`1px solid ${T.success}30`,display:"flex",alignItems:"center",
            justifyContent:"center",margin:"0 auto 16px"}}>
            <Icon d={IC.check} size={22} color={T.success}/>
          </div>
          <p style={{color:T.text2,fontSize:14,fontWeight:500,margin:0}}>Tout est traité !</p>
          <p style={{color:T.text3,fontSize:13,margin:"4px 0 0"}}>Aucune demande en attente</p>
        </Card>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {pending.map(w=>{
            const ps = (w.professions||[]).map(pid=>profs.find(p=>p.id===pid)).filter(Boolean);
            return (
              <Card key={w.id} style={{padding:"16px 18px"}}>
                <div style={{display:"flex",gap:12}}>
                  <Avatar name={w.name} size={46} gi={w.gi||0}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:15,color:T.text}}>{w.name}</div>
                        <div style={{display:"flex",alignItems:"center",gap:10,color:T.text3,fontSize:12,marginTop:3}}>
                          <span style={{display:"flex",alignItems:"center",gap:3}}>
                            <Icon d={IC.mapPin} size={11} color={T.text3}/>{w.city}
                          </span>
                          <span style={{display:"flex",alignItems:"center",gap:3}}>
                            <Icon d={IC.phone} size={11} color={T.text3}/>{w.phone}
                          </span>
                        </div>
                      </div>
                      <span style={{fontSize:11,color:T.text3,flexShrink:0,marginLeft:8}}>
                        il y a {ago(w.submittedAt)}
                      </span>
                    </div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:8}}>
                      {ps.map(p=>(
                        <Badge key={p.id} color={p.color} style={{fontSize:11}}>
                          <ProfIcon iconKey={p.icon} size={10} color={p.color}/>{p.name}
                        </Badge>
                      ))}
                    </div>
                    {w.bio&&<p style={{margin:"8px 0 0",color:T.text2,fontSize:12,lineHeight:1.5}}>{w.bio}</p>}
                    {/* Price Level Editor */}
                    <div style={{margin:"10px 0 0",padding:"10px",background:T.bg,borderRadius:8,border:`1px solid ${T.border}`}}>
                      <div style={{fontSize:11,fontWeight:600,color:T.text3,marginBottom:8}}>Niveau de prix</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {[{id:0,label:"Non défini",color:T.text3},...PRICE_LEVELS].map(pl=>(
                          <button key={pl.id}
                            onClick={async()=>{
                              await supabase.from("workers").update({price_level:pl.id||null}).eq("id",w.id);
                              onRefresh&&await onRefresh();
                            }}
                            style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",
                              border:`1.5px solid ${(w.price_level||0)===pl.id?pl.color||T.primary:T.border}`,
                              background:(w.price_level||0)===pl.id?`${pl.color||T.primary}18`:T.bg2,
                              color:(w.price_level||0)===pl.id?pl.color||T.primary:T.text3}}>
                            {pl.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8,marginTop:12}}>
                      <Btn variant="success" size="sm" onClick={()=>onApprove(w.id)}>
                        <Icon d={IC.check} size={13} color={T.success}/>Approuver
                      </Btn>
                      <Btn variant="danger" size="sm" onClick={()=>onReject(w.id)}>
                        <Icon d={IC.x} size={13} color={T.danger}/>Rejeter
                      </Btn>
                      <Btn variant="ghost" size="sm" onClick={()=>setDetail(w)}>
                        <Icon d={IC.eye} size={13} color={T.text3}/>Détails
                      </Btn>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {detail&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",
          alignItems:"center",justifyContent:"center",zIndex:2000,backdropFilter:"blur(4px)",padding:20}}
          onClick={()=>setDetail(null)}>
          <div onClick={e=>e.stopPropagation()}
            style={{background:T.bg,border:`1px solid ${T.border2}`,borderRadius:14,
              width:"100%",maxWidth:480,overflow:"auto",maxHeight:"88vh"}}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${T.border}`,
              display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:600,fontSize:15,color:T.text}}>Dossier de candidature</div>
              <button onClick={()=>setDetail(null)}
                style={{background:"none",border:"none",cursor:"pointer",color:T.text3,padding:4}}>
                <Icon d={IC.x} size={18} color={T.text3}/>
              </button>
            </div>
            <div style={{padding:"20px"}}>
              <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16}}>
                <Avatar name={detail.name} size={52} gi={detail.gi||0}/>
                <div>
                  <h3 style={{margin:"0 0 3px",fontSize:17,fontWeight:600,color:T.text}}>{detail.name}</h3>
                  <div style={{color:T.text3,fontSize:12,display:"flex",gap:10}}>
                    <span style={{display:"flex",alignItems:"center",gap:3}}>
                      <Icon d={IC.mapPin} size={10} color={T.text3}/>{detail.city}
                    </span>
                    <span style={{display:"flex",alignItems:"center",gap:3}}>
                      <Icon d={IC.phone} size={10} color={T.text3}/>{detail.phone}
                    </span>
                  </div>
                  <div style={{marginTop:6}}><StatusBadge status={detail.status}/></div>
                </div>
              </div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
                {(detail.professions||[]).map(pid=>{
                  const p = profs.find(x=>x.id===pid);
                  return p ? <Badge key={pid} color={p.color}><ProfIcon iconKey={p.icon} size={10} color={p.color}/>{p.name}</Badge> : null;
                })}
              </div>
              {detail.bio&&(
                <div style={{background:T.bg2,borderRadius:8,padding:"12px 14px",marginBottom:16,border:`1px solid ${T.border}`}}>
                  <p style={{margin:0,color:T.text2,fontSize:13,lineHeight:1.6}}>{detail.bio}</p>
                </div>
              )}
              <div style={{display:"flex",gap:8}}>
                <Btn full variant="success" size="lg" onClick={()=>{onApprove(detail.id);setDetail(null);}}>
                  <Icon d={IC.check} size={14} color={T.success}/>Approuver
                </Btn>
                <Btn full variant="danger" size="lg" onClick={()=>{onReject(detail.id);setDetail(null);}}>
                  <Icon d={IC.x} size={14} color={T.danger}/>Rejeter
                </Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SECTION: WORKERS ─────────────────────────────────────────────────────────
function WorkerForm({ init, profs, cities, onSave, onCancel }) {
  const [f, setF] = useState(init ? {...init, price_level: init.price_level||0} : { name:"", phone:"", city:"", professions:[], bio:"", available:true, price_level:0 });
  const [err, setErr] = useState("");
  const tog = pid => setF(p=>({...p,professions:p.professions.includes(pid)?p.professions.filter(x=>x!==pid):[...p.professions,pid]}));
  const sub = () => {
    if(!f.name.trim()||!f.phone.trim()||!f.city||!f.professions.length){
      setErr("Nom, téléphone, ville et au moins un métier sont requis.");return;
    }
    onSave(f);
  };

  return (
    <div>
      <button onClick={onCancel}
        style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",
          color:T.text3,cursor:"pointer",fontSize:13,marginBottom:16,padding:0,fontFamily:"inherit"}}>
        <Icon d={IC.arrowLeft} size={14} color={T.text3}/>Retour
      </button>
      <Card style={{padding:"22px"}}>
        <div style={{fontWeight:600,fontSize:15,color:T.text,marginBottom:18}}>
          {init?.id?"Modifier l'artisan":"Ajouter un artisan"}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Input label="Nom complet *" placeholder="Youssef El Fassi"
              value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))}
              leftIcon={IC.user}/>
            <Input label="Téléphone *" placeholder="0661234567" type="tel"
              value={f.phone} onChange={e=>setF(p=>({...p,phone:e.target.value}))}
              leftIcon={IC.phone}/>
          </div>
          <Select label="Ville *" value={f.city} onChange={e=>setF(p=>({...p,city:e.target.value}))}>
            <option value="">Sélectionner une ville...</option>
            {cities.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
          </Select>
          <div>
            <label style={{fontSize:11,fontWeight:500,color:T.text3,display:"block",marginBottom:8}}>Métiers *</label>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
              {profs.map(p=>{
                const sel = f.professions.includes(p.id);
                return (
                  <button key={p.id} onClick={()=>tog(p.id)}
                    style={{padding:"10px 6px",borderRadius:8,textAlign:"center",cursor:"pointer",
                      fontFamily:"inherit",transition:"all .1s",
                      border:`1px solid ${sel?p.color:T.border}`,
                      background:sel?`${p.color}14`:T.bg2}}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:5}}>
                      <div style={{width:28,height:28,borderRadius:7,
                        background:sel?p.bg:T.bg3,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <ProfIcon iconKey={p.icon} size={13} color={sel?p.color:T.text3}/>
                      </div>
                    </div>
                    <div style={{fontSize:9,fontWeight:500,color:sel?p.color:T.text3}}>{p.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontSize:11,fontWeight:500,color:T.text3}}>Bio / Description</label>
            <textarea value={f.bio} onChange={e=>setF(p=>({...p,bio:e.target.value}))}
              placeholder="Présentation, années d'expérience, spécialités..." rows={3}
              style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:7,
                padding:"9px 12px",color:T.text,fontSize:13,resize:"vertical",
                fontFamily:"inherit",outline:"none",lineHeight:1.5}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
            background:T.bg2,borderRadius:8,padding:"12px 14px",border:`1px solid ${T.border}`}}>
            <div>
              <div style={{fontWeight:500,fontSize:13,color:T.text}}>Disponible</div>
              <div style={{fontSize:11,color:T.text3,marginTop:1}}>Visible dans les recherches</div>
            </div>
            <button onClick={()=>setF(p=>({...p,available:!p.available}))}
              style={{width:44,height:24,borderRadius:12,
                background:f.available?T.success:T.bg3,border:"none",
                cursor:"pointer",position:"relative",transition:"background .25s",outline:"none"}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",
                position:"absolute",top:3,left:f.available?"calc(100% - 21px)":"3px",
                transition:"left .25s"}}/>
            </button>
          </div>
          {/* Password Reset */}
          {init?.id&&init?.email&&(
            <div style={{background:T.bg2,borderRadius:8,padding:"12px 14px",border:`1px solid ${T.border}`}}>
              <div style={{fontWeight:500,fontSize:13,color:T.text,marginBottom:4}}>Réinitialisation du mot de passe</div>
              <div style={{fontSize:11,color:T.text3,marginBottom:10}}>Envoie un lien de réinitialisation à {init.email}</div>
              <button onClick={async()=>{
                const { error } = await supabase.auth.resetPasswordForEmail(init.email, {
                  redirectTo: "https://aloaji.ma"
                });
                if(error) alert("Erreur: "+error.message);
                else alert("Email de réinitialisation envoyé à "+init.email);
              }} style={{padding:"7px 14px",borderRadius:7,border:`1px solid ${T.border}`,
                background:T.bg3,color:T.text2,fontSize:12,fontWeight:600,cursor:"pointer",
                fontFamily:"inherit"}}>
                Envoyer lien de réinitialisation
              </button>
            </div>
          )}
          {/* Price Level */}
          <div style={{background:T.bg2,borderRadius:8,padding:"12px 14px",border:`1px solid ${T.border}`}}>
            <div style={{fontWeight:500,fontSize:13,color:T.text,marginBottom:10}}>Niveau de prix</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[{id:0,label:"Non défini",color:T.text3},...PRICE_LEVELS].map(pl=>(
                <button key={pl.id}
                  onClick={()=>setF(p=>({...p,price_level:pl.id}))}
                  style={{padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,
                    cursor:"pointer",fontFamily:"inherit",
                    border:`1.5px solid ${(f.price_level||0)===pl.id?pl.color||T.border2:T.border}`,
                    background:(f.price_level||0)===pl.id?`${pl.color||T.primary}20`:T.bg3,
                    color:(f.price_level||0)===pl.id?pl.color||T.primary:T.text3}}>
                  {pl.label}
                </button>
              ))}
            </div>
          </div>
          {err&&<div style={{background:T.dangerLight,border:`1px solid ${T.danger}28`,
            borderRadius:7,padding:"8px 12px",color:T.danger,fontSize:12}}>{err}</div>}
          <div style={{display:"flex",gap:8}}>
            <Btn full size="lg" onClick={sub}>
              <Icon d={IC.check} size={14} color="#09090b"/>
              {init?.id?"Sauvegarder":"Ajouter l'artisan"}
            </Btn>
            <Btn variant="outline" size="lg" onClick={onCancel}>Annuler</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Workers({ workers, setWorkers, profs, cities, onRefresh }) {
  const [view,     setView]   = useState("list");
  const [target,   setTarget] = useState(null);
  const [search,   setSearch] = useState("");
  const [filt,     setFilt]   = useState("all");
  const [detail,   setDetail] = useState(null);

  const list = workers.filter(w=>{
    const ms = w.name.toLowerCase().includes(search.toLowerCase())
      || w.city.toLowerCase().includes(search.toLowerCase())
      || w.phone?.includes(search);
    const mf = filt==="all"
      ||(filt==="avail"&&w.available&&w.status==="approved")
      ||(filt==="unavail"&&!w.available&&w.status==="approved")
      ||(filt==="rejected"&&w.status==="rejected");
    return ms&&mf;
  });

  const save = async f => {
    // Find city_id from name
    const cityObj = cities.find(c=>c.name===f.city);
    const city_id = cityObj?.id || null;

    try {
      if(target?.id) {
        // Update worker
        await supabase.from("workers").update({name:f.name,phone:f.phone,city_id,bio:f.bio,available:f.available,price_level:f.price_level||null}).eq("id",target.id);
        // Sync professions: delete all, re-insert
        await supabase.from("worker_professions").delete().eq("worker_id",target.id);
        if(f.professions.length) {
          await supabase.from("worker_professions").insert(f.professions.map(pid=>({worker_id:target.id,profession_id:pid})));
        }
        setWorkers(ws=>ws.map(w=>w.id===target.id?{...w,...f}:w));
      } else {
        // Insert new worker
        const { data: newW, error } = await supabase
          .from("workers")
          .insert({name:f.name,phone:f.phone,city_id,bio:f.bio,available:f.available,status:"approved"})
          .select().single();
        if(error) throw error;
        if(f.professions.length) {
          await supabase.from("worker_professions").insert(f.professions.map(pid=>({worker_id:newW.id,profession_id:pid})));
        }
        setWorkers(ws=>[...ws,{...newW,...f,gi:Math.floor(Math.random()*6),reviews:[]}]);
      }
    } catch(e) { alert("Erreur: "+e.message); return; }
    setView("list"); setTarget(null);
  };

  if(view==="form") return <WorkerForm init={target} profs={profs} cities={cities} onSave={save} onCancel={()=>{setView("list");setTarget(null);}}/>;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:600,color:T.text}}>Artisans</h2>
          <p style={{color:T.text3,margin:0,fontSize:13}}>{workers.length} artisans inscrits</p>
        </div>
        <Btn size="sm" onClick={()=>{setTarget(null);setView("form");}}>
          <Icon d={IC.plus} size={13} color="#09090b"/>Ajouter
        </Btn>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:180}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",display:"flex",pointerEvents:"none"}}>
            <Icon d={IC.search} size={13} color={T.text3}/>
          </span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Nom, ville ou téléphone..."
            style={{width:"100%",boxSizing:"border-box",background:T.bg2,
              border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 8px 8px 30px",
              color:T.text,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
        </div>
        {[["all","Tous"],["avail","Disponibles"],["unavail","Indisponibles"],["rejected","Rejetés"]].map(([val,lbl])=>(
          <button key={val} onClick={()=>setFilt(val)}
            style={{padding:"7px 13px",borderRadius:7,cursor:"pointer",fontFamily:"inherit",
              fontSize:12,fontWeight:filt===val?500:400,transition:"all .1s",
              border:`1px solid ${filt===val?T.border2:T.border}`,
              background:filt===val?T.bg2:"transparent",
              color:filt===val?T.text:T.text3}}>
            {lbl}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {list.length===0&&(
          <Card style={{padding:"40px",textAlign:"center"}}>
            <p style={{color:T.text3,fontSize:13,margin:0}}>Aucun artisan trouvé</p>
          </Card>
        )}
        {list.map(w=>{
          const ps = (w.professionData||w.professions||[]).map(p=>typeof p==="object"?p:profs.find(x=>x.id===p)).filter(Boolean);
          const rating = avg(w.reviews||[]);
          return (
            <Card key={w.id} style={{padding:"14px 16px"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <Avatar name={w.name} size={42} gi={w.gi||0}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontWeight:500,fontSize:14,color:T.text}}>{w.name}</span>
                    <StatusBadge status={w.status}/>
                    <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 7px",
                      borderRadius:20,background:w.available?T.successLight:T.bg2,
                      border:`1px solid ${w.available?T.success+"30":T.border}`,
                      fontSize:10,color:w.available?T.success:T.text3}}>
                      <div style={{width:4,height:4,borderRadius:"50%",background:w.available?T.success:T.text3}}/>
                      {w.available?"Dispo":"Indispo"}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:10,color:T.text3,fontSize:12}}>
                    <span style={{display:"flex",alignItems:"center",gap:3}}>
                      <Icon d={IC.mapPin} size={10} color={T.text3}/>{w.city}
                    </span>
                    <span style={{display:"flex",alignItems:"center",gap:3}}>
                      <Icon d={IC.phone} size={10} color={T.text3}/>{w.phone}
                    </span>
                    {w.email&&<span style={{display:"flex",alignItems:"center",gap:3}}>
                      <Icon d={IC.user} size={10} color={T.text3}/>{w.email}
                    </span>}
                    {rating&&<span style={{display:"flex",alignItems:"center",gap:3}}>
                      <Icon d={IC.star} size={10} color={T.accent} style={{fill:T.accent}}/>{rating}
                    </span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",maxWidth:220}}>
                  {ps.slice(0,3).map(p=>(
                    <Badge key={p.id||p} color={p.color||T.text3} style={{fontSize:10}}>
                      <ProfIcon iconKey={p.icon||"wrench"} size={9} color={p.color||T.text3}/>
                      {p.name||p}
                    </Badge>
                  ))}
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <Btn variant="outline" size="sm" onClick={()=>{setTarget(w);setView("form");}}>
                    <Icon d={IC.edit} size={12} color={T.text2}/>Modifier
                  </Btn>
                  <Btn variant="danger" size="sm" onClick={async()=>{
                    if(!confirm("Supprimer cet artisan ?")) return;
                    await supabase.from("workers").delete().eq("id",w.id);
                    setWorkers(ws=>ws.filter(x=>x.id!==w.id));
                  }}>
                    <Icon d={IC.trash} size={12} color={T.danger}/>
                  </Btn>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── SECTION: PROFESSIONS ────────────────────────────────────────────────────
function Professions({ profs, setProfs, workers }) {
  const [f,   setF]   = useState({ name:"", icon:"wrench", color:"#0284C7", bg:"#E0F2FE" });
  const [eid, setEid] = useState(null);

  const selectedColor = COLOR_OPTIONS.find(c=>c.hex===f.color) || COLOR_OPTIONS[0];

  const [saving, setSaving] = useState(false);

  const sub = async () => {
    if(!f.name.trim()) return;
    setSaving(true);
    try {
      if(eid) {
        await supabase.from("professions").update({name:f.name,icon:f.icon,color:f.color,bg:f.bg}).eq("id",eid);
        setProfs(ps=>ps.map(p=>p.id===eid?{...p,...f}:p));
      } else {
        const { data, error } = await supabase.from("professions").insert({name:f.name,icon:f.icon,color:f.color,bg:f.bg}).select().single();
        if(error) throw error;
        setProfs(ps=>[...ps,{...data,...f,bg:f.bg}]);
      }
      setF({name:"",icon:"wrench",color:"#0284C7",bg:"#E0F2FE"});
      setEid(null);
    } catch(e) { alert("Erreur: "+e.message); }
    setSaving(false);
  };

  const deletePro = async id => {
    if(!confirm("Supprimer ce métier ?")) return;
    await supabase.from("professions").delete().eq("id",id);
    setProfs(ps=>ps.filter(x=>x.id!==id));
  };

  const startEdit = p => { setEid(p.id); setF({name:p.name,icon:p.icon,color:p.color,bg:p.bg||"#E0F2FE"}); };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:600,color:T.text}}>Métiers</h2>
        <p style={{color:T.text3,margin:0,fontSize:13}}>{profs.length} métiers configurés · Ces métiers apparaissent dans l'app et dans les profils artisans</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:14,alignItems:"start"}}>
        {/* Form */}
        <Card style={{padding:"20px"}}>
          <div style={{fontWeight:600,fontSize:14,color:T.text,marginBottom:16}}>
            {eid?"Modifier un métier":"Nouveau métier"}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <Input label="Nom du métier *" placeholder="Ex: Plombier"
              value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))}/>

            {/* Icon picker */}
            <div>
              <label style={{fontSize:11,fontWeight:500,color:T.text3,display:"block",marginBottom:8}}>Icône</label>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5}}>
                {ICON_OPTIONS.map(opt=>{
                  const sel = f.icon===opt.key;
                  return (
                    <button key={opt.key} onClick={()=>setF(p=>({...p,icon:opt.key}))}
                      title={opt.label}
                      style={{padding:"8px 4px",borderRadius:7,cursor:"pointer",fontFamily:"inherit",
                        textAlign:"center",transition:"all .1s",
                        border:`1px solid ${sel?f.color:T.border}`,
                        background:sel?`${f.color}14`:T.bg2}}>
                      <div style={{display:"flex",justifyContent:"center",marginBottom:3}}>
                        <Icon d={IC[opt.key]||IC.wrench} size={16} color={sel?f.color:T.text3}/>
                      </div>
                      <div style={{fontSize:8,color:sel?f.color:T.text3,lineHeight:1.2}}>{opt.label.split("/")[0].trim()}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color picker */}
            <div>
              <label style={{fontSize:11,fontWeight:500,color:T.text3,display:"block",marginBottom:8}}>Couleur</label>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {COLOR_OPTIONS.map(c=>(
                  <button key={c.hex} onClick={()=>setF(p=>({...p,color:c.hex,bg:c.bg}))}
                    title={c.name}
                    style={{width:28,height:28,borderRadius:"50%",background:c.hex,border:"none",
                      cursor:"pointer",outline:f.color===c.hex?`3px solid ${c.hex}`:"3px solid transparent",
                      outlineOffset:2,transition:"outline .1s"}}/>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div style={{background:T.bg2,borderRadius:8,padding:"12px 14px",border:`1px solid ${T.border}`,
              display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:40,height:40,borderRadius:10,
                background:f.bg||`${f.color}18`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon d={IC[f.icon]||IC.wrench} size={18} color={f.color}/>
              </div>
              <div>
                <div style={{fontWeight:600,fontSize:14,color:f.color}}>{f.name||"Aperçu"}</div>
                <div style={{fontSize:11,color:T.text3,marginTop:1}}>Icône + couleur</div>
              </div>
            </div>

            <div style={{display:"flex",gap:8}}>
              <Btn full onClick={sub}>
                <Icon d={IC.check} size={13} color="#09090b"/>
                {eid?"Sauvegarder":"Ajouter"}
              </Btn>
              {eid&&<Btn variant="ghost" onClick={()=>{setEid(null);setF({name:"",icon:"wrench",color:"#0284C7",bg:"#E0F2FE"});}}>Annuler</Btn>}
            </div>
          </div>
        </Card>

        {/* List */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {profs.map(p=>{
            const n = workers.filter(w=>(w.professions||[]).includes(p.id)).length;
            return (
              <Card key={p.id} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:11,
                  background:p.bg||`${p.color}18`,
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon d={IC[p.icon]||IC.wrench} size={20} color={p.color}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14,color:T.text}}>{p.name}</div>
                  <div style={{fontSize:12,color:T.text3,marginTop:2}}>
                    {n} artisan{n!==1?"s":""} · <span style={{color:p.color}}>{p.color}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <Btn variant="outline" size="sm" onClick={()=>startEdit(p)}>
                    <Icon d={IC.edit} size={12} color={T.text2}/>Modifier
                  </Btn>
                  <Btn variant="danger" size="sm" onClick={()=>deletePro(p.id)}>
                    <Icon d={IC.trash} size={12} color={T.danger}/>
                  </Btn>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: CITIES ─────────────────────────────────────────────────────────
function Cities({ cities, setCities, workers }) {
  const [f,   setF]   = useState({ name:"", lat:"", lng:"" });
  const [eid, setEid] = useState(null);

  const [saving, setSaving] = useState(false);

  const sub = async () => {
    if(!f.name.trim()||!f.lat||!f.lng) return;
    setSaving(true);
    const lat = parseFloat(f.lat), lng = parseFloat(f.lng);
    try {
      if(eid) {
        await supabase.from("cities").update({name:f.name,lat,lng}).eq("id",eid);
        setCities(cs=>cs.map(c=>c.id===eid?{...c,name:f.name,lat,lng}:c));
      } else {
        const { data, error } = await supabase.from("cities").insert({name:f.name,lat,lng}).select().single();
        if(error) throw error;
        setCities(cs=>[...cs,data]);
      }
      setF({name:"",lat:"",lng:""}); setEid(null);
    } catch(e) { alert("Erreur: "+e.message); }
    setSaving(false);
  };

  const deleteCity = async id => {
    if(!confirm("Supprimer cette ville ?")) return;
    await supabase.from("cities").delete().eq("id",id);
    setCities(cs=>cs.filter(x=>x.id!==id));
  };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:600,color:T.text}}>Villes</h2>
        <p style={{color:T.text3,margin:0,fontSize:13}}>{cities.length} villes · Ces villes apparaissent dans les filtres et sur la carte</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:14,alignItems:"start"}}>
        {/* Form */}
        <Card style={{padding:"20px"}}>
          <div style={{fontWeight:600,fontSize:14,color:T.text,marginBottom:16}}>
            {eid?"Modifier une ville":"Nouvelle ville"}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <Input label="Nom de la ville *" placeholder="Casablanca"
              value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))}
              leftIcon={IC.mapPin}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <Input label="Latitude *" placeholder="33.5731" type="number"
                value={f.lat} onChange={e=>setF(p=>({...p,lat:e.target.value}))}/>
              <Input label="Longitude *" placeholder="-7.5898" type="number"
                value={f.lng} onChange={e=>setF(p=>({...p,lng:e.target.value}))}/>
            </div>
            <div style={{background:T.infoLight,border:`1px solid ${T.info}25`,
              borderRadius:7,padding:"9px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
              <Icon d={IC.eye} size={13} color={T.info} style={{marginTop:1,flexShrink:0}}/>
              <div style={{fontSize:11,color:T.info,lineHeight:1.5}}>
                Astuce : Sur Google Maps, clic droit sur un lieu → les coordonnées s'affichent.
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn full onClick={sub}>
                <Icon d={IC.check} size={13} color="#09090b"/>
                {eid?"Sauvegarder":"Ajouter"}
              </Btn>
              {eid&&<Btn variant="ghost" onClick={()=>{setEid(null);setF({name:"",lat:"",lng:""});}}>Annuler</Btn>}
            </div>
          </div>
        </Card>

        {/* List */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {cities.map(c=>{
            const n = workers.filter(w=>w.city===c.name).length;
            return (
              <Card key={c.id} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:11,background:T.infoLight,
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon d={IC.mapPin} size={20} color={T.info}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14,color:T.text}}>{c.name}</div>
                  <div style={{fontSize:11,color:T.text3,marginTop:2}}>
                    {typeof c.lat==="number"?c.lat.toFixed(4):c.lat}, {typeof c.lng==="number"?c.lng.toFixed(4):c.lng}
                    {" · "}
                    <span style={{color:n>0?T.success:T.text3}}>{n} artisan{n!==1?"s":""}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <Btn variant="outline" size="sm" onClick={()=>{setEid(c.id);setF({name:c.name,lat:String(c.lat),lng:String(c.lng)});}}>
                    <Icon d={IC.edit} size={12} color={T.text2}/>Modifier
                  </Btn>
                  <Btn variant="danger" size="sm" onClick={()=>deleteCity(c.id)}>
                    <Icon d={IC.trash} size={12} color={T.danger}/>
                  </Btn>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: REVIEWS ─────────────────────────────────────────────────────────
function Reviews({ workers }) {
  const [search, setSearch] = useState("");
  const all = workers.flatMap(w=>(w.reviews||[]).map(r=>({...r,workerName:w.name,workerId:w.id})));
  const filtered = all.filter(r=>!search||r.author?.toLowerCase().includes(search.toLowerCase())||r.workerName?.toLowerCase().includes(search.toLowerCase())||r.comment?.toLowerCase().includes(search.toLowerCase()));
  const avgAll = all.length ? (all.reduce((a,r)=>a+r.rating,0)/all.length).toFixed(1) : null;

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:600,color:T.text}}>Avis clients</h2>
        <p style={{color:T.text3,margin:0,fontSize:13}}>
          {all.length} avis{avgAll?` · Moyenne ${avgAll}★`:""}
        </p>
      </div>

      {all.length===0?(
        <Card style={{padding:"60px 40px",textAlign:"center"}}>
          <div style={{width:48,height:48,borderRadius:12,background:T.bg2,
            display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <Icon d={IC.messageCircle} size={22} color={T.text3}/>
          </div>
          <p style={{color:T.text2,fontSize:14,fontWeight:500,margin:0}}>Aucun avis pour l'instant</p>
        </Card>
      ):(
        <>
          <div style={{position:"relative",marginBottom:14,maxWidth:320}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",display:"flex",pointerEvents:"none"}}>
              <Icon d={IC.search} size={13} color={T.text3}/>
            </span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Rechercher un avis..."
              style={{width:"100%",boxSizing:"border-box",background:T.bg2,
                border:`1px solid ${T.border}`,borderRadius:7,padding:"8px 8px 8px 30px",
                color:T.text,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filtered.map((r,i)=>(
              <Card key={i} style={{padding:"14px 16px"}}>
                <div style={{display:"flex",gap:10,marginBottom:r.comment?10:0}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:T.bg2,border:`1px solid ${T.border2}`,
                    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                    fontSize:13,fontWeight:600,color:T.text2}}>
                    {(r.author||"?")[0].toUpperCase()}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div>
                        <span style={{fontWeight:600,fontSize:13,color:T.text}}>
                          {(r.author||"Anonyme").split(" ")[0]}
                        </span>
                        <span style={{color:T.text3,fontSize:12,marginLeft:6}}>→ {r.workerName}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                        <div style={{display:"flex",gap:2}}>
                          {[1,2,3,4,5].map(s=>(
                            <Icon key={s} d={IC.star} size={11}
                              color={s<=r.rating?T.accent:T.border2}
                              style={{fill:s<=r.rating?T.accent:"none"}}/>
                          ))}
                        </div>
                        {r.date&&<span style={{color:T.text3,fontSize:10}}>{r.date?.split("T")[0]||r.date}</span>}
                      </div>
                    </div>
                  </div>
                </div>
                {r.comment&&<p style={{margin:"0 0 0 44px",color:T.text2,fontSize:13,lineHeight:1.5}}>{r.comment}</p>}
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function Membres({ consumers, onRefresh }) {
  const [search, setSearch] = useState("");
  const [resetEmail, setResetEmail] = useState(null);
  const [resetting, setResetting] = useState(false);

  const list = (consumers||[]).filter(c =>
    (c.name||"").toLowerCase().includes(search.toLowerCase()) ||
    (c.email||"").toLowerCase().includes(search.toLowerCase())
  );

  const sendReset = async (email) => {
    setResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://aloaji.ma"
    });
    setResetting(false);
    setResetEmail(null);
    if(error) alert("Erreur: "+error.message);
    else alert("Email de réinitialisation envoyé à "+email);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:T.text}}>Membres</h2>
          <p style={{margin:0,fontSize:13,color:T.text3}}>{list.length} membre{list.length!==1?"s":""} inscrit{list.length!==1?"s":""}</p>
        </div>
        <button onClick={onRefresh} style={{padding:"7px 14px",borderRadius:7,border:`1px solid ${T.border}`,
          background:T.bg2,color:T.text2,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
          Actualiser
        </button>
      </div>

      {/* Search */}
      <div style={{position:"relative",marginBottom:16}}>
        <Icon d={IC.search} size={14} color={T.text3} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email..."
          style={{width:"100%",boxSizing:"border-box",paddingLeft:36,paddingRight:14,
            paddingTop:10,paddingBottom:10,borderRadius:8,border:`1px solid ${T.border}`,
            background:T.bg2,color:T.text,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
      </div>

      {/* List */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {list.length===0&&(
          <div style={{textAlign:"center",padding:"40px 20px",color:T.text3,fontSize:13}}>
            {search ? "Aucun membre trouvé" : "Aucun membre inscrit"}
          </div>
        )}
        {list.map(c=>(
          <div key={c.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,
            padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
            {/* Avatar */}
            <div style={{width:40,height:40,borderRadius:"50%",flexShrink:0,
              background:`linear-gradient(135deg,#6366F1,#8B5CF6)`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:15,fontWeight:700,color:"#fff"}}>
              {(c.name||c.email||"?")[0].toUpperCase()}
            </div>
            {/* Info */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:14,color:T.text,marginBottom:2}}>
                {c.name||<span style={{color:T.text3,fontStyle:"italic"}}>Sans nom</span>}
              </div>
              <div style={{fontSize:12,color:T.text3,display:"flex",alignItems:"center",gap:4}}>
                <Icon d={IC.user} size={10} color={T.text3}/>{c.email||"—"}
              </div>
              {c.created_at&&(
                <div style={{fontSize:11,color:T.text3,marginTop:2}}>
                  Inscrit le {new Date(c.created_at).toLocaleDateString("fr-FR")}
                </div>
              )}
            </div>
            {/* Actions */}
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              {resetEmail===c.email ? (
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:12,color:T.text3}}>Confirmer ?</span>
                  <button onClick={()=>sendReset(c.email)} disabled={resetting}
                    style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${T.success}`,
                      background:T.successLight,color:T.success,fontSize:11,
                      fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                    {resetting?"...":"Oui"}
                  </button>
                  <button onClick={()=>setResetEmail(null)}
                    style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${T.border}`,
                      background:"transparent",color:T.text3,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                    Non
                  </button>
                </div>
              ) : (
                <button onClick={()=>setResetEmail(c.email)}
                  style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${T.border}`,
                    background:T.bg2,color:T.text2,fontSize:12,fontWeight:500,
                    cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
                  <Icon d={IC.shield} size={11} color={T.text3}/>
                  Réinitialiser MDP
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");
  const [loading,setLoading] = useState(false);

  const go = async () => {
    if(!email.trim()||!pass.trim()){setErr("Renseignez votre email et mot de passe.");return;}
    // Check allowlist first — before even hitting Supabase
    if(!ADMIN_EMAILS.includes(email.trim().toLowerCase())){
      setErr("Accès refusé.");
      return;
    }
    setLoading(true);setErr("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pass });
      if(error) throw error;
      onLogin({ name: data.user?.email?.split("@")[0] || "Admin", email: email.trim() });
    } catch(e) {
      setErr("Email ou mot de passe incorrect.");
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",
      justifyContent:"center",padding:20,fontFamily:"'Geist','DM Sans','Segoe UI',system-ui,sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap');`}</style>
      <div style={{width:"100%",maxWidth:340}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:52,height:52,borderRadius:14,background:T.bg2,border:`1px solid ${T.border2}`,
            display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <Icon d={IC.wrench} size={22} color={T.text2}/>
          </div>
          <h1 style={{margin:"0 0 5px",fontSize:20,fontWeight:600,color:T.text,letterSpacing:"-0.3px"}}>
            AloAji Admin
          </h1>
          <p style={{color:T.text3,margin:0,fontSize:13}}>Panneau d'administration</p>
        </div>
        <Card style={{padding:"24px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <Input label="Email" placeholder="admin@aloaji.ma" type="email"
              value={email} onChange={e=>setEmail(e.target.value)}
              leftIcon={IC.user}/>
            <Input label="Mot de passe" placeholder="••••••••" type="password"
              value={pass} onChange={e=>setPass(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&go()}
              leftIcon={IC.shield}/>
            {err&&<div style={{background:T.dangerLight,border:`1px solid ${T.danger}28`,
              borderRadius:7,padding:"8px 12px",color:T.danger,fontSize:12}}>{err}</div>}
            <Btn full size="lg" onClick={go} disabled={loading}>
              {loading
                ? <><Icon d={IC.loader} size={14} color="#09090b" style={{animation:"spin .8s linear infinite"}}/>Connexion…</>
                : "Se connecter"
              }
            </Btn>
            <div style={{textAlign:"center",padding:"6px"}}>
              <span style={{fontSize:11,color:T.text3}}>Connectez-vous avec votre compte Supabase admin</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

// ─── BANNER MANAGER ──────────────────────────────────────────────────────────
function BannerManager({ T }) {
  const [banner, setBanner]     = useState(null);   // {url, link, active}
  const [loading, setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [link, setLink]         = useState("");
  const [active, setActive]     = useState(true);
  const fileRef = useRef();

  useEffect(() => { loadBanner(); }, []);

  const loadBanner = async () => {
    setLoading(true);
    const { data } = await supabase.from("banner").select("*").maybeSingle();
    if (data) { setBanner(data); setLink(data.link||""); setActive(data.active!==false); }
    setLoading(false);
  };

  const uploadImage = async (file) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `banner/banner.${ext}`;
      await supabase.storage.from("worker-photos").upload(path, file, { upsert: true });
      const { data: { publicUrl } } = supabase.storage.from("worker-photos").getPublicUrl(path);
      const url = publicUrl + "?t=" + Date.now();
      const row = { url, link, active };
      if (banner?.id) {
        await supabase.from("banner").update(row).eq("id", banner.id);
      } else {
        await supabase.from("banner").insert(row);
      }
      await loadBanner();
    } catch(e) { alert("Erreur: " + e.message); }
    setUploading(false);
  };

  const saveMeta = async () => {
    if (!banner?.id) return;
    await supabase.from("banner").update({ link, active }).eq("id", banner.id);
    await loadBanner();
  };

  if (loading) return <div style={{padding:40,textAlign:"center",color:T.text3}}>Chargement...</div>;

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:24}}>
      <h2 style={{margin:"0 0 24px",fontSize:20,fontWeight:800,color:T.text}}>Gestion de la Bannière</h2>

      {/* Preview */}
      <div style={{borderRadius:16,overflow:"hidden",border:`1px solid ${T.border}`,marginBottom:24,background:T.bg2,minHeight:180,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",cursor:"pointer"}}
        onClick={()=>fileRef.current?.click()}>
        {banner?.url
          ? <img src={banner.url} alt="Bannière" style={{width:"100%",maxHeight:240,objectFit:"cover",display:"block"}}/>
          : <div style={{textAlign:"center",padding:40,color:T.text3}}>
              <div style={{fontSize:40,marginBottom:12}}>🖼️</div>
              <div style={{fontWeight:600,fontSize:15,color:T.text2}}>Cliquez pour uploader une image</div>
              <div style={{fontSize:12,marginTop:6}}>Recommandé: 1200×300px, JPG ou PNG</div>
            </div>}
        <div style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,0.6)",borderRadius:8,
          padding:"6px 14px",color:"#fff",fontSize:12,fontWeight:600,backdropFilter:"blur(4px)"}}>
          {uploading ? "Upload en cours..." : "Changer l'image"}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
        onChange={e=>{ const f=e.target.files[0]; if(f) uploadImage(f); e.target.value=""; }}/>

      {/* Settings */}
      <div style={{background:T.card,borderRadius:14,border:`1px solid ${T.border}`,padding:24,display:"flex",flexDirection:"column",gap:16}}>
        <div>
          <label style={{fontSize:12,fontWeight:600,color:T.text3,display:"block",marginBottom:6}}>LIEN (optionnel)</label>
          <input value={link} onChange={e=>setLink(e.target.value)} placeholder="https://..."
            style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",borderRadius:8,
              border:`1px solid ${T.border}`,background:T.bg2,color:T.text,fontSize:13,fontFamily:"inherit",outline:"none"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:600,fontSize:14,color:T.text}}>Bannière active</div>
            <div style={{fontSize:12,color:T.text3,marginTop:2}}>Affichée sur la page d'accueil</div>
          </div>
          <button onClick={()=>setActive(v=>!v)}
            style={{width:48,height:26,borderRadius:13,background:active?"#16A34A":"#D1D5DB",
              border:"none",cursor:"pointer",position:"relative",transition:"background .2s"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",
              top:3,left:active?"calc(100% - 23px)":"3px",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
          </button>
        </div>
        <button onClick={saveMeta}
          style={{padding:"11px",borderRadius:10,border:"none",background:"#16A34A",color:"#fff",
            fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
          Enregistrer les paramètres
        </button>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section,  setSection]  = useState("dashboard");
  const [workers,   setWorkers]   = useState([]);
  const [pending,   setPending]   = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [profs,     setProfs]     = useState([]);
  const [cities,    setCities]    = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [toast,     setToast]     = useState("");
  const [dbErrors,  setDbErrors]  = useState([]);
  const [admin,     setAdmin]     = useState(null);

  // Restore session on mount — check if Supabase already has an active session
  useEffect(() => {
    const restore = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if(!session) return; // no session — stay on login screen
      // Session exists — verify still in admins table
      // Verify email is in admin allowlist
      if(!ADMIN_EMAILS.includes(session.user.email.toLowerCase())){
        await supabase.auth.signOut();
        return;
      }
      const adminData = { name: session.user.email.split("@")[0], email: session.user.email };
      setAdmin(adminData);
      setLoggedIn(true);
      loadAll();
    };
    restore();
  }, []); // eslint-disable-line

  const flash = msg => { setToast(msg); setTimeout(()=>setToast(""),2600); };

  // Load data from Supabase when logged in
  const loadAll = async () => {
    setLoading(true);
    const errs = [];
    try {
      const [
        { data: ws,         error: wsErr  },
        { data: ps,         error: psErr  },
        { data: cs,         error: csErr  },
        { data: pending_ws, error: pwErr  },
        { data: cons,       error: conErr },
      ] = await Promise.all([
        supabase.from("workers").select(`*, city:cities(name), worker_professions(profession:professions(*)), reviews(*), portfolio_photos(*)`).in("status",["approved","rejected"]).order("created_at",{ascending:false}),
        supabase.from("professions").select("*").order("name"),
        supabase.from("cities").select("*").order("name"),
        supabase.from("workers").select(`*, city:cities(name), worker_professions(profession:professions(*))`).eq("status","pending").order("created_at",{ascending:false}),
        supabase.from("user_profiles").select("*").order("created_at",{ascending:false}),
      ]);
      if(wsErr)  errs.push("Artisans: "+wsErr.message);
      if(psErr)  errs.push("Métiers: "+psErr.message);
      if(csErr)  errs.push("Villes: "+csErr.message);
      if(pwErr)  errs.push("En attente: "+pwErr.message);
      if(conErr) errs.push("Membres: "+conErr.message);
      if(cons) setConsumers(cons);
      if(ws) setWorkers(ws.map((w,i)=>({
        ...w, gi:i%6,
        city: w.city?.name||"",
        professions: (w.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
        professionData: (w.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
        reviews: (w.reviews||[]).map(r=>({...r,
          author: r.author_name || "Client",
          date: r.created_at?.split("T")[0],
          workType: r.work_type,
        })),
        portfolio: (w.portfolio_photos||[]),
      })));
      if(ps?.length) setProfs(ps.map(p=>({
        ...p,
        // bg not stored in DB — derive from color match or compute
        bg: COLOR_OPTIONS.find(c=>c.hex===p.color)?.bg || "#E0F2FE",
        // icon might be emoji in old DB — keep as-is, app tries IC[icon] and falls back to wrench
      })));
      if(cs?.length) setCities(cs);
      if(pending_ws) setPending(pending_ws.map((w,i)=>({
        ...w, gi:i%6,
        city: w.city?.name||"",
        professions: (w.worker_professions||[]).map(wp=>wp.profession?.id).filter(Boolean),
        professionData: (w.worker_professions||[]).map(wp=>wp.profession).filter(Boolean),
        submittedAt: w.submitted_at||w.created_at,
      })));
    } catch(e) {
      errs.push("Connexion Supabase échouée: "+e.message);
    }
    setDbErrors(errs);
    setLoading(false);
  };

  // Send SMS via direct fetch to Supabase Edge Function

  const approve = async id => {
    const w = pending.find(p=>p.id===id);
    if(!w) return;
    // Update UI immediately
    setPending(p => p.filter(x => x.id !== id));
    setWorkers(ws => [...ws, { ...w, status:"approved", reviews:[], professionData: w.professionData||[] }]);
    flash(`${w.name} approuvé !`);
    // Write to DB
    const { error } = await supabase.from("workers").update({ status:"approved" }).eq("id", id);
    if(error) {
      console.error("Approve failed:", error.message);
      setPending(p => [...p, w]);
      setWorkers(ws => ws.filter(x => x.id !== id));
      flash(`Erreur: ${error.message}`);
      return;
    }
    // Send approval notification — worker sets password via this link
    if(w.email){
      await supabase.auth.resetPasswordForEmail(w.email, {
        redirectTo: "https://aloaji.ma/mon-espace"
      });
    }
  };

  const reject = async id => {
    const w = pending.find(p=>p.id===id);
    if(!w) return;
    // Update UI immediately
    setPending(p => p.filter(x => x.id !== id));
    setWorkers(ws => [...ws, { ...w, status:"rejected" }]);
    flash(`Demande de ${w?.name} rejetée.`);
    // Write to DB
    const { error } = await supabase.from("workers").update({ status:"rejected" }).eq("id", id);
    if(error) {
      console.error("Reject failed:", error.message);
      setPending(p => [...p, w]);
      setWorkers(ws => ws.filter(x => x.id !== id));
      flash(`Erreur: ${error.message}`);
      return;
    }
  };

  if(!loggedIn) return <Login onLogin={(adminRow)=>{ setAdmin(adminRow); setLoggedIn(true); loadAll(); }}/>;

  const NAV = [
    { id:"dashboard",   label:"Dashboard",     icon:IC.barChart },
    { id:"pending",     label:"En attente",    icon:IC.clock,    badge:pending.length },
    { id:"workers",     label:"Artisans",      icon:IC.users,    badge:workers.length },
    { id:"membres",     label:"Membres",       icon:IC.user,     badge:consumers.length },
    { id:"professions", label:"Métiers",       icon:IC.wrench },
    { id:"cities",      label:"Villes",        icon:IC.mapPin },
    { id:"banner",      label:"Bannière",      icon:IC.eye },
    { id:"reviews",     label:"Avis",          icon:IC.messageCircle },
  ];

  return (
    <div style={{display:"flex",minHeight:"100vh",background:T.bg,
      fontFamily:"'Geist','DM Sans','Segoe UI',system-ui,sans-serif",color:T.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap');
        * { box-sizing:border-box; }
        body { margin:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      {/* Sidebar */}
      <aside style={{width:200,background:T.bg,borderRight:`1px solid ${T.border}`,
        display:"flex",flexDirection:"column",position:"fixed",
        top:0,bottom:0,left:0,zIndex:50}}>

        {/* Logo */}
        <div style={{padding:"16px 16px 14px",borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:7,background:T.bg2,
              border:`1px solid ${T.border2}`,display:"flex",alignItems:"center",
              justifyContent:"center"}}>
              <Icon d={IC.wrench} size={13} color={T.text2}/>
            </div>
            <div>
              <div style={{fontWeight:600,fontSize:14,color:T.text}}>AloAji</div>
              <div style={{fontSize:9,color:T.text3,letterSpacing:"0.5px",textTransform:"uppercase"}}>Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{flex:1,padding:"8px"}}>
          {NAV.map(n=>{
            const active = section===n.id;
            return (
              <button key={n.id} onClick={()=>setSection(n.id)}
                style={{width:"100%",display:"flex",alignItems:"center",gap:8,
                  padding:"8px 10px",borderRadius:7,border:"none",cursor:"pointer",
                  background:active?T.bg2:"transparent",
                  color:active?T.text:T.text3,
                  fontSize:13,fontWeight:active?500:400,fontFamily:"inherit",
                  textAlign:"left",marginBottom:2,transition:"all .1s"}}>
                <Icon d={n.icon} size={15} color={active?T.text2:T.text3}/>
                <span style={{flex:1}}>{n.label}</span>
                {n.badge>0&&(
                  <span style={{
                    background:n.id==="pending"?T.warningLight:T.bg3,
                    color:n.id==="pending"?T.warning:T.text3,
                    border:`1px solid ${n.id==="pending"?T.warning+"30":T.border}`,
                    fontSize:10,fontWeight:500,padding:"1px 6px",borderRadius:8}}>
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{padding:"8px",borderTop:`1px solid ${T.border}`}}>
          {pending.length>0&&(
            <div onClick={()=>setSection("pending")}
              style={{background:T.warningLight,border:`1px solid ${T.warning}28`,
                borderRadius:8,padding:"8px 10px",marginBottom:8,cursor:"pointer"}}>
              <div style={{fontSize:11,fontWeight:500,color:T.warning,display:"flex",alignItems:"center",gap:5}}>
                <Icon d={IC.clock} size={12} color={T.warning}/>
                {pending.length} en attente
              </div>
            </div>
          )}
          <button onClick={async ()=>{ await supabase.auth.signOut(); setLoggedIn(false); setAdmin(null); }}
            style={{width:"100%",padding:"7px 10px",borderRadius:7,
              border:`1px solid ${T.border}`,background:"transparent",
              color:T.text3,fontSize:12,cursor:"pointer",fontFamily:"inherit",
              display:"flex",alignItems:"center",gap:7}}>
            <Icon d={IC.logOut} size={13} color={T.text3}/>Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{flex:1,marginLeft:200,padding:"28px 28px 60px",
        maxWidth:"calc(100vw - 200px)",overflowX:"hidden"}}>
        {loading&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"40vh",flexDirection:"column",gap:12}}>
            <Icon d={IC.loader} size={32} color={T.text3} style={{animation:"spin .8s linear infinite"}}/>
            <p style={{color:T.text3,fontSize:13,margin:0}}>Chargement des données...</p>
          </div>
        )}
        {/* DB Error banner */}
        {dbErrors.length>0&&(
          <div style={{background:"rgba(220,38,38,0.08)",border:"1px solid rgba(220,38,38,0.25)",
            borderRadius:8,padding:"12px 16px",marginBottom:20}}>
            <div style={{fontWeight:500,fontSize:13,color:T.danger,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
              <Icon d={IC.x} size={14} color={T.danger}/>
              Erreurs Supabase — données incomplètes
            </div>
            {dbErrors.map((e,i)=>(
              <div key={i} style={{fontSize:11,color:"#f87171",fontFamily:"monospace",marginTop:2}}>• {e}</div>
            ))}
            <div style={{fontSize:11,color:T.text3,marginTop:8,lineHeight:1.5}}>
              Vérifiez : VITE_SUPABASE_URL · VITE_SUPABASE_ANON_KEY · Politiques RLS dans Supabase Dashboard
            </div>
          </div>
        )}

        {!loading&&section==="dashboard"   &&<Dashboard workers={workers} pending={pending} cities={cities} profs={profs} go={setSection}/>}
        {!loading&&section==="pending"     &&<Pending pending={pending} profs={profs} onApprove={approve} onReject={reject} onRefresh={loadAll}/>}
        {!loading&&section==="workers"     &&<Workers workers={workers} setWorkers={setWorkers} profs={profs} cities={cities} onRefresh={loadAll}/>}
        {!loading&&section==="membres"     &&<Membres consumers={consumers} onRefresh={loadAll}/>}
        {!loading&&section==="professions" &&<Professions profs={profs} setProfs={setProfs} workers={workers}/>}
        {!loading&&section==="cities"      &&<Cities cities={cities} setCities={setCities} workers={workers}/>}
        {!loading&&section==="banner"      &&<BannerManager T={T}/>}
        {!loading&&section==="reviews"     &&<Reviews workers={workers}/>}
      </main>

      <Toast msg={toast}/>
    </div>
  );
}