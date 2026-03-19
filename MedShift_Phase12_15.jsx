import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Home, Calendar, Users, User, ArrowLeft, CheckCircle,
  MapPin, Clock, Star, Shield, Zap, Activity, ChevronRight,
  MoreHorizontal, X, AlertTriangle, CreditCard, Wallet,
  TrendingUp, Navigation, Filter, Heart, MessageCircle,
  Share2, Bookmark, BadgeCheck, Briefcase, Award, Signal,
  Wifi, Battery, Radio, Siren, BanknoteIcon, Megaphone,
  Building2, Stethoscope, ScanLine, ThumbsUp, Send,
  BarChart3, Phone, ExternalLink, Sparkles, DollarSign,
  ArrowUpRight, ArrowDownLeft, RefreshCw, Eye, Hash,
  ChevronDown, Search, Timer, Cpu, Plus, Image as ImageIcon
} from "lucide-react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  blue:   "#1A365D",
  teal:   "#0D9488",
  amber:  "#F59E0B",
  pearl:  "#F8FAFC",
  card:   "#FFFFFF",
  green:  "#10B981",
  red:    "#EF4444",
};

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');`;

const F = {
  head: "'Sora', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO DATA — PHASE 13 (MANAGER)
// ═══════════════════════════════════════════════════════════════════════════════
const MANAGER = {
  name:       "Dr. A. Sharma",
  firstName:  "Arjun",
  initials:   "AS",
  hospital:   "Nashik Lifeline Hospital",
  area:       "Panchavati Area, Nashik",
  role:       "Chief Medical Officer",
  verified:   true,
  rating:     4.8,
  totalHires: 94,
};

const MANAGER_SHIFTS = [
  {
    id: "s1",
    title:    "Urgent X-Ray Technician",
    time:     "Today, 2:00 PM – 8:00 PM",
    pay:      "₹600/hr",
    status:   "searching",
    statusLabel: "Searching…",
    color:    C.amber,
    icon:     ScanLine,
    dept:     "Radiology – Emergency",
    duration: "6 hrs",
    totalEst: "₹3,600",
  },
  {
    id: "s2",
    title:    "MRI Specialist (Siemens 1.5T)",
    time:     "Tomorrow, 9:00 AM – 5:00 PM",
    pay:      "₹800/hr",
    status:   "matched",
    statusLabel: "Matched with Vilas Z.",
    matchedWith: "Vilas Z.",
    color:    C.green,
    icon:     Cpu,
    dept:     "Diagnostic Imaging",
    duration: "8 hrs",
    totalEst: "₹6,400",
  },
];

const MANAGER_NOTIFICATIONS = [
  {
    id:      "mn1",
    read:    false,
    icon:    "check",
    color:   C.green,
    bgColor: "#ECFDF5",
    title:   "Shift Accepted",
    body:    "Vilas Z. accepted your urgent MRI shift for tomorrow at 9:00 AM.",
    time:    "2 min ago",
    tag:     "Match",
  },
  {
    id:      "mn2",
    read:    false,
    icon:    "warning",
    color:   C.amber,
    bgColor: "#FFFBEB",
    title:   "Shift Reminder",
    body:    "Your X-Ray technician requirement for today is still unfilled. Boost your post?",
    time:    "45 min ago",
    tag:     "Reminder",
    action:  "Boost Post",
  },
  {
    id:      "mn3",
    read:    true,
    icon:    "invoice",
    color:   C.blue,
    bgColor: C.card,
    title:   "Invoice Generated",
    body:    "Invoice #4092 for last week's temporary staffing has been generated.",
    time:    "Yesterday",
    tag:     "Finance",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO DATA — PHASE 14 (TECHNICIAN)
// ═══════════════════════════════════════════════════════════════════════════════
const TECHNICIAN = {
  name:        "Vilas Z.",
  fullName:    "Vilas Zende",
  initials:    "VZ",
  title:       "Certified MRI / X-Ray Technician",
  subtitle:    "B.Tech IT & Certified MRI/X-Ray Tech",
  location:    "Nashik, Maharashtra",
  rating:      4.9,
  totalShifts: 42,
  available:   true,
};

const WALLET = {
  balance:       "₹12,450",
  balanceNum:    12450,
  lastPayout:    "₹4,800",
  lastPayoutBank:"HDFC Bank",
  lastPayoutDate:"Mar 14, 2026",
  pending:       "₹2,400",
  transactions: [
    { id:"t1", type:"credit", label:"MRI Shift – Nashik Lifeline",  amount:"+₹6,400", date:"Mar 16", color:C.green  },
    { id:"t2", type:"credit", label:"Payment – MRI Shift",           amount:"+₹2,400", date:"Mar 13", color:C.green  },
    { id:"t3", type:"debit",  label:"Payout to HDFC Bank ••4521",   amount:"−₹4,800", date:"Mar 12", color:C.red    },
    { id:"t4", type:"credit", label:"X-Ray Shift – City Care",       amount:"+₹3,600", date:"Mar 10", color:C.green  },
  ],
};

const TECH_SHIFTS = [
  {
    id:       "ts1",
    hospital: "Nashik Lifeline Hospital",
    distance: "3.2 km",
    equipment:"Urgent X-Ray",
    pay:      "₹600/hr",
    time:     "Today, 2:00 PM",
    urgent:   true,
    dept:     "Emergency Radiology",
    duration: "6 hrs",
    totalEst: "₹3,600",
    color:    C.amber,
  },
  {
    id:       "ts2",
    hospital: "City Care Medical Center",
    distance: "5.5 km",
    equipment:"CT Scan",
    pay:      "₹750/hr",
    time:     "Today, 6:00 PM",
    urgent:   false,
    dept:     "Diagnostic Imaging",
    duration: "8 hrs",
    totalEst: "₹6,000",
    color:    C.teal,
  },
];

const TECH_NOTIFICATIONS = [
  {
    id:      "tn1",
    read:    false,
    icon:    "urgent",
    color:   C.red,
    bgColor: "#FEF2F2",
    title:   "🚨 URGENT MATCH",
    body:    "Nashik Lifeline Hospital needs an X-Ray tech 3.2 km away. High demand!",
    time:    "Just now",
    tag:     "Urgent",
    action:  "View Shift",
  },
  {
    id:      "tn2",
    read:    false,
    icon:    "star",
    color:   "#F59E0B",
    bgColor: "#FFFBEB",
    title:   "5-Star Rating Received ⭐",
    body:    "You received a 5-star rating from City Care Medical Center for your shift on Monday.",
    time:    "3 hrs ago",
    tag:     "Rating",
  },
  {
    id:      "tn3",
    read:    true,
    icon:    "payment",
    color:   C.green,
    bgColor: C.card,
    title:   "Payment Received 💰",
    body:    "Payment of ₹2,400 for your MRI shift has been added to your wallet.",
    time:    "Yesterday",
    tag:     "Payment",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO DATA — PHASE 15 (COMMUNITY FEED)
// ═══════════════════════════════════════════════════════════════════════════════
const FEED_POSTS = [
  {
    id:      "p1",
    type:    "post",
    author:  "Dr. A. Sharma",
    initials:"AS",
    role:    "CMO · Nashik Lifeline Hospital",
    avatarColor: C.blue,
    time:    "2 hours ago",
    verified: true,
    body:    "We are upgrading our diagnostic wing at Nashik Lifeline this month! Looking forward to welcoming more temporary tech staff to try out our new GE Healthcare MRI machines. 🏥",
    hasImage: true,
    imageType:"mri",
    likes:   47,
    comments:12,
    shares:  6,
    liked:   false,
  },
  {
    id:      "p2",
    type:    "post",
    author:  "Vilas Z.",
    initials:"VZ",
    role:    "MRI/X-Ray Tech · Nashik",
    avatarColor: C.teal,
    time:    "5 hours ago",
    verified: false,
    body:    "Just wrapped up a challenging 10-hour emergency shift. Always double-check your radiation safety protocols, everyone! Stay safe. ☢️🛡️",
    hasImage: false,
    likes:   89,
    comments:23,
    shares:  14,
    liked:   true,
  },
  {
    id:      "p3",
    type:    "ad",
    author:  "Naukri Medical",
    initials:"NM",
    role:    "Sponsored · Career Development",
    avatarColor: "#7C3AED",
    time:    "Sponsored",
    body:    "Advance your career. Get certified in Advanced Ultrasonography in just 6 weeks. Industry-recognized certification with 100% placement support.",
    cta:     "Click Here to Apply →",
    likes:   null,
    badge:   "AD",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED MICRO-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
const StatusBar = () => (
  <div className="flex items-center justify-between px-5 py-2"
    style={{ background: C.blue }}>
    <span className="text-white text-xs font-semibold" style={{ fontFamily: F.mono }}>9:41</span>
    <div className="flex items-center gap-2">
      <Signal size={12} color="white"/><Wifi size={12} color="white"/><Battery size={14} color="white"/>
    </div>
  </div>
);

const TopHeader = ({ role, onBellClick, unreadCount }) => (
  <div className="flex-none z-50 sticky top-0 flex items-center justify-between px-3 py-2 w-full"
    style={{ backdropFilter:"blur(12px)", background:"rgba(255,255,255,0.75)",
      borderBottom:"1px solid rgba(226,232,240,0.5)" }}>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center"
        style={{ background: C.blue }}>
        <Activity size={12} color="white" strokeWidth={2.5}/>
      </div>
      <span className="font-black text-sm" style={{ color: C.blue, fontFamily: F.head }}>
        Med<span style={{ color: C.teal }}>Shift</span>
      </span>
    </div>
    <div className="flex items-center gap-2">
      <button onClick={onBellClick} className="relative w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100">
        <Bell size={14} color={C.blue} strokeWidth={1.8}/>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale:0 }} animate={{ scale:1 }}
            className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black text-white"
            style={{ background: C.red }}>
            {unreadCount}
          </motion.span>
        )}
      </button>
    </div>
  </div>
);

const BottomNav = ({ active, setActive, role, onAddClick }) => {
  const tabsLeft = [
    { id:"home",      label: "Home",       icon: Home      },
    { id:"shifts",    label: "Shifts",     icon: Calendar  },
  ];
  const tabsRight = [
    { id:"community", label: "Community",  icon: Users     },
    { id:"profile",   label: "Profile",    icon: User      },
  ];

  const renderTab = ({ id, label, icon:Icon }) => {
    const on = active === id;
    return (
      <button key={id} onClick={() => setActive(id)}
        className="flex flex-col items-center gap-0.5 relative py-1 px-2 min-w-[40px] min-h-[40px] justify-center flex-1">
        {on && (
          <motion.div layoutId="navPill"
            className="absolute inset-0 rounded-xl"
            style={{ background:`${C.teal}12` }}
            transition={{ type:"spring", stiffness:400, damping:30 }}/>
        )}
        <Icon size={16} color={on ? C.teal : "#94A3B8"} strokeWidth={on ? 2 : 1.5}/>
        <span className="text-[8px] font-bold relative z-10 mt-0.5"
          style={{ color: on ? C.teal : "#94A3B8", fontFamily: F.head }}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex-none z-50 sticky bottom-0 w-full pointer-events-none pb-0 pt-4">
      <div className="mx-4 mb-4 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md pointer-events-auto flex items-center justify-between px-2 py-1.5"
        style={{ border:"1px solid rgba(226,232,240,0.8)" }}>
        
        {tabsLeft.map(renderTab)}

        <div className="flex-1 flex justify-center -mt-8 pointer-events-auto relative z-20">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onAddClick}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-teal-500/50"
            style={{ 
              background: C.teal,
              boxShadow: `0 8px 20px ${C.teal}70`
            }}>
            <Plus size={26} strokeWidth={2.5}/>
          </motion.button>
        </div>

        {tabsRight.map(renderTab)}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 12 — NOTIFICATION CENTER
// ═══════════════════════════════════════════════════════════════════════════════
const NotifIcon = ({ type, color }) => {
  const map = {
    check:   CheckCircle,
    warning: AlertTriangle,
    invoice: CreditCard,
    urgent:  Siren,
    star:    Star,
    payment: DollarSign,
  };
  const Icon = map[type] || Bell;
  return (
    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{ background:`${color}18` }}>
      <Icon size={18} color={color}/>
    </div>
  );
};

const NotificationCenter = ({ open, onClose, notifications, onMarkAll }) => {
  const [items, setItems] = useState(notifications);
  const unread = items.filter(n => !n.read).length;

  useEffect(() => { setItems(notifications); }, [notifications]);

  const markAll = () => {
    setItems(prev => prev.map(n => ({ ...n, read:true })));
    onMarkAll?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            className="absolute inset-0 z-50 bg-black/30"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={onClose}/>

          {/* Panel */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 z-50 flex flex-col"
            style={{ width:"100%", background:C.pearl }}
            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
            transition={{ type:"spring", stiffness:340, damping:38 }}
          >
            <StatusBar/>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom:"1px solid #F1F5F9" }}>
              <div className="flex items-center gap-3">
                <button onClick={onClose}
                  className="w-9 h-9 rounded-2xl flex items-center justify-center"
                  style={{ background:"#F1F5F9" }}>
                  <ArrowLeft size={17} color={C.blue}/>
                </button>
                <div>
                  <h2 className="font-black text-xl" style={{ color:C.blue, fontFamily:F.head }}>
                    Notifications
                  </h2>
                  {unread > 0 && (
                    <p className="text-xs text-slate-400">{unread} unread</p>
                  )}
                </div>
              </div>
              <button onClick={markAll}
                className="text-sm font-bold"
                style={{ color:C.teal, fontFamily:F.head }}>
                Mark all read
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth:"none" }}>
              {items.map((n, i) => (
                <motion.div key={n.id}
                  initial={{ opacity:0, y:14 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-3 p-3.5 rounded-2xl mb-2.5 relative"
                  style={{
                    background: n.read ? C.card : n.bgColor,
                    border: n.read ? "1px solid #F1F5F9" : `1px solid ${n.color}22`,
                    boxShadow: n.read ? "none" : `0 2px 12px ${n.color}10`,
                  }}>
                  {!n.read && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full"
                      style={{ background: n.color }}/>
                  )}
                  <NotifIcon type={n.icon} color={n.color}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-sm" style={{ color:C.blue, fontFamily:F.head }}>
                        {n.title}
                      </span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background:`${n.color}18`, color:n.color }}>
                        {n.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{n.body}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                      {n.action && (
                        <button className="text-xs font-bold px-2.5 py-1 rounded-xl"
                          style={{ background:`${n.color}12`, color:n.color }}>
                          {n.action}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Empty spacer */}
              <div className="h-8"/>
              <div className="text-center py-4">
                <p className="text-xs text-slate-300 font-medium">You're all caught up ✓</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 13 — MANAGER DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const ManagerDashboard = () => {
  const [boosted, setBoosted] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth:"none" }}>
      {/* Greeting Hero */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-xs text-slate-400 mb-0.5" style={{ fontFamily:F.mono }}>
          Wednesday, 18 Mar 2026
        </p>
        <h1 className="font-black text-2xl mb-1" style={{ color:C.blue, fontFamily:F.head }}>
          Good morning, Dr. Sharma 👋
        </h1>
        <p className="text-sm text-slate-400">{MANAGER.hospital} · {MANAGER.area}</p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {[
            { label:"Active Posts", value:"2",      icon:Radio,       color:C.amber  },
            { label:"Total Hires",  value:"94",     icon:Users,       color:C.teal   },
            { label:"Avg Rating",   value:"4.8★",   icon:Star,        color:"#F59E0B" },
          ].map(({ label, value, icon:Icon, color }) => (
            <div key={label} className="rounded-2xl p-3 text-center"
              style={{ background:`${color}0D`, border:`1px solid ${color}22` }}>
              <Icon size={13} color={color} className="mx-auto mb-1"/>
              <p className="font-black text-sm" style={{ color, fontFamily:F.mono }}>{value}</p>
              <p className="text-[10px] text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Shifts */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-base" style={{ color:C.blue, fontFamily:F.head }}>
            Active Shifts
          </h2>
          <button className="text-xs font-bold px-3 py-1.5 rounded-xl"
            style={{ background:`${C.teal}10`, color:C.teal }}>
            + New Post
          </button>
        </div>

        {MANAGER_SHIFTS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.id}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: i*0.1 }}
              className="rounded-3xl mb-3 overflow-hidden"
              style={{ background:C.card, border:`1px solid ${s.color}22`,
                boxShadow:`0 4px 20px ${s.color}10` }}>
              {/* Status bar top */}
              <div className="flex items-center gap-2 px-4 py-2.5"
                style={{ background:`${s.color}0C`, borderBottom:`1px solid ${s.color}15` }}>
                <span className="flex items-center gap-1.5">
                  {s.status === "searching" ? (
                    <motion.span className="w-2 h-2 rounded-full"
                      style={{ background:C.amber }}
                      animate={{ opacity:[1,0.2,1] }}
                      transition={{ duration:1.2, repeat:Infinity }}/>
                  ) : (
                    <span className="w-2 h-2 rounded-full" style={{ background:C.green }}/>
                  )}
                  <span className="text-xs font-black" style={{ color:s.color, fontFamily:F.mono }}>
                    {s.statusLabel}
                  </span>
                </span>
                {s.status === "matched" && (
                  <span className="ml-auto flex items-center gap-1 text-xs font-bold"
                    style={{ color:C.green }}>
                    <CheckCircle size={12}/> Confirmed
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${s.color}12` }}>
                    <Icon size={18} color={s.color}/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-base leading-tight"
                      style={{ color:C.blue, fontFamily:F.head }}>{s.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{s.dept}</p>
                  </div>
                  <p className="font-black text-base flex-shrink-0" style={{ color:C.teal, fontFamily:F.mono }}>
                    {s.pay}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={12} color="#94A3B8"/>{s.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Timer size={12} color="#94A3B8"/>{s.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3"
                  style={{ borderTop:`1px solid ${s.color}15` }}>
                  <div>
                    <span className="text-xs text-slate-400">Total estimate: </span>
                    <span className="text-xs font-black" style={{ color:C.blue, fontFamily:F.mono }}>
                      {s.totalEst}
                    </span>
                  </div>
                  {s.status === "searching" ? (
                    <motion.button
                      whileTap={{ scale:0.93 }}
                      onClick={() => setBoosted(!boosted)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black"
                      style={{ background: boosted ? `${C.green}15` : `${C.amber}15`,
                        color: boosted ? C.green : C.amber }}>
                      {boosted ? <><CheckCircle size={12}/> Boosted!</> : <><Zap size={12}/> Boost Post</>}
                    </motion.button>
                  ) : (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                      style={{ background:`${C.blue}08`, color:C.blue }}>
                      <Eye size={12}/> View Profile
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="px-5 mb-4">
        <h2 className="font-black text-base mb-3" style={{ color:C.blue, fontFamily:F.head }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label:"Browse Techs",   icon:Search,      color:C.teal  },
            { label:"Post Shift",     icon:Megaphone,   color:C.blue  },
            { label:"View Invoices",  icon:CreditCard,  color:"#8B5CF6" },
            { label:"Analytics",      icon:BarChart3,   color:C.amber },
          ].map(({ label, icon:Icon, color }) => (
            <button key={label}
              className="flex items-center gap-3 p-3.5 rounded-2xl"
              style={{ background:C.card, border:"1px solid #F1F5F9" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background:`${color}10` }}>
                <Icon size={16} color={color}/>
              </div>
              <span className="font-semibold text-sm" style={{ color:C.blue }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 14 — TECHNICIAN JOB RADAR
// ═══════════════════════════════════════════════════════════════════════════════
const TechRadar = () => {
  const [accepted, setAccepted] = useState({});
  const [available, setAvailable] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth:"none" }}>
      {/* Greeting */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-xs text-slate-400 mb-0.5" style={{ fontFamily:F.mono }}>
          Wednesday, 18 Mar 2026
        </p>
        <h1 className="font-black text-2xl mb-1" style={{ color:C.blue, fontFamily:F.head }}>
          Hi, Vilas 👋
        </h1>
        <p className="text-sm text-slate-400">{TECHNICIAN.location} · {TECHNICIAN.rating}★ · {TECHNICIAN.totalShifts} shifts</p>

        {/* Availability toggle */}
        <motion.button
          whileTap={{ scale:0.97 }}
          onClick={() => setAvailable(!available)}
          className="w-full mt-4 rounded-2xl px-5 py-4 flex items-center justify-between"
          style={{
            background: available
              ? `linear-gradient(135deg, ${C.teal}, #0F766E)`
              : `linear-gradient(135deg, ${C.blue}, #1E4A7A)`,
            boxShadow: available ? `0 8px 28px ${C.teal}40` : `0 8px 28px ${C.blue}28`
          }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
              {available
                ? <Radio size={20} color="white" className="animate-pulse"/>
                : <Radio size={20} color="rgba(255,255,255,0.5)"/>}
            </div>
            <div className="text-left">
              <p className="text-white font-black text-base" style={{ fontFamily:F.head }}>
                {available ? "Available for Emergency Calls" : "Go Available"}
              </p>
              <p className="text-white/65 text-xs">
                {available ? "Hospitals can see you nearby" : "Currently off-duty"}
              </p>
            </div>
          </div>
          <div className="w-12 h-6 rounded-full px-1 flex items-center transition-all"
            style={{ background: available ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)" }}>
            <motion.div className="w-4 h-4 rounded-full bg-white"
              animate={{ x: available ? 24 : 0 }}
              transition={{ type:"spring", stiffness:500, damping:30 }}/>
          </div>
        </motion.button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {[
            { label:"Rating",    value:"4.9★", icon:Star,       color:"#F59E0B" },
            { label:"Shifts",    value:"42",   icon:Calendar,   color:C.teal    },
            { label:"Earned",    value:"₹12k", icon:TrendingUp, color:"#8B5CF6" },
          ].map(({ label, value, icon:Icon, color }) => (
            <div key={label} className="rounded-2xl p-3 text-center"
              style={{ background:`${color}0D`, border:`1px solid ${color}22` }}>
              <Icon size={13} color={color} className="mx-auto mb-1"/>
              <p className="font-black text-sm" style={{ color, fontFamily:F.mono }}>{value}</p>
              <p className="text-[10px] text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shift Cards */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-base" style={{ color:C.blue, fontFamily:F.head }}>
            Nearby Shifts
            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background:`${C.teal}12`, color:C.teal }}>
              {TECH_SHIFTS.length}
            </span>
          </h2>
          <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl"
            style={{ background:`${C.blue}08`, color:C.blue }}>
            <Filter size={12}/> Filter
          </button>
        </div>

        {TECH_SHIFTS.map((s, i) => (
          <motion.div key={s.id}
            initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.1 }}
            className="rounded-3xl mb-3 overflow-hidden"
            style={{ background:C.card, border:`1px solid ${s.color}20`,
              boxShadow:`0 4px 20px ${s.color}08` }}>
            {/* Urgent banner */}
            {s.urgent && (
              <div className="flex items-center gap-2 px-4 py-2"
                style={{ background:"#FEF2F2", borderBottom:"1px solid #FECACA" }}>
                <motion.span className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity:[1,0.2,1] }} transition={{ duration:1, repeat:Infinity }}/>
                <span className="text-xs font-black text-red-600" style={{ fontFamily:F.mono }}>
                  URGENT · High Demand
                </span>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex-1">
                  <h3 className="font-black text-base" style={{ color:C.blue, fontFamily:F.head }}>
                    {s.hospital}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{s.dept}</p>
                </div>
                <p className="font-black text-base flex-shrink-0"
                  style={{ color:C.teal, fontFamily:F.mono }}>{s.pay}</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background:`${s.color}12`, color:s.color }}>
                  {s.equipment}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin size={11} color="#94A3B8"/>{s.distance}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} color="#94A3B8"/>{s.time}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3"
                style={{ borderTop:`1px solid ${s.color}12` }}>
                <div>
                  <span className="text-xs text-slate-400">Est: </span>
                  <span className="text-xs font-black" style={{ color:C.blue, fontFamily:F.mono }}>
                    {s.totalEst} · {s.duration}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale:0.93 }}
                  onClick={() => setAccepted(a => ({ ...a, [s.id]: !a[s.id] }))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-sm text-white"
                  style={{
                    background: accepted[s.id]
                      ? `linear-gradient(135deg, ${C.green}, #059669)`
                      : `linear-gradient(135deg, ${C.teal}, #0F766E)`,
                    boxShadow: accepted[s.id]
                      ? "0 4px 16px rgba(16,185,129,0.4)"
                      : `0 4px 16px ${C.teal}40`,
                    minHeight:44,
                  }}>
                  <AnimatePresence mode="wait">
                    {accepted[s.id] ? (
                      <motion.span key="done" className="flex items-center gap-1.5"
                        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}>
                        <CheckCircle size={15}/> Accepted!
                      </motion.span>
                    ) : (
                      <motion.span key="acc" className="flex items-center gap-1.5"
                        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}>
                        <Zap size={15}/> Accept Shift
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// TECHNICIAN WALLET
// ═══════════════════════════════════════════════════════════════════════════════
const TechWallet = () => {
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  const doWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => { setWithdrawing(false); setWithdrawn(true); }, 1500);
    setTimeout(() => setWithdrawn(false), 4000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth:"none" }}>
      {/* Balance Hero Card */}
      <div className="px-5 pt-5 pb-2">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{ background:`linear-gradient(135deg, ${C.blue} 0%, #0F2744 100%)`,
            boxShadow:`0 16px 48px ${C.blue}40` }}>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
            style={{ background:C.teal }}/>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
            style={{ background:C.amber }}/>

          <p className="text-white/60 text-xs mb-1 relative z-10" style={{ fontFamily:F.mono }}>
            Available Balance
          </p>
          <p className="text-white font-black text-4xl mb-1 relative z-10" style={{ fontFamily:F.mono }}>
            {WALLET.balance}
          </p>
          <div className="flex items-center gap-1.5 relative z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <p className="text-emerald-400 text-xs font-semibold">
              +₹2,400 pending · MRI Shift
            </p>
          </div>

          <div className="flex gap-3 mt-5 relative z-10">
            <motion.button whileTap={{ scale:0.95 }}
              onClick={doWithdraw}
              className="flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
              style={{ background: withdrawn ? C.green : C.teal,
                color:"white", fontFamily:F.head }}>
              {withdrawing ? (
                <><RefreshCw size={15} className="animate-spin"/> Processing…</>
              ) : withdrawn ? (
                <><CheckCircle size={15}/> Withdrawn!</>
              ) : (
                <><ArrowUpRight size={15}/> Withdraw</>
              )}
            </motion.button>
            <button className="flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              style={{ background:"rgba(255,255,255,0.12)", color:"white" }}>
              <ArrowDownLeft size={15}/> Add Money
            </button>
          </div>
        </motion.div>
      </div>

      {/* Last Payout Banner */}
      <div className="px-5 mt-4 mb-5">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl"
          style={{ background:"#ECFDF5", border:"1px solid #A7F3D0" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background:`${C.green}20` }}>
            <CheckCircle size={17} color={C.green}/>
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color:"#065F46" }}>
              Last Payout: {WALLET.lastPayout} ✓
            </p>
            <p className="text-xs" style={{ color:"#6EE7B7" }}>
              Successfully transferred to {WALLET.lastPayoutBank} · {WALLET.lastPayoutDate}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-5">
        <h2 className="font-black text-base mb-3" style={{ color:C.blue, fontFamily:F.head }}>
          Transaction History
        </h2>
        {WALLET.transactions.map((t, i) => (
          <motion.div key={t.id}
            initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
            transition={{ delay: i*0.07 }}
            className="flex items-center gap-3 py-3.5"
            style={{ borderBottom:"1px solid #F8FAFC" }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background:`${t.color}12` }}>
              {t.type==="credit"
                ? <ArrowDownLeft size={17} color={t.color}/>
                : <ArrowUpRight  size={17} color={t.color}/>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color:C.blue }}>{t.label}</p>
              <p className="text-xs text-slate-400">{t.date}</p>
            </div>
            <p className="font-black text-sm flex-shrink-0"
              style={{ color:t.color, fontFamily:F.mono }}>{t.amount}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MANAGER FINANCE TAB
// ═══════════════════════════════════════════════════════════════════════════════
const ManagerFinance = () => (
  <div className="flex-1 overflow-y-auto pb-28 px-5 pt-5" style={{ scrollbarWidth:"none" }}>
    <h1 className="font-black text-2xl mb-1" style={{ color:C.blue, fontFamily:F.head }}>Finance</h1>
    <p className="text-sm text-slate-400 mb-5">{MANAGER.hospital}</p>

    {/* Invoice card */}
    <div className="rounded-3xl p-5 mb-4"
      style={{ background:C.card, border:"1px solid #F1F5F9",
        boxShadow:"0 4px 20px rgba(26,54,93,0.06)" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-base" style={{ color:C.blue, fontFamily:F.head }}>
          Invoice #4092
        </h3>
        <span className="text-xs font-black px-2.5 py-1 rounded-full"
          style={{ background:`${C.teal}12`, color:C.teal }}>Generated</span>
      </div>
      <p className="text-xs text-slate-400 mb-3">Last week's temporary staffing · Mar 10–16, 2026</p>
      <div className="flex items-center justify-between py-2.5"
        style={{ borderTop:"1px dashed #E2E8F0" }}>
        <span className="text-sm text-slate-500">Total Amount</span>
        <span className="font-black text-xl" style={{ color:C.blue, fontFamily:F.mono }}>₹24,000</span>
      </div>
      <button className="w-full mt-3 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
        style={{ background:`${C.blue}08`, color:C.blue }}>
        <CreditCard size={15}/> Download Invoice PDF
      </button>
    </div>

    {[
      { label:"MRI Shift – Vilas Z.",  date:"Mar 17",amount:"₹6,400", status:"Paid" },
      { label:"X-Ray Shift – Pending", date:"Mar 18",amount:"₹3,600", status:"Pending" },
    ].map((r, i) => (
      <div key={i} className="flex items-center gap-3 py-3.5"
        style={{ borderBottom:"1px solid #F8FAFC" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background:`${C.teal}10` }}>
          <CreditCard size={15} color={C.teal}/>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color:C.blue }}>{r.label}</p>
          <p className="text-xs text-slate-400">{r.date}</p>
        </div>
        <div className="text-right">
          <p className="font-black text-sm" style={{ color:C.blue, fontFamily:F.mono }}>{r.amount}</p>
          <span className="text-[10px] font-bold"
            style={{ color: r.status==="Paid" ? C.green : C.amber }}>{r.status}</span>
        </div>
      </div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE SCREENS
// ═══════════════════════════════════════════════════════════════════════════════
const ManagerProfile = () => (
  <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth:"none" }}>
    <div className="relative h-44"
      style={{ background:`linear-gradient(135deg, ${C.blue}, #0F2744)` }}>
      <svg viewBox="0 0 430 176" className="absolute inset-0 w-full h-full opacity-20">
        <circle cx="350" cy="40"  r="70"  fill={C.teal}/>
        <circle cx="80"  cy="140" r="50"  fill={C.amber}/>
        <circle cx="220" cy="88"  r="90"  fill="rgba(255,255,255,0.05)"/>
      </svg>
      <div className="absolute bottom-0 left-5 translate-y-1/2">
        <div className="w-20 h-20 rounded-3xl border-4 border-white flex items-center justify-center font-black text-3xl text-white shadow-xl"
          style={{ background:`linear-gradient(135deg, ${C.teal}, #0F766E)` }}>
          AS
        </div>
      </div>
    </div>
    <div className="px-5 pt-14 pb-5">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="font-black text-2xl" style={{ color:C.blue, fontFamily:F.head }}>
            {MANAGER.name}
          </h1>
          <p className="text-sm text-slate-400">{MANAGER.role}</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full mt-1"
          style={{ background:`${C.teal}10`, color:C.teal }}>
          <BadgeCheck size={11}/> Verified
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2 mb-4">
        <Building2 size={14} color="#94A3B8"/>{MANAGER.hospital}
        <span className="text-slate-300">·</span>
        <MapPin size={14} color="#94A3B8"/>{MANAGER.area}
      </div>
      {[
        { label:"Hospital", value:MANAGER.hospital },
        { label:"Location", value:MANAGER.area      },
        { label:"Dept",     value:"Radiology, ICU, OT" },
        { label:"NABH",     value:"Accredited ✓"    },
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between py-3"
          style={{ borderBottom:"1px solid #F1F5F9" }}>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide"
            style={{ fontFamily:F.mono }}>{label}</span>
          <span className="text-sm font-semibold" style={{ color:C.blue }}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const TechProfile = () => (
  <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth:"none" }}>
    <div className="px-5 pt-5 pb-6"
      style={{ background:`linear-gradient(160deg, ${C.blue}, #0F2744)` }}>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl border-4 flex items-center justify-center font-black text-4xl text-white mb-3 shadow-2xl"
          style={{ background:`linear-gradient(135deg, ${C.teal}, #0F766E)`,
            borderColor:"rgba(255,255,255,0.2)" }}>
          VZ
        </div>
        <h1 className="font-black text-2xl text-white" style={{ fontFamily:F.head }}>
          {TECHNICIAN.fullName}
        </h1>
        <p className="text-white/65 text-sm text-center mt-0.5 px-6">{TECHNICIAN.subtitle}</p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background:"rgba(255,255,255,0.12)" }}>
            <Star size={12} fill="#F59E0B" color="#F59E0B"/>
            <span className="text-white font-black text-sm">{TECHNICIAN.rating} / 5.0</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background:"rgba(255,255,255,0.12)" }}>
            <Hash size={12} color="rgba(255,255,255,0.7)"/>
            <span className="text-white font-black text-sm">{TECHNICIAN.totalShifts} shifts</span>
          </div>
        </div>
      </div>
    </div>
    <div className="px-5 pt-5">
      {[
        { label:"Location",  value:TECHNICIAN.location },
        { label:"Specialty", value:"MRI, X-Ray, CT Scan" },
        { label:"Wallet",    value:"₹12,450 balance" },
        { label:"Status",    value:"Available Now ✓" },
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between py-3"
          style={{ borderBottom:"1px solid #F1F5F9" }}>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide"
            style={{ fontFamily:F.mono }}>{label}</span>
          <span className="text-sm font-semibold" style={{ color:C.blue }}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 15 — COMMUNITY FEED
// ═══════════════════════════════════════════════════════════════════════════════

// MRI Machine SVG illustration
const MRIMachineIllustration = () => (
  <svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg"
    className="w-full rounded-2xl" style={{ background:"linear-gradient(135deg,#EEF2FF 0%,#E0F2FE 100%)" }}>
    <defs>
      <radialGradient id="mriGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0D9488" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#0D9488" stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* Glow */}
    <ellipse cx="170" cy="90" rx="110" ry="80" fill="url(#mriGlow)"/>
    {/* MRI bore (outer ring) */}
    <ellipse cx="170" cy="90" rx="78" ry="78" fill="none" stroke="#CBD5E1" strokeWidth="28" />
    <ellipse cx="170" cy="90" rx="78" ry="78" fill="none" stroke="white" strokeWidth="26" />
    {/* Inner bore */}
    <ellipse cx="170" cy="90" rx="52" ry="52" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2"/>
    {/* Tunnel gradient */}
    <ellipse cx="170" cy="90" rx="40" ry="40" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="1"/>
    {/* Patient table */}
    <rect x="82" y="106" width="176" height="12" rx="6" fill="#94A3B8"/>
    <rect x="100" y="96" width="140" height="12" rx="4" fill="#CBD5E1"/>
    {/* Control panel */}
    <rect x="270" y="55" width="50" height="70" rx="8" fill="#E2E8F0"/>
    <rect x="276" y="63" width="38" height="24" rx="4" fill="#0D9488" opacity="0.8"/>
    {[0,1,2].map(i => (
      <circle key={i} cx={285 + i*10} cy={100} r="4" fill={i===0?"#10B981":i===1?"#F59E0B":"#94A3B8"}/>
    ))}
    {/* Label */}
    <text x="170" y="162" textAnchor="middle" fill="#64748B" fontSize="11"
      fontFamily="monospace" fontWeight="600">GE Healthcare · SIGNA™ 1.5T MRI</text>
    {/* Signal arcs */}
    {[1,2,3].map(i => (
      <path key={i} d={`M ${170-30*i} ${90} A ${30*i} ${30*i} 0 0 1 ${170+30*i} ${90}`}
        fill="none" stroke="#0D9488" strokeWidth="1" opacity={0.4 - i*0.1}
        strokeDasharray="4 4"/>
    ))}
  </svg>
);

const FeedPost = ({ post }) => {
  const [liked,    setLiked]    = useState(post.liked || false);
  const [saved,    setSaved]    = useState(false);
  const [likeCount,setLikeCount]= useState(post.likes || 0);

  const handleLike = () => {
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  if (post.type === "ad") {
    return (
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        className="rounded-3xl overflow-hidden mb-4"
        style={{ background:"linear-gradient(135deg,#4C1D95,#5B21B6)",
          boxShadow:"0 8px 32px rgba(91,33,182,0.25)" }}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-sm"
              style={{ background:"rgba(255,255,255,0.2)" }}>NM</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-white">{post.author}</p>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                  style={{ background:"rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.8)" }}>
                  AD
                </span>
              </div>
              <p className="text-xs" style={{ color:"rgba(255,255,255,0.55)" }}>{post.role}</p>
            </div>
          </div>
          <p className="text-white/90 text-sm leading-relaxed mb-4">{post.body}</p>
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale:0.95 }}
              className="flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
              style={{ background:"rgba(255,255,255,0.2)", color:"white" }}>
              <ExternalLink size={14}/> {post.cta}
            </motion.button>
            <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background:"rgba(255,255,255,0.1)" }}>
              <X size={14} color="rgba(255,255,255,0.6)"/>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      className="rounded-3xl mb-4 overflow-hidden"
      style={{ background:C.card, border:"1px solid #F1F5F9",
        boxShadow:"0 4px 20px rgba(26,54,93,0.06)" }}>
      {/* Author header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-sm"
          style={{ background:`linear-gradient(135deg, ${post.avatarColor}, ${post.avatarColor}BB)` }}>
          {post.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-sm truncate" style={{ color:C.blue, fontFamily:F.head }}>
              {post.author}
            </p>
            {post.verified && <BadgeCheck size={13} color={C.teal}/>}
          </div>
          <p className="text-xs text-slate-400 truncate">{post.role}</p>
          <p className="text-[10px] text-slate-300">{post.time}</p>
        </div>
        <button className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background:"#F8FAFC" }}>
          <MoreHorizontal size={15} color="#94A3B8"/>
        </button>
      </div>

      {/* Body text */}
      <p className="px-4 pb-3 text-sm text-slate-600 leading-relaxed">{post.body}</p>

      {/* Image if any */}
      {post.hasImage && post.imageType === "mri" && (
        <div className="px-4 pb-3">
          <MRIMachineIllustration/>
        </div>
      )}

      {/* Engagement bar */}
      <div className="px-4 pb-3 pt-1 flex items-center justify-between"
        style={{ borderTop:"1px solid #F8FAFC" }}>
        <div className="flex items-center gap-4">
          <motion.button whileTap={{ scale:0.85 }}
            onClick={handleLike}
            className="flex items-center gap-1.5">
            <motion.div
              animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
              transition={{ duration:0.3 }}>
              <ThumbsUp size={17}
                color={liked ? C.teal : "#94A3B8"}
                fill={liked ? C.teal : "none"}
                strokeWidth={liked ? 2.5 : 1.8}/>
            </motion.div>
            <span className="text-xs font-semibold"
              style={{ color: liked ? C.teal : "#94A3B8" }}>{likeCount}</span>
          </motion.button>

          <button className="flex items-center gap-1.5">
            <MessageCircle size={17} color="#94A3B8" strokeWidth={1.8}/>
            <span className="text-xs font-semibold text-slate-400">{post.comments}</span>
          </button>

          <button className="flex items-center gap-1.5">
            <Send size={16} color="#94A3B8" strokeWidth={1.8}/>
            <span className="text-xs font-semibold text-slate-400">{post.shares}</span>
          </button>
        </div>

        <motion.button whileTap={{ scale:0.85 }} onClick={() => setSaved(s => !s)}>
          <Bookmark size={17}
            color={saved ? C.blue : "#94A3B8"}
            fill={saved ? C.blue : "none"}
            strokeWidth={saved ? 2.5 : 1.8}/>
        </motion.button>
      </div>
    </motion.div>
  );
};

const CommunityFeed = ({ posts }) => (
  <div className="flex-1 overflow-y-auto pb-28 px-4 pt-4" style={{ scrollbarWidth:"none" }}>
    {/* Search */}
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl"
        style={{ background:C.card, border:"1px solid #F1F5F9" }}>
        <Search size={15} color="#94A3B8"/>
        <span className="text-sm text-slate-300" style={{ fontFamily:F.head }}>Search community…</span>
      </div>
      <button className="w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{ background:C.card, border:"1px solid #F1F5F9" }}>
        <Filter size={16} color={C.blue}/>
      </button>
    </div>

    {/* Pills */}
    <div className="flex gap-2 mb-5 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
      {["For You","Hospitals","Technicians","Tips & Safety","Jobs"].map((t, i) => (
        <span key={t}
          className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 cursor-pointer"
          style={{ background: i===0 ? C.blue : C.card,
            color: i===0 ? "white" : "#94A3B8",
            border: i===0 ? "none" : "1px solid #F1F5F9",
            fontFamily:F.head }}>
          {t}
        </span>
      ))}
    </div>

    {/* Posts */}
    {posts.map((post, i) => (
      <motion.div key={post.id}
        initial={{ opacity:0, y:24 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay: i * 0.12 }}>
        <FeedPost post={post}/>
      </motion.div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SHIFTS TAB (shared)
// ═══════════════════════════════════════════════════════════════════════════════
const ShiftsTab = ({ role }) => {
  const shifts = role === "manager" ? MANAGER_SHIFTS : TECH_SHIFTS;
  return (
    <div className="flex-1 overflow-y-auto pb-28 px-5 pt-5" style={{ scrollbarWidth:"none" }}>
      <h1 className="font-black text-2xl mb-1" style={{ color:C.blue, fontFamily:F.head }}>
        {role === "manager" ? "Posted Shifts" : "My Shifts"}
      </h1>
      <p className="text-sm text-slate-400 mb-5">
        {role === "manager" ? MANAGER.hospital : "Upcoming & past work"}
      </p>
      <div className="flex gap-2 mb-5 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
        {["Active","Upcoming","Completed","Cancelled"].map((t, i) => (
          <button key={t}
            className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap flex-shrink-0"
            style={{ background: i===0 ? C.blue : "#F1F5F9",
              color: i===0 ? "white" : "#94A3B8", fontFamily:F.head }}>
            {t}
          </button>
        ))}
      </div>
      {shifts.map((s, i) => {
        const Icon = s.icon || ScanLine;
        return (
          <motion.div key={s.id}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.1 }}
            className="rounded-3xl mb-3 overflow-hidden"
            style={{ background:C.card, border:`1px solid ${s.color}22`,
              boxShadow:`0 4px 20px ${s.color}08` }}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background:`${s.color}12` }}>
                  <Icon size={18} color={s.color}/>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-base" style={{ color:C.blue, fontFamily:F.head }}>
                    {s.title || s.equipment}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{s.time}</p>
                </div>
                <p className="font-black text-sm" style={{ color:C.teal, fontFamily:F.mono }}>{s.pay}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO ENTRY SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
const DemoLoginScreen = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden shadow-2xl"
    style={{ background: "#060D1A" }}>
    
    {/* Background Shapes */}
    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
      style={{ background: `radial-gradient(circle, ${C.teal} 0%, transparent 70%)` }}/>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
      style={{ background: `radial-gradient(circle, ${C.amber} 0%, transparent 70%)` }}/>
    
    <div className="relative z-10 flex flex-col items-center w-full px-8">
      {/* Logo Area */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center shadow-2xl mb-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, white, #E2E8F0)" }}>
          <div className="absolute bottom-0 left-0 right-0 h-4" style={{ background: C.teal }}></div>
          <svg width="34" height="34" viewBox="0 0 16 16" fill="none" className="relative z-10">
            <path d="M8 2v12M2 8h12" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: F.head }}>
          MedShift
        </h1>
        <p className="text-slate-400 mt-2 text-center text-sm font-medium leading-relaxed max-w-[260px]">
          The emergency staffing platform for healthcare.
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-4 mt-8">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onClick={() => onLogin("manager")}
          className="w-full rounded-[1.25rem] p-5 text-left relative overflow-hidden border border-white/10"
          style={{ background: `linear-gradient(135deg, ${C.blue}, #0F2744)`, boxShadow: `0 12px 32px ${C.blue}40` }}>
          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 bg-gradient-to-l from-white to-transparent pointer-events-none"/>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md text-red-500 bg-red-500/10" style={{ fontFamily: F.mono }}>
              Urgent Request
            </span>
            <ArrowUpRight size={18} color="rgba(255,255,255,0.4)" />
          </div>
          <h2 className="text-white text-xl font-black tracking-tight" style={{ fontFamily: F.head }}>
            I Need a Technician
          </h2>
          <p className="text-white/60 text-xs mt-1">Login as Hospital Manager</p>
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          onClick={() => onLogin("technician")}
          className="w-full rounded-[1.25rem] p-5 text-left relative overflow-hidden border border-white/10 mt-1"
          style={{ background: `linear-gradient(135deg, ${C.teal}, #0B736A)`, boxShadow: `0 12px 32px ${C.teal}40` }}>
          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 bg-gradient-to-l from-white to-transparent pointer-events-none"/>
          <div className="flex justify-end mb-2">
            <ArrowUpRight size={18} color="rgba(255,255,255,0.4)" />
          </div>
          <h2 className="text-white text-xl font-black tracking-tight -mt-4 lg:mt-0" style={{ fontFamily: F.head }}>
            I'm a Technician
          </h2>
          <p className="text-white/60 text-xs mt-1">Find high-paying shifts</p>
        </motion.button>
      </div>

      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-slate-500 text-[10px] font-medium mt-12 mb-6" style={{ fontFamily: F.mono }}>
        © 2026 MedShift Technologies
      </motion.p>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// CREATE POST BOTTOM SHEET
// ═══════════════════════════════════════════════════════════════════════════════
const CreatePostSheet = ({ open, onClose, onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={onClose}/>

          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[70] flex flex-col rounded-t-3xl overflow-hidden shadow-2xl"
            style={{ background: C.card, height: "70vh" }}
            initial={{ y:"100%" }} animate={{ y:0 }} exit={{ y:"100%" }}
            transition={{ type:"spring", stiffness:340, damping:38 }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid #F1F5F9" }}>
              <h2 className="font-black text-lg" style={{ color:C.blue, fontFamily:F.head }}>
                Create New Post
              </h2>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 transition-colors hover:bg-slate-200">
                <X size={16} color={C.blue}/>
              </button>
            </div>

            <div className="flex-1 p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-sm"
                  style={{ background:`linear-gradient(135deg, ${C.blue}, #0F2744)` }}>
                  {MANAGER.initials}
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight" style={{ color:C.blue, fontFamily:F.head }}>
                    {MANAGER.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{MANAGER.role}</p>
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share a medical update, urgent need, or news..."
                className="w-full flex-1 resize-none outline-none text-base text-slate-700 placeholder:text-slate-300 bg-transparent"
                style={{ fontFamily:F.head }}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between px-5 py-4" style={{ borderTop:"1px solid #F1F5F9" }}>
              <button className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors hover:bg-teal-100/50"
                style={{ background: `${C.teal}12` }}>
                <ImageIcon size={20} color={C.teal} />
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="px-6 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg"
                style={{ background: C.teal, boxShadow: `0 4px 14px ${C.teal}40`, opacity: text.trim() ? 1 : 0.6 }}>
                Post to Community
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function MedShiftFull() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role,       setRole]       = useState("technician");
  const [activeTab,  setActiveTab]  = useState("home");
  const [notifOpen,  setNotifOpen]  = useState(false);
  const [unread,     setUnread]     = useState(3);
  
  // Phase 6 addition
  const [posts, setPosts] = useState(FEED_POSTS);
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const handleCreatePost = (text) => {
    const newPost = {
      id: "p_" + Date.now(),
      type: "post",
      author: MANAGER.name,
      initials: MANAGER.initials,
      role: MANAGER.role,
      avatarColor: C.blue,
      time: "Just now",
      verified: MANAGER.verified,
      body: text,
      hasImage: false,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setCreatePostOpen(false);
    setActiveTab("community");
  };

  const notifications = role === "manager" ? MANAGER_NOTIFICATIONS : TECH_NOTIFICATIONS;

  // Demo Login Gateway
  if (!isAuthenticated) {
    return (
      <div className="h-[100dvh] w-full flex flex-col justify-center" style={{ background:"#000" }}>
        <style>{FONTS}{`
          *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
          body { background: #000; margin: 0; }
        `}</style>
        <div className="relative shadow-2xl overflow-y-auto" style={{ width: "100%", flex: 1 }}>
          <DemoLoginScreen onLogin={(r) => {
            setRole(r);
            setActiveTab("home");
            setUnread(3);
            setIsAuthenticated(true);
          }} />
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case "home":      return role === "manager" ? <ManagerDashboard/> : <TechRadar/>;
      case "shifts":    return <ShiftsTab role={role}/>;
      case "community": return <CommunityFeed posts={posts}/>;
      case "profile":
        return role === "manager" ? (
          <div className="flex flex-col gap-6">
            <ManagerProfile/>
            <div className="mx-1 mt-2 pt-6 border-t border-slate-200">
              <h3 className="text-xs font-black mb-3 px-4 uppercase tracking-widest" style={{ fontFamily:F.head, color:"#0D9488" }}>Finance & Payments</h3>
              <ManagerFinance/>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <TechProfile/>
            <div className="mx-1 mt-2 pt-6 border-t border-slate-200">
              <h3 className="text-xs font-black mb-3 px-4 uppercase tracking-widest" style={{ fontFamily:F.head, color:"#0D9488" }}>Wallet & Earnings</h3>
              <TechWallet/>
            </div>
          </div>
        );
      default:          return null;
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden overscroll-y-contain max-w-[480px] mx-auto w-full relative bg-slate-50"
      style={{ fontFamily:F.head }}>
      <style>{FONTS}{`
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        body { background: #f8fafc; margin: 0; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <TopHeader
        role={role}
        onBellClick={() => setNotifOpen(true)}
        unreadCount={unread}
      />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pt-16 pb-20 overscroll-y-contain scrollbar-hide px-3 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab + role}
              className="flex flex-col flex-1 w-full"
              initial={{ opacity:0, x:16 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-16 }}
              transition={{ duration:0.2 }}>
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav active={activeTab} setActive={setActiveTab} role={role} onAddClick={() => setCreatePostOpen(true)}/>

        {/* Notification Panel — Phase 12 */}
        <NotificationCenter
          open={notifOpen}
          onClose={() => setNotifOpen(false)}
          notifications={notifications}
          onMarkAll={() => setUnread(0)}
        />

        {/* Create Post Sheet — Phase 6 */}
        <CreatePostSheet
          open={createPostOpen}
          onClose={() => setCreatePostOpen(false)}
          onSubmit={handleCreatePost}
        />
    </div>
  );
}
