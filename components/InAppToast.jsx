import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';

const InAppToast = ({ title, body, onClose }) => {
  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.2, x: 120, y: -60 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '360px',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid rgba(13,148,136,0.18)',
          borderLeft: '4px solid #0D9488',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #0D9488, #0F766E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(13,148,136,0.35)',
          }}
        >
          <Bell size={18} color="white" />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 13,
              color: '#0F172A',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: 11.5,
              color: '#64748B',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {body}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            padding: '2px 4px',
            cursor: 'pointer',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={15} color="#94A3B8" />
        </button>
      </div>
    </motion.div>
  );
};

export default InAppToast;

