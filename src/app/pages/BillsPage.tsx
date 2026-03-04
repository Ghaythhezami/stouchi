import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";

const billCategories = [
  { id: "electricity", label: "Électricité (STEG)", emoji: "⚡", color: "#F59E0B", bg: "rgba(245,158,11,0.15)", desc: "Payez votre facture STEG" },
  { id: "water", label: "Eau (SONEDE)", emoji: "💧", color: "#06B6D4", bg: "rgba(6,182,212,0.15)", desc: "Payez votre facture SONEDE" },
  { id: "internet", label: "Internet", emoji: "🌐", color: "#3B82F6", bg: "rgba(59,130,246,0.15)", desc: "Topnet, Orange, Ooredoo..." },
  { id: "mobile", label: "Recharge Mobile", emoji: "📱", color: "#8B5CF6", bg: "rgba(139,92,246,0.15)", desc: "Ooredoo, Orange, Telecom" },
  { id: "tv", label: "TV par Satellite", emoji: "📺", color: "#EC4899", bg: "rgba(236,72,153,0.15)", desc: "Canal+, beIN Sports..." },
  { id: "gov", label: "Services Publics", emoji: "🏛️", color: "#10B981", bg: "rgba(16,185,129,0.15)", desc: "Impôts, amendes, taxes" },
  { id: "insurance", label: "Assurance", emoji: "🛡️", color: "#D97706", bg: "rgba(217,119,6,0.15)", desc: "GAT, STAR, Hayett..." },
  { id: "edu", label: "Éducation", emoji: "🎓", color: "#7C3AED", bg: "rgba(124,58,237,0.15)", desc: "Universités, formation..." },
];

type Step = "list" | "form" | "fetching" | "confirm" | "success";

interface Bill {
  customer: string;
  billId: string;
  amount: string;
  period: string;
  due: string;
}

export default function BillsPage() {
  const navigate = useNavigate();
  const { t, theme } = useApp();
  const [step, setStep] = useState<Step>("list");
  const [selectedService, setSelectedService] = useState<typeof billCategories[0] | null>(null);
  const [customerId, setCustomerId] = useState("");
  const [bill, setBill] = useState<Bill | null>(null);

  const mockBill: Bill = {
    customer: "Mohamed Ben Ali",
    billId: "TN-STEG-" + Math.floor(Math.random() * 900000 + 100000),
    amount: (Math.random() * 150 + 30).toFixed(3),
    period: "Février 2026",
    due: "31/03/2026",
  };

  const handleFetch = () => {
    if (!customerId) return;
    setStep("fetching");
    setTimeout(() => {
      setBill(mockBill);
      setStep("confirm");
    }, 1800);
  };

  const handlePay = () => {
    setStep("success");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <button
          onClick={() => step === "list" ? navigate(-1) : setStep("list")}
          className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>
          {step === "list" ? t("myBills") :
           step === "form" || step === "fetching" ? selectedService?.label :
           step === "confirm" ? "Confirmer le Paiement" : "Paiement Réussi"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "list" && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-5 pb-6">
              <p style={{ color: theme.textSecondary, fontSize: "14px", marginBottom: "20px" }}>
                Payez toutes vos factures sans vous déplacer
              </p>
              <div className="grid grid-cols-2 gap-3">
                {billCategories.map((cat) => (
                  <button key={cat.id}
                    onClick={() => { setSelectedService(cat); setStep("form"); setCustomerId(""); setBill(null); }}
                    className="flex flex-col items-start p-4 rounded-2xl active:scale-95 transition-all"
                    style={{ background: cat.bg, border: `1px solid ${cat.color}25` }}>
                    <span style={{ fontSize: "28px", marginBottom: "8px" }}>{cat.emoji}</span>
                    <p style={{ color: "white", fontSize: "13px", fontWeight: 700, lineHeight: 1.3 }}>{cat.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "2px" }}>{cat.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {(step === "form" || step === "fetching") && (
            <motion.div key="form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="px-5 pb-6">
              {/* Service card */}
              <div className="flex items-center gap-3 p-4 rounded-2xl mb-6"
                style={{ background: selectedService?.bg, border: `1px solid ${selectedService?.color}30` }}>
                <span style={{ fontSize: "28px" }}>{selectedService?.emoji}</span>
                <div>
                  <p style={{ color: "white", fontSize: "15px", fontWeight: 700 }}>{selectedService?.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{selectedService?.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>
                    Numéro de Client / Référence
                  </label>
                  <div className="mt-2 flex items-center gap-3 px-4 py-4 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Ex: 1234567890"
                      value={customerId}
                      onChange={e => setCustomerId(e.target.value)}
                      className="flex-1 bg-transparent outline-none"
                      style={{ color: "white", fontSize: "15px" }}
                    />
                  </div>
                </div>

                {step === "fetching" ? (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 rounded-full border-2"
                      style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                      Récupération de votre facture...
                    </p>
                  </div>
                ) : (
                  <button onClick={handleFetch}
                    disabled={!customerId}
                    className="w-full py-4 rounded-2xl transition-all active:scale-95"
                    style={{
                      background: customerId ? "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)" : "rgba(212,175,55,0.2)",
                      color: customerId ? "#0A0B14" : "rgba(255,255,255,0.3)",
                      fontWeight: 700, fontSize: "16px",
                    }}>
                    Récupérer la Facture
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {step === "confirm" && bill && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="px-5 pb-6">
              <div className="rounded-3xl p-5 mb-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "16px" }}>
                  DÉTAILS DE LA FACTURE
                </p>

                <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontSize: "28px" }}>{selectedService?.emoji}</span>
                  <div>
                    <p style={{ color: "white", fontSize: "15px", fontWeight: 700 }}>{selectedService?.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{bill.customer}</p>
                  </div>
                </div>

                {[
                  { label: "Réf. Facture", value: bill.billId },
                  { label: "Période", value: bill.period },
                  { label: "Échéance", value: bill.due },
                  { label: "Montant", value: `${bill.amount} TND`, highlight: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center py-2">
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{row.label}</span>
                    <span style={{
                      color: row.highlight ? "#D4AF37" : "white",
                      fontSize: row.highlight ? "18px" : "14px",
                      fontWeight: row.highlight ? 800 : 500,
                    }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <button onClick={handlePay}
                className="w-full py-4 rounded-2xl transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                  color: "#0A0B14", fontWeight: 700, fontSize: "16px",
                  boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
                }}>
                Payer {bill.amount} TND
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center px-5 pb-10 pt-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 16px 50px rgba(16,185,129,0.4)" }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h2 style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>Facture Payée ! 🎉</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "8px", textAlign: "center" }}>
                Votre facture {selectedService?.label} a été réglée avec succès
              </p>

              <div className="rounded-2xl p-5 mt-6 w-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex justify-between mb-2">
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Montant payé</span>
                  <span style={{ color: "#10B981", fontSize: "20px", fontWeight: 800 }}>{bill?.amount} TND</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Réf.</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontFamily: "monospace" }}>
                    STU{Date.now().toString().slice(-8)}
                  </span>
                </div>
              </div>

              <button onClick={() => navigate("/app/home")}
                className="w-full py-4 rounded-2xl mt-6 transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                  color: "#0A0B14", fontWeight: 700, fontSize: "16px",
                }}>
                Retour à l'Accueil
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}