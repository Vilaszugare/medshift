import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video, VideoOff, Mic, MicOff, Volume2,
  Activity, Signal, Wifi, Battery, PhoneOff
} from "lucide-react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  blue: "#1A365D",
  teal: "#0D9488",
  pearl: "#F8FAFC",
  card: "#FFFFFF",
};

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
const StatusBar = ({ dark = false }) => (
  <div className="flex items-center justify-between px-5 py-2"
    style={{ background: dark ? "transparent" : C.blue }}>
    <span className="text-xs font-semibold tracking-wide"
      style={{ color: "white", fontFamily: "'DM Mono', monospace" }}>9:41</span>
    <div className="flex items-center gap-2">
      <Signal size={12} className="text-white" />
      <Wifi size={12} className="text-white" />
      <Battery size={14} className="text-white" />
    </div>
  </div>
);

// ─── CONTROL BUTTON ───────────────────────────────────────────────────────────
const ControlBtn = ({ icon: Icon, label, active, activeColor, onClick }) => (
  <motion.button whileTap={{ scale: 0.88 }} onClick={onClick}
    className="flex flex-col items-center gap-1.5">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all"
      style={{
        background: active ? `${activeColor}28` : "rgba(255,255,255,0.10)",
        border: active ? `1.5px solid ${activeColor}60` : "1.5px solid rgba(255,255,255,0.08)"
      }}>
      <Icon size={20} color={active ? activeColor : "rgba(255,255,255,0.80)"} strokeWidth={1.8} />
    </div>
    <span className="text-[10px] font-bold" style={{ color: active ? activeColor : "rgba(255,255,255,0.55)" }}>
      {label}
    </span>
  </motion.button>
);

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 11  ·  MOCK CALLING UI  (WhatsApp-style)
// ─────────────────────────────────────────────────────────────────────────────
export default function CallingScreen({ callee, onEnd }) {
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);
  const [videoOff, setVideoOff] = useState(true);
  const [duration, setDuration] = useState(0);
  const [callState, setCallState] = useState("ringing"); // ringing | connected

  // Simulate "connected" after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setCallState("connected"), 3000);
    return () => clearTimeout(t);
  }, []);

  // Timer when connected
  useEffect(() => {
    if (callState !== "connected") return;
    const t = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 38 }}
    >
      {/* ── Full-screen blurred "profile photo" background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #0F2744 0%, #1A4A3A 40%, #0D3030 100%)" }} />

        {/* Blurred shape blobs */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 430 932"
          xmlns="http://www.w3.org/2000/svg" opacity="0.35">
          <defs>
            <filter id="blur1"><feGaussianBlur stdDeviation="48" /></filter>
          </defs>
          <ellipse cx="215" cy="280" rx="110" ry="130" fill={C.teal} filter="url(#blur1)" />
          <ellipse cx="200" cy="460" rx="130" ry="90" fill="#0D9488" filter="url(#blur1)" />
          <ellipse cx="215" cy="180" rx="70" ry="80" fill="#1E8A7A" filter="url(#blur1)" />
        </svg>

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: "rgba(8,20,40,0.62)" }} />
      </div>

      <StatusBar dark />

      {/* ── Top Section: Callee info ── */}
      <div className="relative z-10 flex flex-col items-center pt-12 px-5">
        {/* Avatar */}
        <motion.div
          animate={callState === "ringing"
            ? { boxShadow: ["0 0 0 0px rgba(13,148,136,0.5)", "0 0 0 28px rgba(13,148,136,0)"] }
            : { boxShadow: "none" }
          }
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-28 h-28 rounded-full border-4 flex items-center justify-center mb-5 font-black text-5xl text-white"
          style={{
            background: `linear-gradient(135deg, ${C.teal}, #0F766E)`,
            borderColor: "rgba(255,255,255,0.25)"
          }}>
          {callee?.[0]?.toUpperCase() || "?"}
        </motion.div>

        {/* Name */}
        <h1 className="font-black text-3xl text-white mb-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {callee}
        </h1>
        <p className="text-white/60 text-sm mb-3">MedShift User</p>

        {/* Ringing / Connected status */}
        <AnimatePresence mode="wait">
          {callState === "ringing" ? (
            <motion.div key="ringing" className="flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <div className="flex items-center gap-1">
                {[0, 0.2, 0.4].map((d, i) => (
                  <motion.span key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d }}
                  />
                ))}
              </div>
              <motion.span
                className="text-white/80 text-base font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                Calling {callee}…
              </motion.span>
            </motion.div>
          ) : (
            <motion.div key="connected"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-black text-base"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                {fmt(duration)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Middle decoration: signal ripples ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {callState === "ringing" && (
          <div className="relative flex items-center justify-center">
            {[1, 2, 3].map(i => (
              <motion.div key={i}
                className="absolute rounded-full border"
                style={{ borderColor: "rgba(13,148,136,0.25)", width: 80, height: 80 }}
                animate={{ scale: [1, 4], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
              />
            ))}
          </div>
        )}
        {callState === "connected" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 px-6 py-4 rounded-3xl"
            style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
            <Activity size={22} color={C.teal} />
            <p className="text-white/60 text-xs">Voice call encrypted</p>
          </motion.div>
        )}
      </div>

      {/* ── Bottom Controls — Floating Pill ── */}
      <div className="relative z-10 pb-14 px-5">
        <motion.div
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="rounded-3xl px-6 py-5 flex items-center justify-between"
          style={{
            background: "rgba(15,25,50,0.72)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
          }}>

          {/* Speaker */}
          <ControlBtn
            icon={Volume2}
            label="Speaker"
            active={speakerOn}
            activeColor={C.teal}
            onClick={() => setSpeakerOn(s => !s)}
          />

          {/* Video toggle */}
          <ControlBtn
            icon={videoOff ? VideoOff : Video}
            label="Video"
            active={!videoOff}
            activeColor={C.teal}
            onClick={() => setVideoOff(v => !v)}
          />

          {/* Mute */}
          <ControlBtn
            icon={muted ? MicOff : Mic}
            label={muted ? "Unmute" : "Mute"}
            active={muted}
            activeColor="#F59E0B"
            onClick={() => setMuted(m => !m)}
          />

          {/* ── End Call ── */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onEnd}
            className="flex flex-col items-center gap-1.5"
          >
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
              style={{
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
                boxShadow: "0 8px 24px rgba(239,68,68,0.55)"
              }}>
              <PhoneOff size={24} color="white" />
            </motion.div>
            <span className="text-white/60 text-[10px] font-bold">End</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
