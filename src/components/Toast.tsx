import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'reward';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-modal">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold max-w-sm ${
        type === 'reward'
          ? 'bg-[#a93712] text-white border-[#fe744b]'
          : type === 'info'
          ? 'bg-[#004634] text-white border-[#1f5e4a]'
          : 'bg-[#004634] text-white border-[#97d5bc]'
      }`}>
        <span className="material-symbols-outlined text-xl text-[#fe744b]">
          {type === 'reward' ? 'stars' : type === 'info' ? 'info' : 'check_circle'}
        </span>
        <span className="flex-1 text-xs">{message}</span>
        <button onClick={onClose} className="hover:opacity-80">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};
