import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";

// Simple QR code visual (pattern-based, not real QR)
function FakeQR({ data }: { data: string }) {
  const size = 5;
  // Generate deterministic pattern from data
  const pattern = Array(size).fill(0).map((_, r) =>
    Array(size).fill(0).map((_, c) => {
      const hash = (data.charCodeAt((r * size + c) % data.length) + r * 3 + c * 7) % 2;
      return hash === 0;
    })
  );

  // Fixed finder patterns (corners)
  const finder = [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]];
  const tr = [[0,size-3],[0,size-2],[0,size-1],[1,size-3],[1,size-1],[2,size-3],[2,size-2],[2,size-1]];
  const bl = [[size-3,0],[size-2,0],[size-1,0],[size-3,1],[size-1,1],[size-3,2],[size-2,2],[size-1,2]];

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)`, gap: "2px" }}>
      {Array(size).fill(0).map((_, r) =>
        Array(size).fill(0).map((_, c) => {
          const isFinder = finder.some(([fr,fc]) => fr===r && fc===c) ||
                           tr.some(([fr,fc]) => fr===r && fc===c) ||
                           bl.some(([fr,fc]) => fr===r && fc===c);
          const filled = isFinder ? true : pattern[r][c];
          return (
            <div key={`${r}-${c}`} style={{
              width: "18px", height: "18px", borderRadius: "2px",
              background: filled ? "#0A0B14" : "transparent",
            }} />
          );
        })
      )}
    </div>
  );
}

export default function RequestPage() {
  const navigate = useNavigate();
  const { user, t, theme } = useApp();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const paymentLink = `stouchi.tn/pay/${user?.phone?.replace(/\s/g, "")}?amount=${amount}&note=${encodeURIComponent(note)}`;

  const handleGenerate = () => {
    if (!amount) return;
    setGenerated(true);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: theme.bg }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>{t("requestMoney")}</h2>
      </div>

      <div className="flex-1 px-5 pb-6">
        {!generated ? (
          <>
            <p style={{ color: theme.textSecondary, fontSize: "14px", marginBottom: "24px" }}>
              Générez un QR code ou un lien de paiement à partager avec vos contacts.
            </p>

            <div className="space-y-4">
              <div>
                <label style={{ color: theme.textSecondary, fontSize: "13px", fontWeight: 600 }}>
                  {t("amount")}
                </label>
                <div className="mt-2 flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                  style={{ background: theme.inputBg, border: "1.5px solid rgba(212,175,55,0.3)" }}>
                  <span style={{ color: "#D4AF37", fontSize: "18px", fontWeight: 700 }}>TND</span>
                  <input
                    type="number"
                    placeholder={t("amountPlaceholder")}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                    style={{ color: theme.text, fontSize: "22px", fontWeight: 700 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: theme.textSecondary, fontSize: "13px", fontWeight: 600 }}>
                  {t("note")}
                </label>
                <div className="mt-2 px-4 py-3.5 rounded-2xl"
                  style={{ background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}` }}>
                  <input
                    type="text"
                    placeholder={t("notePlaceholder")}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    className="w-full bg-transparent outline-none"
                    style={{ color: theme.text, fontSize: "15px" }}
                  />
                </div>
              </div>

              <button onClick={handleGenerate}
                disabled={!amount}
                className="w-full py-4 rounded-2xl transition-all active:scale-95 mt-4"
                style={{
                  background: amount ? "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)" : "rgba(212,175,55,0.2)",
                  color: amount ? "#0A0B14" : theme.textMuted,
                  fontWeight: 700, fontSize: "16px",
                  boxShadow: amount ? "0 8px 30px rgba(212,175,55,0.4)" : "none",
                }}>
                Générer le QR Code
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center">
            {/* QR Card */}
            <div className="w-full rounded-3xl p-6 mb-6"
              style={{ background: theme.cardBg, border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="flex flex-col items-center">
                <p style={{ color: theme.textSecondary, fontSize: "13px", marginBottom: "4px" }}>
                  {user?.name}
                </p>
                <p style={{ color: "#D4AF37", fontSize: "28px", fontWeight: 800, marginBottom: "20px" }}>
                  {parseFloat(amount).toFixed(3)} TND
                </p>

                {/* QR Code */}
                <div className="p-4 rounded-2xl mb-4" style={{ background: "#F5E27A" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)", gap: "3px" }}>
                    {Array(11).fill(0).map((_, r) =>
                      Array(11).fill(0).map((_, c) => {
                        const seed = (r * 11 + c + paymentLink.charCodeAt((r + c) % paymentLink.length)) % 3;
                        const topLeft = r < 4 && c < 4 && !((r === 1 || r === 2) && (c === 1 || c === 2));
                        const topRight = r < 4 && c > 6 && !((r === 1 || r === 2) && (c === 8 || c === 9));
                        const botLeft = r > 6 && c < 4 && !((r === 8 || r === 9) && (c === 1 || c === 2));
                        const filled = topLeft || topRight || botLeft || seed === 0;
                        return (
                          <div key={`${r}-${c}`} style={{
                            width: "16px", height: "16px",
                            background: filled ? "#0A0B14" : "transparent",
                            borderRadius: "2px",
                          }} />
                        );
                      })
                    )}
                  </div>
                </div>

                <p style={{ color: theme.textMuted, fontSize: "12px", textAlign: "center" }}>
                  Scannez ce QR code avec l'app STOUCHI
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full mb-3">
              <button onClick={handleCopy}
                className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                style={{
                  background: copied ? "rgba(16,185,129,0.2)" : theme.cardBg,
                  border: copied ? "1px solid rgba(16,185,129,0.4)" : `1px solid ${theme.cardBorder}`,
                  color: copied ? "#10B981" : theme.text, fontWeight: 600, fontSize: "14px",
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {copied ? <path d="M5 13l4 4L19 7" /> : <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>}
                </svg>
                {copied ? "Copié !" : "Copier le lien"}
              </button>
              <button className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                  color: "#0A0B14", fontWeight: 700, fontSize: "14px",
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
                Partager
              </button>
            </div>

            <button onClick={() => setGenerated(false)}
              style={{ color: theme.textMuted, fontSize: "14px" }}>
              Modifier le montant
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}