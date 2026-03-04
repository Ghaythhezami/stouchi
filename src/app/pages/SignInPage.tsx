import { useState } from "react";
import { useNavigate } from "react-router";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";
import stouchiLogo from "figma:asset/618e92cfa440e6180d320be5cb8afcf0debdc9bf.png";

export default function SignInPage() {
  const navigate = useNavigate();
  const { setPendingPhone, t, theme } = useApp();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (phone.length < 8) { setError("Numéro de téléphone invalide."); return; }
    setPendingPhone("+216 " + phone);
    navigate("/otp?mode=signin");
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto"
      style={{ background: theme.bgGrad }}>
      <StatusBar />

      <div className="flex items-center px-5 pt-2 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 px-6 pb-8">
        <div className="flex flex-col items-center mb-10">
          <img src={stouchiLogo} alt="STOUCHI" className="h-16 w-auto object-contain mb-4" />
          <h1 style={{ color: theme.text, fontSize: "24px", fontWeight: 700 }}>{t("welcomeBack")}</h1>
          <p style={{ color: theme.textSecondary, fontSize: "14px", marginTop: "6px", textAlign: "center" }}>
            {t("enterPhoneDesc")}
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))", border: "1px solid rgba(212,175,55,0.2)" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" />
              <path d="M12 18h.01" strokeWidth="2.5" />
              <path d="M9 6h6" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label style={{ color: theme.textSecondary, fontSize: "13px", fontWeight: 600 }}>
              {t("phoneNumber")}
            </label>
            <div className="mt-2 flex items-center gap-3 px-4 py-4 rounded-2xl"
              style={{ background: theme.inputBg, border: "1.5px solid rgba(212,175,55,0.3)" }}>
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
                style={{ color: theme.text, fontSize: "16px", letterSpacing: "0.08em" }}
                autoFocus
              />
            </div>
          </div>

          {error && <p style={{ color: "#EF4444", fontSize: "13px" }}>{error}</p>}

          {/* Quick digits */}
          <div className="flex justify-center gap-2 pt-1 flex-wrap">
            {["1","2","3","4","5","6","7","8","9","0"].map(d => (
              <button key={d} onClick={() => setPhone(p => p.length < 8 ? p + d : p)}
                className="w-8 h-8 rounded-xl flex items-center justify-center active:scale-90 transition-all"
                style={{ background: theme.cardBg, color: theme.textSecondary, fontSize: "14px", border: `1px solid ${theme.cardBorder}` }}>
                {d}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl transition-all active:scale-95 mt-2"
            style={{
              background: phone.length >= 8
                ? "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)"
                : "rgba(212,175,55,0.3)",
              color: phone.length >= 8 ? "#0A0B14" : theme.textMuted,
              fontWeight: 700,
              fontSize: "16px",
              boxShadow: phone.length >= 8 ? "0 8px 30px rgba(212,175,55,0.4)" : "none",
              transition: "all 0.3s ease",
            }}>
            {t("sendOtp")}
          </button>
        </div>

        <p className="text-center mt-8" style={{ color: theme.textMuted, fontSize: "14px" }}>
          {t("noAccount")}{" "}
          <button onClick={() => navigate("/signup")} style={{ color: "#D4AF37", fontWeight: 600 }}>
            {t("register")}
          </button>
        </p>
      </div>
    </div>
  );
}
