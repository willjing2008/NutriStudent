import React, { useEffect, useState } from 'react';

export type CelebrationType = 'cook' | 'first_cook' | 'streak' | 'badge';

interface CelebrationOverlayProps {
  type: CelebrationType;
  message: string;
  subMessage?: string;
  icon?: string;
  onComplete: () => void;
  duration?: number;
}

const CONFETTI_COLORS = [
  '#22C55E', '#4ADE80', '#FCD34D', '#F97316',
  '#EF4444', '#8B5CF6', '#3B82F6', '#EC4899',
];

export function CelebrationOverlay({
  type,
  message,
  subMessage,
  icon,
  onComplete,
  duration = 2500,
}: CelebrationOverlayProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, duration);
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  const showConfetti = type === 'first_cook' || type === 'streak' || type === 'badge';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      {showConfetti && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}

      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                width: `${6 + Math.random() * 6}px`,
                height: `${6 + Math.random() * 6}px`,
                backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animationDelay: `${Math.random() * 0.8}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Celebration card */}
      <div className="relative animate-celebration-pop">
        <div className={`rounded-3xl p-8 flex flex-col items-center text-center max-w-[280px] ${
          showConfetti
            ? 'bg-[#1A1A1A] border-2 border-[#22C55E]/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]'
            : 'bg-[#1A1A1A]/90 border border-[#2D2D2D] shadow-lg'
        }`}>
          {icon && (
            <span className="text-5xl mb-3">{icon}</span>
          )}
          <h3 className={`font-bold text-white ${showConfetti ? 'text-xl' : 'text-lg'}`}>
            {message}
          </h3>
          {subMessage && (
            <p className="text-[#9CA3AF] text-sm mt-2">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
