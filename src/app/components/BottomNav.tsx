import { useNavigate, useLocation } from "react-router";
import { useApp } from "../context/AppContext";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, theme, darkMode } = useApp();

  const navItems = [
    {
      label: t("home"),
      path: "/app/home",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2"
          stroke={active ? "#D4AF37" : theme.navIcon} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
            fill={active ? "rgba(212,175,55,0.15)" : "none"} />
          <path d="M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      label: t("stats"),
      path: "/app/analytics",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2"
          stroke={active ? "#D4AF37" : theme.navIcon} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="12" width="4" height="9" rx="1" fill={active ? "rgba(212,175,55,0.15)" : "none"} />
          <rect x="10" y="7" width="4" height="14" rx="1" fill={active ? "rgba(212,175,55,0.2)" : "none"} />
          <rect x="17" y="3" width="4" height="18" rx="1" fill={active ? "rgba(212,175,55,0.25)" : "none"} />
        </svg>
      ),
    },
    {
      label: "",
      path: "/app/qr",
      icon: (_active: boolean) => null, // QR center button
    },
    {
      label: t("cards"),
      path: "/app/cards",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2"
          stroke={active ? "#D4AF37" : theme.navIcon} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="3" fill={active ? "rgba(212,175,55,0.15)" : "none"} />
          <path d="M2 10h20" />
          <path d="M6 15h3" strokeWidth="2.5" />
          <path d="M12 15h2" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      label: t("profile"),
      path: "/app/profile",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2"
          stroke={active ? "#D4AF37" : theme.navIcon} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" fill={active ? "rgba(212,175,55,0.15)" : "none"} />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-around px-2 pb-2 pt-2 relative"
      style={{
        background: theme.navBg,
        borderTop: `1px solid rgba(212,175,55,0.1)`,
        backdropFilter: "blur(20px)",
      }}>
      {navItems.map((item, index) => {
        if (index === 2) {
          // QR Center Button
          return (
            <button key="qr" onClick={() => navigate("/app/qr")}
              className="flex flex-col items-center -mt-6 relative z-10">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.5)",
                }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0A0B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h2v2h-2z" fill="#0A0B14" />
                  <path d="M18 14h3" />
                  <path d="M14 18v3" />
                  <path d="M18 18h3v3h-3z" fill="#0A0B14" />
                </svg>
              </div>
              <span style={{ fontSize: "10px", color: "#D4AF37", marginTop: "2px", fontWeight: 600 }}>QR Pay</span>
            </button>
          );
        }

        const isActive = location.pathname === item.path;
        return (
          <button key={item.path} onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-0">
            {item.icon(isActive)}
            <span style={{
              fontSize: "10px",
              color: isActive ? "#D4AF37" : theme.navIcon,
              fontWeight: isActive ? 600 : 400,
              marginTop: "2px",
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
