import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MessageCircle, ArrowLeft, Send, Inbox, Loader2
} from "lucide-react";
import { C, F } from "./MedShift_Phase12_15.jsx";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso) {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatTime(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
const Bubble = ({ msg, isMe }) => (
  <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
    <div
      className="max-w-[78%] px-3.5 py-2.5 shadow-sm"
      style={{
        background: isMe ? C.teal : "#F1F5F9",
        color: isMe ? "white" : "#1E293B",
        borderRadius: isMe
          ? "18px 18px 4px 18px"   // right bubble — flat bottom-right
          : "18px 18px 18px 4px",  // left bubble  — flat bottom-left
        fontFamily: F.head,
      }}
    >
      <p className="text-sm leading-relaxed">{msg.content}</p>
      <p
        className="text-[10px] mt-0.5"
        style={{ color: isMe ? "rgba(255,255,255,0.65)" : "#94A3B8", textAlign: "right" }}
      >
        {formatTime(msg.created_at)}
      </p>
    </div>
  </div>
);

// ─── Message List Item ────────────────────────────────────────────────────────
const MessageItem = ({ msg, onSelect }) => (
  <motion.button
    onClick={() => onSelect(msg)}
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-start gap-3 p-4 rounded-2xl mb-2.5 text-left transition-all"
    style={{
      background: msg.is_read ? "var(--c-card)" : `${C.teal}0D`,
      border: `1px solid ${msg.is_read ? "#F1F5F9" : C.teal + "22"}`,
    }}
  >
    {/* Avatar */}
    <div
      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-white text-sm"
      style={{ background: C.teal }}
    >
      {msg.sender_name?.[0]?.toUpperCase() || "T"}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-0.5">
        <span className="font-black text-sm" style={{ color: C.blue, fontFamily: F.head }}>
          {msg.sender_name}
        </span>
        <span className="text-[10px] text-slate-400">{timeAgo(msg.created_at)}</span>
      </div>
      <p className="text-[11px] font-semibold text-slate-500 mb-0.5">{msg.shift_title}</p>
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{msg.content}</p>
    </div>

    {!msg.is_read && (
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
        style={{ background: C.teal }}
      />
    )}
  </motion.button>
);

// ─── Chat View ────────────────────────────────────────────────────────────────
const ChatView = ({ msg, replies, apiBase, managerId, onBack }) => {
  const [thread, setThread] = useState([]);
  const [threadLoading, setThreadLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  // Fetch the full thread on mount
  useEffect(() => {
    if (!msg || !managerId) return;
    setThreadLoading(true);
    fetch(`${apiBase}/api/messages/thread/${msg.shift_id}/${managerId}/${msg.sender_id}`)
      .then((r) => r.json())
      .then((data) => setThread(Array.isArray(data) ? data : []))
      .catch(() => setThread([{ ...msg, sender_id: msg.sender_id }]))
      .finally(() => setThreadLoading(false));
  }, [msg.id]);

  // Auto-scroll to bottom when thread changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  const handleSend = async (reply) => {
    if (sending) return;
    setSending(true);

    // Optimistic append
    const optimistic = {
      id: `optimistic-${Date.now()}`,
      shift_id: msg.shift_id,
      sender_id: managerId,
      receiver_id: msg.sender_id,
      content: reply.content,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setThread((prev) => [...prev, optimistic]);

    try {
      await fetch(`${apiBase}/api/messages/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: managerId,
          receiver_id: msg.sender_id,
          shift_id: msg.shift_id,
          content: reply.content,
        }),
      });
    } catch {
      // Silently keep the optimistic bubble on network error
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* ── Scrollable chat area ─────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 pt-3"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Shift context chip */}
        <div className="flex justify-center mb-4">
          <span
            className="text-[10px] font-bold px-3 py-1 rounded-full"
            style={{ background: `${C.teal}12`, color: C.teal, fontFamily: F.mono }}
          >
            {msg.shift_title}
          </span>
        </div>

        {threadLoading ? (
          <div className="flex items-center justify-center py-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-7 h-7 rounded-full border-2 border-t-transparent"
              style={{ borderColor: `${C.teal}40`, borderTopColor: C.teal }}
            />
          </div>
        ) : (
          thread.map((m) => (
            <Bubble key={m.id} msg={m} isMe={m.sender_id === managerId} />
          ))
        )}
        {/* Sentinel — chat scrolls here on new message */}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Suggested reply chips (pinned bottom) ───────────────── */}
      <div
        className="flex-shrink-0 px-4 py-3"
        style={{ borderTop: "1px solid #F1F5F9" }}
      >
        <p
          className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2"
          style={{ fontFamily: F.mono }}
        >
          Quick Replies
        </p>
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {replies.map((r) => (
            <motion.button
              key={r.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleSend(r)}
              disabled={sending}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all"
              style={{
                background: `${C.teal}0F`,
                border: `1px solid ${C.teal}28`,
                color: C.teal,
                fontFamily: F.head,
                opacity: sending ? 0.6 : 1,
              }}
            >
              {r.content}
              <Send size={10} color={C.teal} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
const QuickInboxModal = ({ open, onClose, managerId, apiBase }) => {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  // Fetch messages + suggested replies whenever the modal opens
  useEffect(() => {
    if (!open || !managerId) return;
    setLoading(true);
    setSelectedMsg(null);

    Promise.all([
      fetch(`${apiBase}/api/messages/manager/${managerId}`).then((r) => r.json()),
      fetch(`${apiBase}/api/messages/suggested-replies/manager`).then((r) => r.json()),
    ])
      .then(([msgs, sugg]) => {
        setMessages(Array.isArray(msgs) ? msgs : []);
        setReplies(Array.isArray(sugg) ? sugg : []);
      })
      .catch(() => {
        setMessages([]);
        setReplies([]);
      })
      .finally(() => setLoading(false));
  }, [open, managerId]);

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const markAsRead = (msgId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, is_read: true } : m))
    );
  };

  const openMessage = (msg) => {
    // Optimistic read in list
    markAsRead(msg.id);
    // Persist to backend
    if (!msg.is_read) {
      fetch(`${apiBase}/api/messages/${msg.id}/read`, { method: "PUT" }).catch(() => {});
    }
    setSelectedMsg(msg);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            className="absolute inset-0 z-[80] bg-black/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[90] flex flex-col rounded-t-3xl overflow-hidden shadow-2xl"
            style={{ background: "var(--c-pearl)", height: "82vh" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 38 }}
          >
            {/* Drag handle */}
            <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mt-3 mb-1 flex-shrink-0" />

            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid #F1F5F9" }}
            >
              {selectedMsg ? (
                <button
                  onClick={() => setSelectedMsg(null)}
                  className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#F1F5F9" }}
                >
                  <ArrowLeft size={16} color={C.blue} />
                </button>
              ) : (
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${C.teal}12` }}
                >
                  <Inbox size={16} color={C.teal} />
                </div>
              )}

              <div className="flex-1">
                <h2
                  className="font-black text-base leading-tight"
                  style={{ color: C.blue, fontFamily: F.head }}
                >
                  {selectedMsg ? selectedMsg.sender_name : "Quick Inbox"}
                </h2>
                {selectedMsg ? (
                  <p className="text-[10px] text-slate-400">{selectedMsg.shift_title}</p>
                ) : unreadCount > 0 ? (
                  <p className="text-[10px] text-slate-400">{unreadCount} unread</p>
                ) : null}
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: "#F1F5F9" }}
              >
                <X size={16} color="#94A3B8" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-2 border-t-transparent"
                    style={{ borderColor: `${C.teal}40`, borderTopColor: C.teal }}
                  />
                </div>
              ) : selectedMsg ? (
                <ChatView
                  msg={selectedMsg}
                  replies={replies}
                  apiBase={apiBase}
                  managerId={managerId}
                  onBack={() => setSelectedMsg(null)}
                />
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 px-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `${C.teal}10` }}
                  >
                    <MessageCircle size={28} color={C.teal} />
                  </div>
                  <p className="font-black text-base" style={{ color: C.blue, fontFamily: F.head }}>
                    No messages yet
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    When technicians apply to your shifts, their intro messages will appear here.
                  </p>
                </div>
              ) : (
                <div
                  className="overflow-y-auto px-4 pt-3 pb-6 h-full"
                  style={{ scrollbarWidth: "none" }}
                >
                  {messages.map((m) => (
                    <MessageItem
                      key={m.id}
                      msg={m}
                      onSelect={openMessage}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickInboxModal;
