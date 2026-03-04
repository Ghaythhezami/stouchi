import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";

export default function PINPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  const { login, pendingPhone, pendingName, t, theme } = useApp();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"create" | "confirm" | "success">("create");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const currentPin = step === "confirm" ? confirmPin : pin;
  const setCurrentPin = step === "confirm" ? setConfirmPin : setPin;

  const handlePad = (val: string) => {
    if (currentPin.length >= 6) return;
    const newPin = currentPin + val;
    setCurrentPin(newPin);
    setError("");

    if (newPin.length === 6) {
      setTimeout(() => {
        if (step === "create") {
          if (mode === "signin") {
            // For sign-in, any PIN works (demo mode)
            setStep("success");
            login(pendingPhone, pendingName || undefined);
            setTimeout(() => navigate("/app/home"), 1500);
          } else {
            setStep("confirm");
          }
        } else {
          // Confirm step
          if (newPin === pin) {
            setStep("success");
            login(pendingPhone, pendingName || undefined);
            setTimeout(() => navigate("/app/home"), 1500);
          } else {
            setError("Les PINs ne correspondent pas. Réessayez.");
            setShake(true);
            setConfirmPin("");
            setTimeout(() => setShake(false), 500);
          }
        }
      }, 200);
    }
  };

  const handleDelete = () => {
    if (currentPin.length > 0) {
      setCurrentPin(currentPin.slice(0, -1));
      setError("");
    }
  };

  const dots = Array(6).fill(0);

  return (
    <div className="flex flex-col h-full overflow-hidden"
      style={{ background: theme.bgGrad }}>
      <StatusBar />

      <div className="flex items-center px-5 pt-2 pb-4">
        {step === "confirm" && (
          <button onClick={() => { setStep("create"); setConfirmPin(""); setError(""); }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
            style={{ background: theme.backBtn }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 px-6 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 8px 30px rgba(16,185,129,0.4)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            ) : (
              <motion.div key="lock"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="11" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                  <circle cx="12" cy="16" r="1" fill="#D4AF37" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <h1 style={{ color: theme.text, fontSize: "22px", fontWeight: 700 }}>
            {step === "success" ? (mode === "signup" ? "PIN Créé ! 🎉" : "Connexion Réussie ! 🎉") :
              step === "create" ? (mode === "signup" ? t("pinCreate") : t("pinCreate")) :
                t("pinConfirm")}
          </h1>
          <p style={{ color: theme.textSecondary, fontSize: "14px", marginTop: "8px" }}>
            {step === "success" ? "Bienvenue sur STOUCHI !" :
              step === "create" ? (mode === "signup" ? t("pinCreateDesc") : t("pinCreateDesc")) :
                t("pinConfirmDesc")}
          </p>
        </div>

        {/* PIN dots */}
        <motion.div
          animate={{ x: shake ? [-8, 8, -8, 8, 0] : 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center gap-4 mb-6">
          {dots.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === currentPin.length - 1 && currentPin.length > 0 ? [1, 1.3, 1] : 1,
                background: i < currentPin.length ? "#D4AF37" : theme.inputBorder,
              }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 rounded-full"
            />
          ))}
        </motion.div>

        {error && (
          <p className="text-center mb-4" style={{ color: "#EF4444", fontSize: "13px" }}>{error}</p>
        )}

        {/* Step indicator - only show for signup */}
        {mode === "signup" && (
        <div className="flex justify-center gap-2 mb-6">
          {["create", "confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{
                background: (step === s || (step === "success")) ? "#D4AF37" : theme.cardBg,
              }}>
                <span style={{ fontSize: "11px", color: (step === s || step === "success") ? "#0A0B14" : theme.textMuted, fontWeight: 700 }}>
                  {i + 1}
                </span>
              </div>
              {i === 0 && <div className="w-8 h-0.5" style={{ background: step !== "create" ? "#D4AF37" : theme.cardBorder }} />}
            </div>
          ))}
        </div>
        )}

        {/* Numeric pad */}
        <div className="grid grid-cols-3 gap-3 px-2 mt-auto pb-8">
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((key, i) => (
            <button
              key={i}
              onClick={() => key === "⌫" ? handleDelete() : key ? handlePad(key) : null}
              disabled={step === "success"}
              className="py-5 rounded-2xl transition-all active:scale-90 flex flex-col items-center justify-center"
              style={{
                background: key ? theme.cardBg : "transparent",
                border: key && key !== "⌫" ? `1px solid ${theme.cardBorder}` : "none",
              }}>
              <span style={{
                color: key === "⌫" ? "#D4AF37" : theme.text,
                fontSize: key === "⌫" ? "22px" : "24px",
                fontWeight: 600,
                lineHeight: 1,
              }}>
                {key}
              </span>
              {/* Sub-letters for phone keypad */}
              {["2","3","4","5","6","7","8","9"].includes(key) && (
                <span style={{ fontSize: "9px", color: theme.textMuted, marginTop: "2px", letterSpacing: "0.1em" }}>
                  {{"2":"ABC","3":"DEF","4":"GHI","5":"JKL","6":"MNO","7":"PQRS","8":"TUV","9":"WXYZ"}[key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}