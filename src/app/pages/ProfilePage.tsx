import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";
import stouchiLogo from "figma:asset/618e92cfa440e6180d320be5cb8afcf0debdc9bf.png";

interface ToggleProps {
  value: boolean;
  onChange: () => void;
}

function Toggle({ value, onChange }: ToggleProps) {
  return (
    <button onClick={onChange}
      className="relative transition-all flex-shrink-0"
      style={{ width: "46px", height: "26px" }}>
      <div className="absolute inset-0 rounded-full transition-all duration-300"
        style={{ background: value ? "#D4AF37" : "rgba(150,150,150,0.3)" }} />
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-1 w-5 h-5 rounded-full"
        style={{ background: "white", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />
    </button>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, t, theme, darkMode, toggleDarkMode, lang, setLang } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/onboarding");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.accountNumber || "TN59 0020 1000 0123 4567 8901");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const profileInitial = user?.name?.charAt(0)?.toUpperCase() || "G";

  return (
    <div className="flex flex-col h-full overflow-hidden relative"
      style={{ background: theme.bg }}>
      <StatusBar />

      <div className="px-5 pt-3 pb-4">
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>{t("profileTitle")}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Profile card */}
        <div className="rounded-3xl p-5"
          style={{
            background: theme.profileCardGrad,
            border: `1px solid rgba(212,175,55,0.2)`,
          }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)", boxShadow: "0 6px 20px rgba(212,175,55,0.3)" }}>
              <span style={{ color: "#0A0B14", fontSize: "26px", fontWeight: 800 }}>
                {profileInitial}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>{user?.name || "Ghayth Khezami"}</p>
              <p style={{ color: theme.textSecondary, fontSize: "13px" }}>{user?.phone}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
                <span style={{ color: "#10B981", fontSize: "12px", fontWeight: 600 }}>{t("verifiedAccount")}</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          {/* Account number */}
          <div className="mt-4 p-3 rounded-2xl flex items-center justify-between"
            style={{ background: "rgba(0,0,0,0.15)" }}>
            <div className="min-w-0 flex-1">
              <p style={{ color: theme.sectionLabel, fontSize: "11px", letterSpacing: "0.05em" }}>{t("accountNumber")}</p>
              <p style={{ color: theme.text, fontSize: "13px", fontFamily: "monospace", marginTop: "2px" }}>
                TN59 0020 •••• •••• 8901
              </p>
            </div>
            <button onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg ml-2 flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.2)", color: "#D4AF37", fontSize: "12px", fontWeight: 600 }}>
              {copied ? "✓" : t("copy")}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t("transactions"), value: "47", emoji: "🔄" },
            { label: t("savings"), value: "12%", emoji: "📈" },
            { label: t("points"), value: "1,240", emoji: "⭐" },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center py-4 rounded-2xl"
              style={{ background: theme.statsCard, border: `1px solid ${theme.cardBorder}` }}>
              <span style={{ fontSize: "20px", marginBottom: "4px" }}>{stat.emoji}</span>
              <p style={{ color: theme.text, fontSize: "16px", fontWeight: 700 }}>{stat.value}</p>
              <p style={{ color: theme.sectionLabel, fontSize: "11px" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Appearance (Dark Mode + Language) */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
          <p style={{ color: theme.sectionLabel, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", padding: "12px 16px 8px" }}>
            {t("appearance")}
          </p>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: `1px solid ${theme.divider}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: darkMode ? "rgba(212,175,55,0.15)" : "rgba(99,102,241,0.15)" }}>
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{t("darkMode")}</p>
              <p style={{ color: theme.sectionLabel, fontSize: "12px" }}>{t("darkModeDesc")}</p>
            </div>
            <Toggle value={darkMode} onChange={toggleDarkMode} />
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: `1px solid ${theme.divider}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
            </div>
            <div className="flex-1">
              <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{t("languageLabel")}</p>
              <p style={{ color: theme.sectionLabel, fontSize: "12px" }}>{t("languageDesc")}</p>
            </div>
            {/* Language switcher pill */}
            <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${theme.cardBorder}` }}>
              <button
                onClick={() => setLang("fr")}
                className="px-2.5 py-1.5 transition-all"
                style={{
                  background: lang === "fr" ? "#D4AF37" : "transparent",
                  color: lang === "fr" ? "#0A0B14" : theme.textSecondary,
                  fontSize: "11px", fontWeight: 600,
                }}>
                🇫🇷 FR
              </button>
              <button
                onClick={() => setLang("tn")}
                className="px-2.5 py-1.5 transition-all"
                style={{
                  background: lang === "tn" ? "#D4AF37" : "transparent",
                  color: lang === "tn" ? "#0A0B14" : theme.textSecondary,
                  fontSize: "11px", fontWeight: 600,
                }}>
                🇹🇳 تن
              </button>
            </div>
          </div>
        </div>

        {/* Security settings */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
          <p style={{ color: theme.sectionLabel, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", padding: "12px 16px 8px" }}>
            {t("security")}
          </p>
          {[
            {
              label: t("pushNotifications"),
              desc: t("txAlerts"),
              icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              ),
              toggle: true,
              value: notifications,
              onChange: () => setNotifications(!notifications),
            },
            {
              label: t("biometric"),
              desc: t("biometricDesc"),
              icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              ),
              toggle: true,
              value: biometric,
              onChange: () => setBiometric(!biometric),
            },
            {
              label: t("twoFA"),
              desc: t("twoFADesc"),
              icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                  <rect x="5" y="11" width="14" height="11" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                  <circle cx="12" cy="16" r="1" fill="#D4AF37" />
                </svg>
              ),
              toggle: true,
              value: twoFA,
              onChange: () => setTwoFA(!twoFA),
            },
            {
              label: t("changePin"),
              desc: t("changePinDesc"),
              icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ),
              toggle: false,
              action: () => navigate("/pin?mode=change"),
            },
          ].map((item, idx) => (
            <div key={item.label}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: `1px solid ${theme.divider}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.1)" }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{item.label}</p>
                <p style={{ color: theme.sectionLabel, fontSize: "12px" }}>{item.desc}</p>
              </div>
              {item.toggle ? (
                <Toggle value={item.value} onChange={item.onChange} />
              ) : (
                <button onClick={(item as any).action}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.sectionLabel} strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* More options */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
          {[
            {
              label: t("helpCenter"), desc: t("helpDesc"),
              icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" strokeWidth="3" /></svg>,
              color: "#3B82F6",
            },
            {
              label: t("termsTitle"), desc: t("termsDesc"),
              icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
              color: "#6B7280",
            },
            {
              label: t("shareApp"), desc: t("shareDesc"),
              icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
              color: "#10B981",
            },
          ].map((item, idx) => (
            <button key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 active:bg-white/5 transition-all"
              style={{ borderTop: idx > 0 ? `1px solid ${theme.divider}` : "none" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${item.color}18` }}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{item.label}</p>
                <p style={{ color: theme.sectionLabel, fontSize: "12px" }}>{item.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.sectionLabel} strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        {/* App version */}
        <div className="flex items-center justify-center gap-2 py-2">
          <img src={stouchiLogo} alt="Stouchi" className="h-7 w-auto object-contain" />
          <span style={{ color: theme.textMuted, fontSize: "12px" }}>{t("version")}</span>
        </div>

        {/* Logout button */}
        <button onClick={() => setShowLogoutModal(true)}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#EF4444", fontWeight: 600, fontSize: "15px",
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          {t("logout")}
        </button>
      </div>

      {/* Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 px-5"
            style={{ background: "rgba(0,0,0,0.7)" }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full rounded-3xl p-6"
              style={{ background: theme.bg === "#F2F0FA" ? "#fff" : "#131525", border: `1px solid ${theme.cardBorder}` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(239,68,68,0.15)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </div>
              <h3 style={{ color: theme.text, fontSize: "18px", fontWeight: 700, textAlign: "center" }}>
                {t("logoutQuestion")}
              </h3>
              <p style={{ color: theme.textSecondary, fontSize: "14px", textAlign: "center", marginTop: "8px" }}>
                {t("logoutConfirm")}
              </p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-4 rounded-2xl"
                  style={{ background: theme.cardBg, color: theme.text, fontWeight: 600, fontSize: "15px" }}>
                  {t("cancel")}
                </button>
                <button onClick={handleLogout}
                  className="flex-1 py-4 rounded-2xl"
                  style={{ background: "rgba(239,68,68,0.9)", color: "white", fontWeight: 700, fontSize: "15px" }}>
                  {t("confirm")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
