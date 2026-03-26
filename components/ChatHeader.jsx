import { ArrowLeft, Inbox, Phone, X } from "lucide-react";
import { motion } from "framer-motion";

const ChatHeader = ({ 
  selectedMsg, 
  onBack, 
  onClose, 
  onCall, 
  onTitleClick,
  unreadCount,
  C,
  F,
  title,
  subtitle 
}) => {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
      style={{ borderBottom: "1px solid #F1F5F9" }}
    >
      {selectedMsg ? (
        <button
          onClick={onBack}
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

      <div 
        className={`flex-1 ${selectedMsg ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
        onClick={selectedMsg ? onTitleClick : undefined}
      >
        <h2
          className="font-black text-base leading-tight"
          style={{ color: C.blue, fontFamily: F.head }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-[10px] text-slate-400">{subtitle}</p>
        )}
      </div>

      {/* Phone call button — only visible inside a thread */}
      {selectedMsg && (
        <button
          onClick={onCall}
          className="w-9 h-9 rounded-2xl flex items-center justify-center mr-1"
          style={{ background: `${C.teal}12`, border: `1px solid ${C.teal}25` }}
        >
          <Phone size={15} color={C.teal} />
        </button>
      )}

      <button
        onClick={onClose}
        className="w-9 h-9 rounded-2xl flex items-center justify-center"
        style={{ background: "#F1F5F9" }}
      >
        <X size={16} color="#94A3B8" />
      </button>
    </div>
  );
};

export default ChatHeader;
