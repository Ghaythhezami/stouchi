import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";
import stouchiLogo from "figma:asset/618e92cfa440e6180d320be5cb8afcf0debdc9bf.png";

const typeColors: Record<string, string> = {
  received: "#10B981",
  topup: "#3B82F6",
  sent: "#EF4444",
  payment: "#F59E0B",
};

export default function HomePage() {
  const navigate = useNavigate();
  const { user, transactions, t, theme, darkMode } = useApp();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const recentTxs = transactions.slice(0, 5);

  const quickActions = [
    {
      label: t("send"),
      path: "/app/send",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
      ),
      color: "#7C3AED",
    },
    {
      label: t("receive"),
      path: "/app/request",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v14M5 9l7 7 7-7" /><path d="M3 20h18" />
        </svg>
      ),
      color: "#059669",
    },
    {
      label: t("bills"),
      path: "/app/bills",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
      color: "#D97706",
    },
    {
      label: "QR Pay",
      path: "/app/qr",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z" />
        </svg>
      ),
      color: "#D4AF37",
    },
  ];

  const services = [
    { label: t("internet"), emoji: "🌐", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
    { label: t("electricity"), emoji: "⚡", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
    { label: t("voucher"), emoji: "🎟️", color: "#8B5CF6", bg: "rgba(139,92,246,0.15)" },
    { label: t("insurance"), emoji: "🛡️", color: "#10B981", bg: "rgba(16,185,129,0.15)" },
    { label: t("mcard"), emoji: "💳", color: "#EC4899", bg: "rgba(236,72,153,0.15)" },
    { label: t("water"), emoji: "💧", color: "#06B6D4", bg: "rgba(6,182,212,0.15)" },
    { label: t("commerce"), emoji: "🏪", color: "#F97316", bg: "rgba(249,115,22,0.15)" },
    { label: t("more"), emoji: "⊞", color: "#6B7280", bg: "rgba(107,114,128,0.15)" },
  ];

  // Header gradient adapts to mode
  const headerBg = darkMode
    ? "linear-gradient(180deg, #1A0D35 0%, #130D22 70%, transparent 100%)"
    : "linear-gradient(180deg, #EDE6FF 0%, #E4D9FF 70%, transparent 100%)";

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: theme.bg }}>
      {/* Header / Balance Card */}
      <div className="pb-6"
        style={{ background: headerBg, borderRadius: "0 0 32px 32px" }}>
        <StatusBar />

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ color: "#0A0B14", fontWeight: 700, fontSize: "16px" }}>
                  {user?.name?.charAt(0) || "G"}
                </span>
              </div>
            </div>
            <div>
              <p style={{ color: theme.textSecondary, fontSize: "12px" }}>{t("hello")}</p>
              <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>
                {user?.name || "Ghayth Khezami"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: theme.backBtn }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
            <img src={stouchiLogo} alt="Stouchi" className="h-8 w-auto object-contain" />
          </div>
        </div>

        {/* Balance */}
        <div className="text-center px-6">
          <p style={{ color: theme.textSecondary, fontSize: "13px" }}>{t("availableBalance")}</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <h1 style={{ color: theme.text, fontSize: "38px", fontWeight: 800, letterSpacing: "-1px" }}>
              {balanceVisible ? `${user?.balance?.toLocaleString("fr-TN", { minimumFractionDigits: 2 })} TND` : "•••• TND"}
            </h1>
            <button onClick={() => setBalanceVisible(!balanceVisible)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {balanceVisible
                  ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                  : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><path d="M1 1l22 22" /></>
                }
              </svg>
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex justify-around mt-6 px-2">
            {quickActions.map((action) => (
              <button key={action.label} onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-all">
                <div className="rounded-2xl flex items-center justify-center"
                  style={{
                    width: "52px", height: "52px",
                    background: action.color,
                    boxShadow: `0 6px 20px ${action.color}40`,
                  }}>
                  {action.icon}
                </div>
                <span style={{ color: theme.textSecondary, fontSize: "11px", fontWeight: 500 }}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        {/* Services */}
        <div className="mt-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: theme.text, fontSize: "16px", fontWeight: 700 }}>{t("services")}</h3>
            <button onClick={() => navigate("/app/bills")} style={{ color: "#D4AF37", fontSize: "13px", fontWeight: 600 }}>
              {t("viewAll")}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {services.map((s) => (
              <button key={s.label} onClick={() => navigate("/app/bills")}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                  <span style={{ fontSize: "22px" }}>{s.emoji}</span>
                </div>
                <span style={{ color: theme.textSecondary, fontSize: "10px", textAlign: "center", lineHeight: 1.3 }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-4 mb-4 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #4C1D95, #7C3AED)",
            boxShadow: "0 8px 30px rgba(124,58,237,0.3)",
          }}>
          <div className="absolute right-0 top-0 bottom-0 flex items-center opacity-20">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="rgba(255,255,255,0.3)">
              <circle cx="80" cy="20" r="60" />
            </svg>
          </div>
          <div className="relative">
            <span className="inline-block px-2 py-0.5 rounded-full mb-2"
              style={{ background: "rgba(212,175,55,0.3)", color: "#D4AF37", fontSize: "11px", fontWeight: 600 }}>
              {t("promoLabel")}
            </span>
            <p style={{ color: "white", fontSize: "15px", fontWeight: 700, lineHeight: 1.3 }}>
              {t("promoTitle")}
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginTop: "4px" }}>
              {t("promoSub")}
            </p>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ color: theme.text, fontSize: "16px", fontWeight: 700 }}>{t("recentTransactions")}</h3>
            <button onClick={() => navigate("/app/analytics")} style={{ color: "#D4AF37", fontSize: "13px", fontWeight: 600 }}>
              {t("viewAll")}
            </button>
          </div>

          <div className="space-y-3">
            {recentTxs.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>

                {/* Icon */}
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${typeColors[tx.type]}15`,
                    border: `1px solid ${typeColors[tx.type]}30`,
                  }}>
                  {tx.type === "received" || tx.type === "topup" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={typeColors[tx.type]} strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v14M5 9l7 7 7-7" />
                    </svg>
                  ) : tx.type === "sent" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={typeColors[tx.type]} strokeWidth="2.5" strokeLinecap="round">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={typeColors[tx.type]} strokeWidth="2.5" strokeLinecap="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }} className="truncate">
                    {tx.name}
                  </p>
                  <p style={{ color: theme.textMuted, fontSize: "12px" }}>{tx.date}</p>
                </div>

                <div className="text-right">
                  <p style={{
                    color: tx.amount > 0 ? "#10B981" : theme.text,
                    fontSize: "15px",
                    fontWeight: 700,
                  }}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-TN", { minimumFractionDigits: 2 })} TND
                  </p>
                  <p style={{ color: theme.textMuted, fontSize: "11px" }}>{tx.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
