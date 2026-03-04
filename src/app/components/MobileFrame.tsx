import React from "react";
import { useApp } from "../context/AppContext";

interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  const { darkMode, isRTL } = useApp();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: darkMode ? "linear-gradient(135deg, #0A0B14 0%, #1A1030 50%, #0A0B14 100%)" : "linear-gradient(135deg, #E8E4F8 0%, #D4CCF0 50%, #E8E4F8 100%)" }}
    >
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />
      </div>

      {/* Phone frame on desktop */}
      <div
        className="relative w-full max-w-[390px] h-screen max-h-[844px] md:rounded-[48px] overflow-hidden shadow-2xl"
        style={{ boxShadow: "0 0 80px rgba(212, 175, 55, 0.2), 0 0 0 1px rgba(212,175,55,0.1)" }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Phone bezel (desktop only) */}
        <div className="absolute inset-0 pointer-events-none md:block hidden z-50"
          style={{ borderRadius: "48px", border: "1px solid rgba(212,175,55,0.2)" }} />

        {/* Content */}
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
