import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";

export default function OTPPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  const { pendingPhone, t, theme } = useApp();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(59);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    setError("");
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
    if (idx === 5 && val) {
      setTimeout(() => verifyOtp(newOtp), 100);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const verifyOtp = (otpArr?: string[]) => {
    const code = (otpArr || otp).join("");
    if (code.length < 6) { setError(t("otpTitle")); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => navigate("/pin?mode=" + mode), 800);
    }, 1200);
  };

  const handlePad = (val: string) => {
    const idx = otp.findIndex(v => !v);
    if (idx === -1) return;
    handleChange(idx, val);
  };

  const handlePadDelete = () => {
    const lastIdx = otp.map((v, i) => v ? i : -1).filter(i => i >= 0).pop();
    if (lastIdx === undefined) return;
    const newOtp = [...otp];
    newOtp[lastIdx] = "";
    setOtp(newOtp);
    inputs.current[lastIdx]?.focus();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden"
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

      <div className="flex-1 px-6 pb-6">
        {/* Header */}
        <div className="text-center mb-8">
          {verified ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 8px 30px rgba(16,185,129,0.4)" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          ) : (
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="3" />
              </svg>
            </div>
          )}

          <h1 style={{ color: theme.text, fontSize: "22px", fontWeight: 700 }}>
            {verified ? t("otpVerified") : t("otpTitle")}
          </h1>
          <p style={{ color: theme.textSecondary, fontSize: "14px", marginTop: "8px" }}>
            {verified ? t("otpRedirecting") : `${t("otpSentTo")} ${pendingPhone || "+216 XX XXX XXX"}`}
          </p>
          {!verified && (
            <p style={{ color: theme.textMuted, fontSize: "12px", marginTop: "4px" }}>
              {t("otpDemo")}
            </p>
          )}
        </div>

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((val, idx) => (
            <motion.input
              key={idx}
              ref={el => { inputs.current[idx] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              className="text-center outline-none"
              animate={{
                borderColor: val ? "#D4AF37" : theme.inputBorder,
                scale: val ? 1.05 : 1,
              }}
              style={{
                width: "44px",
                height: "54px",
                borderRadius: "14px",
                background: val ? "rgba(212,175,55,0.1)" : theme.inputBg,
                border: "2px solid",
                color: "#D4AF37",
                fontSize: "22px",
                fontWeight: 700,
              }}
            />
          ))}
        </div>

        {error && (
          <p className="text-center mb-4" style={{ color: "#EF4444", fontSize: "13px" }}>{error}</p>
        )}

        {/* Resend */}
        <div className="text-center mb-6">
          {timer > 0 ? (
            <p style={{ color: theme.textMuted, fontSize: "14px" }}>
              {t("resendIn")}{" "}
              <span style={{ color: "#D4AF37", fontWeight: 600 }}>00:{String(timer).padStart(2, "0")}</span>
            </p>
          ) : (
            <button onClick={() => setTimer(59)} style={{ color: "#D4AF37", fontSize: "14px", fontWeight: 600 }}>
              {t("resendOtp")}
            </button>
          )}
        </div>

        {/* Numeric pad */}
        <div className="grid grid-cols-3 gap-3 px-4">
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((key, i) => (
            <button
              key={i}
              onClick={() => key === "⌫" ? handlePadDelete() : key ? handlePad(key) : null}
              className="py-4 rounded-2xl transition-all active:scale-90 flex items-center justify-center"
              style={{
                background: key ? theme.cardBg : "transparent",
                color: theme.text,
                fontSize: key === "⌫" ? "20px" : "22px",
                fontWeight: 600,
                border: key ? `1px solid ${theme.cardBorder}` : "none",
              }}>
              {key}
            </button>
          ))}
        </div>

        {/* Verify button */}
        <button
          onClick={() => verifyOtp()}
          disabled={otp.join("").length < 6 || loading}
          className="w-full py-4 rounded-2xl mt-4 transition-all active:scale-95"
          style={{
            background: otp.join("").length >= 6
              ? "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)"
              : "rgba(212,175,55,0.2)",
            color: otp.join("").length >= 6 ? "#0A0B14" : theme.textMuted,
            fontWeight: 700,
            fontSize: "16px",
          }}>
          {loading ? t("verifying") : t("verify")}
        </button>
      </div>
    </div>
  );
}
