import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";
import stouchiLogo from "figma:asset/618e92cfa440e6180d320be5cb8afcf0debdc9bf.png";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setPendingPhone, setPendingName, t, theme } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) { setError("Veuillez entrer votre nom."); return; }
    if (phone.length < 8) { setError("Numéro de téléphone invalide."); return; }
    setPendingPhone("+216 " + phone);
    setPendingName(name);
    navigate("/otp?mode=signup");
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto"
      style={{ background: theme.bgGrad }}>
      <StatusBar />

      {/* Header */}
      <div className="flex items-center px-5 pt-2 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 px-6 pb-8">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <img src={stouchiLogo} alt="STOUCHI" className="h-16 w-auto object-contain mb-4" />
          <h1 style={{ color: theme.text, fontSize: "24px", fontWeight: 700 }}>{t("signUpTitle")}</h1>
          <p style={{ color: theme.textSecondary, fontSize: "14px", marginTop: "6px", textAlign: "center" }}>
            {t("signUpSub")}
          </p>
        </div>

        {/* Decorative banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-4 mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
            border: "1px solid rgba(212,175,55,0.2)",
          }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(212,175,55,0.2)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p style={{ color: "#D4AF37", fontSize: "13px", fontWeight: 600 }}>Compte vérifié & sécurisé</p>
              <p style={{ color: theme.textSecondary, fontSize: "12px" }}>Vos données sont protégées</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name field */}
          <div>
            <label style={{ color: theme.textSecondary, fontSize: "13px", fontWeight: 600 }}>
              {t("fullName")}
            </label>
            <div className="mt-2 flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <input
                type="text"
                placeholder={t("fullNamePlaceholder")}
                value={name}
                onChange={e => { setName(e.target.value); setError(""); }}
                className="flex-1 bg-transparent outline-none"
                style={{ color: theme.text, fontSize: "15px" }}
              />
            </div>
          </div>

          {/* Phone field */}
          <div>
            <label style={{ color: theme.textSecondary, fontSize: "13px", fontWeight: 600 }}>
              {t("phoneNumber")}
            </label>
            <div className="mt-2 flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}` }}>
              <div className="flex items-center gap-1.5 pr-3" style={{ borderRight: `1px solid ${theme.divider}` }}>
                <span style={{ fontSize: "16px" }}>🇹🇳</span>
                <span style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>+216</span>
              </div>
              <input
                type="tel"
                placeholder="XX XXX XXX"
                value={phone}
                onChange={e => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 8)); setError(""); }}
                className="flex-1 bg-transparent outline-none"
                style={{ color: theme.text, fontSize: "15px", letterSpacing: "0.05em" }}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "#EF4444", fontSize: "13px" }}>{error}</p>
          )}

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                color: "#0A0B14",
                fontWeight: 700,
                fontSize: "16px",
                boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
              }}>
              {t("receiveOtp")}
            </button>
          </div>
        </div>

        <p className="text-center mt-6" style={{ color: theme.textMuted, fontSize: "14px" }}>
          {t("alreadyAccount")}{" "}
          <button onClick={() => navigate("/signin")} style={{ color: "#D4AF37", fontWeight: 600 }}>
            {t("connectNow")}
          </button>
        </p>
      </div>
    </div>
  );
}
