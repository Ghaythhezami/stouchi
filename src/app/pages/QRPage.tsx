import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";

export default function QRPage() {
  const navigate = useNavigate();
  const { t, theme } = useApp();
  const [scanAngle, setScanAngle] = useState(0);
  const [mode, setMode] = useState<"scan" | "manual">("scan");
  const [manualCode, setManualCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle(prev => (prev + 2) % 100);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDetected(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>{t("qrScan")}</h2>
        <button className="ml-auto w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" />
          </svg>
        </button>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 mx-5 mb-4 p-1 rounded-2xl" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
        <button onClick={() => setMode("scan")}
          className="flex-1 py-2.5 rounded-xl transition-all"
          style={{
            background: mode === "scan" ? "rgba(212,175,55,0.25)" : "transparent",
            color: mode === "scan" ? "#D4AF37" : theme.navIcon,
            fontWeight: 600, fontSize: "14px",
          }}>
          📷 Scanner
        </button>
        <button onClick={() => setMode("manual")}
          className="flex-1 py-2.5 rounded-xl transition-all"
          style={{
            background: mode === "manual" ? "rgba(212,175,55,0.25)" : "transparent",
            color: mode === "manual" ? "#D4AF37" : theme.navIcon,
            fontWeight: 600, fontSize: "14px",
          }}>
          ⌨️ Manuel
        </button>
      </div>

      {mode === "scan" ? (
        <div className="flex-1 flex flex-col items-center px-5 pb-6">
          {/* Camera viewfinder */}
          <div className="relative w-full max-w-xs" style={{ aspectRatio: "1" }}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{ background: "rgba(0,0,0,0.8)" }}>
              <div className="absolute inset-0"
                style={{
                  background: detected
                    ? "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))"
                    : "linear-gradient(180deg, #1a1a2e, #16213e)",
                }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="absolute" style={{
                    left: `${(i + 1) * 20}%`, top: 0, bottom: 0,
                    width: "1px", background: "rgba(255,255,255,0.05)"
                  }} />
                ))}
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="absolute" style={{
                    top: `${(i + 1) * 20}%`, left: 0, right: 0,
                    height: "1px", background: "rgba(255,255,255,0.05)"
                  }} />
                ))}
              </div>

              <div className="absolute inset-8">
                {[
                  { top: 0, left: 0, borderTop: "3px solid #D4AF37", borderLeft: "3px solid #D4AF37" },
                  { top: 0, right: 0, borderTop: "3px solid #D4AF37", borderRight: "3px solid #D4AF37" },
                  { bottom: 0, left: 0, borderBottom: "3px solid #D4AF37", borderLeft: "3px solid #D4AF37" },
                  { bottom: 0, right: 0, borderBottom: "3px solid #D4AF37", borderRight: "3px solid #D4AF37" },
                ].map((style, i) => (
                  <div key={i} className="absolute w-8 h-8" style={{ ...style, borderRadius: "2px" }} />
                ))}

                {!detected && (
                  <motion.div
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
                )}

                {detected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(16,185,129,0.9)" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p style={{ color: theme.textSecondary, fontSize: "14px" }}>
              {detected ? "QR Code détecté !" :
               scanning ? "Analyse en cours..." :
               "Placez le QR Code dans le cadre pour scanner"}
            </p>
            {!detected && !scanning && (
              <p style={{ color: theme.textMuted, fontSize: "12px", marginTop: "4px" }}>
                Le code est détecté automatiquement
              </p>
            )}
          </div>

          {!detected ? (
            <button onClick={handleSimulateScan}
              className="mt-6 px-8 py-4 rounded-2xl transition-all active:scale-95"
              style={{
                background: scanning ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                color: scanning ? theme.textMuted : "#0A0B14",
                fontWeight: 700, fontSize: "15px",
              }}
              disabled={scanning}>
              {scanning ? "Scan en cours..." : "🔍 Simuler un Scan"}
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 w-full">
              <div className="rounded-2xl p-4 mb-4"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <p style={{ color: "#10B981", fontSize: "14px", fontWeight: 600 }}>QR Code Validé</p>
                <p style={{ color: theme.textSecondary, fontSize: "12px", marginTop: "2px" }}>
                  Paiement à: STOUCHI Merchant
                </p>
                <p style={{ color: theme.text, fontSize: "20px", fontWeight: 800, marginTop: "4px" }}>35.000 TND</p>
              </div>
              <button onClick={() => navigate("/app/home")}
                className="w-full py-4 rounded-2xl transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                  color: "#0A0B14", fontWeight: 700, fontSize: "16px",
                }}>
                Confirmer le Paiement
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex-1 px-5 pb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z" />
              </svg>
            </div>
            <p style={{ color: theme.textSecondary, fontSize: "14px", textAlign: "center" }}>
              Entrez manuellement le code de paiement
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-4 rounded-2xl mb-4"
            style={{ background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}` }}>
            <input
              type="text"
              placeholder="Code de paiement..."
              value={manualCode}
              onChange={e => setManualCode(e.target.value.toUpperCase())}
              className="flex-1 bg-transparent outline-none"
              style={{ color: theme.text, fontSize: "16px", letterSpacing: "0.1em", fontFamily: "monospace" }}
            />
          </div>

          <button
            disabled={!manualCode}
            className="w-full py-4 rounded-2xl transition-all active:scale-95"
            style={{
              background: manualCode ? "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)" : "rgba(212,175,55,0.2)",
              color: manualCode ? "#0A0B14" : theme.textMuted,
              fontWeight: 700, fontSize: "16px",
            }}>
            Valider le Code
          </button>
        </div>
      )}
    </div>
  );
}