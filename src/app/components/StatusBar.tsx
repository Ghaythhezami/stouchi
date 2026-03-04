import { useApp } from "../context/AppContext";

export function StatusBar() {
  const { theme } = useApp();
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1"
      style={{ fontSize: "12px", fontWeight: 600, color: theme.text }}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.4" />
        </svg>
        {/* WiFi */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor">
          <path d="M7.5 9.5a1 1 0 100 2 1 1 0 000-2z"/>
          <path d="M4.5 7.2a4.5 4.5 0 016 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M1.5 4.2a8.5 8.5 0 0112 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center">
          <div className="relative w-6 h-3 rounded-sm border border-current flex items-center px-0.5">
            <div className="bg-current h-1.5 rounded-xs" style={{ width: "75%" }} />
          </div>
          <div className="w-0.5 h-1.5 bg-current rounded-full ml-0.5 opacity-50" />
        </div>
      </div>
    </div>
  );
}