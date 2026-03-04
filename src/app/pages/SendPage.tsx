import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";

const contacts = [
  { name: "Mohamed Kamel", phone: "+216 92 123 456", initial: "M" },
  { name: "Sana Mejri", phone: "+216 55 234 567", initial: "S" },
  { name: "Anis Belhadj", phone: "+216 27 345 678", initial: "A" },
  { name: "Hayet Trabelsi", phone: "+216 98 456 789", initial: "H" },
  { name: "Walid Ben Salem", phone: "+216 52 567 890", initial: "W" },
  { name: "Rania Chaabane", phone: "+216 24 678 901", initial: "R" },
];

const initColors = ["#7C3AED", "#059669", "#D97706", "#DC2626", "#2563EB", "#EC4899"];

type Step = "contact" | "amount" | "confirm" | "success";

export default function SendPage() {
  const navigate = useNavigate();
  const { sendMoney, t, theme } = useApp();
  const [step, setStep] = useState<Step>("contact");
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAmount = (key: string) => {
    if (key === "⌫") {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === "." && amount.includes(".")) {
      return;
    } else if (amount.split(".")[1]?.length >= 2) {
      return;
    } else {
      setAmount(prev => prev + key);
    }
  };

  const handleSend = () => {
    if (!selectedContact || !amount) return;
    const success = sendMoney(parseFloat(amount), selectedContact.name);
    if (success) {
      setStep("success");
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden"
      style={{ background: theme.bg }}>
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <button onClick={() => step === "contact" ? navigate(-1) : setStep(s => s === "amount" ? "contact" : s === "confirm" ? "amount" : "contact")}
          className="w-10 h-10 rounded-2xl flex items-center justify-center active:scale-95"
          style={{ background: theme.backBtn }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.backBtnIcon} strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>
          {step === "contact" ? t("sendMoney") :
            step === "amount" ? t("amount") :
            step === "confirm" ? "Confirmation" : t("sendSuccess")}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Contact */}
        {step === "contact" && (
          <motion.div key="contact" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            className="flex-1 overflow-y-auto px-5">
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4"
              style={{ background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder={t("recipientPlaceholder")}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                style={{ color: theme.text, fontSize: "14px" }}
              />
            </div>

            <p style={{ color: theme.sectionLabel, fontSize: "12px", fontWeight: 600, marginBottom: "12px", letterSpacing: "0.05em" }}>
              CONTACTS RÉCENTS
            </p>

            <div className="space-y-2">
              {filtered.map((c, i) => (
                <button key={c.name} onClick={() => { setSelectedContact(c); setStep("amount"); }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl active:scale-98 transition-all"
                  style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: initColors[i % initColors.length] }}>
                    <span style={{ color: "white", fontSize: "16px", fontWeight: 700 }}>{c.initial}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{c.name}</p>
                    <p style={{ color: theme.textSecondary, fontSize: "12px" }}>{c.phone}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.sectionLabel} strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Amount */}
        {step === "amount" && (
          <motion.div key="amount" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            className="flex-1 flex flex-col overflow-hidden px-5">
            {/* Contact pill */}
            {selectedContact && (
              <div className="flex items-center gap-3 p-3 rounded-2xl mb-4"
                style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: initColors[contacts.indexOf(selectedContact) % initColors.length] }}>
                  <span style={{ color: "white", fontWeight: 700 }}>{selectedContact.initial}</span>
                </div>
                <div>
                  <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{selectedContact.name}</p>
                  <p style={{ color: theme.textSecondary, fontSize: "12px" }}>{selectedContact.phone}</p>
                </div>
              </div>
            )}

            {/* Amount display */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <p style={{ color: theme.textSecondary, fontSize: "13px", marginBottom: "8px" }}>{t("amount")}</p>
              <div className="flex items-baseline gap-2">
                <span style={{ color: theme.text, fontSize: "48px", fontWeight: 800, letterSpacing: "-2px", minWidth: "60px", textAlign: "right" }}>
                  {amount || "0"}
                </span>
                <span style={{ color: "#D4AF37", fontSize: "22px", fontWeight: 600 }}>TND</span>
              </div>

              {/* Note field */}
              <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-xl"
                style={{ background: theme.inputBg, border: `1px solid ${theme.inputBorder}` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <input
                  type="text"
                  placeholder={t("notePlaceholder")}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="bg-transparent outline-none"
                  style={{ color: theme.textSecondary, fontSize: "13px", width: "200px" }}
                />
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 mt-3">
                {["10","20","50","100"].map(q => (
                  <button key={q} onClick={() => setAmount(q)}
                    className="px-3 py-1.5 rounded-xl active:scale-95 transition-all"
                    style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37", fontSize: "13px", fontWeight: 600 }}>
                    +{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {["1","2","3","4","5","6","7","8","9",".","0","⌫"].map((k) => (
                <button key={k} onClick={() => handleAmount(k)}
                  className="py-4 rounded-2xl flex items-center justify-center active:scale-90 transition-all"
                  style={{
                    background: k === "⌫" ? "rgba(212,175,55,0.1)" : theme.cardBg,
                    border: `1px solid ${theme.cardBorder}`,
                    color: k === "⌫" ? "#D4AF37" : theme.text,
                    fontSize: "22px",
                    fontWeight: 600,
                  }}>
                  {k}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("confirm")}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-4 rounded-2xl mb-4 transition-all active:scale-95"
              style={{
                background: amount && parseFloat(amount) > 0
                  ? "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)"
                  : "rgba(212,175,55,0.2)",
                color: amount && parseFloat(amount) > 0 ? "#0A0B14" : theme.textMuted,
                fontWeight: 700, fontSize: "16px",
              }}>
              Continuer
            </button>
          </motion.div>
        )}

        {/* STEP 3: Confirm */}
        {step === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            className="flex-1 overflow-y-auto px-5 pb-6">
            <div className="rounded-3xl p-5 mb-4"
              style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
              <p style={{ color: theme.sectionLabel, fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "16px" }}>
                DÉTAILS DU TRANSFERT
              </p>

              <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: `1px solid ${theme.divider}` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: initColors[contacts.indexOf(selectedContact!) % initColors.length] }}>
                  <span style={{ color: "white", fontSize: "18px", fontWeight: 700 }}>{selectedContact?.initial}</span>
                </div>
                <div>
                  <p style={{ color: theme.text, fontSize: "15px", fontWeight: 700 }}>{selectedContact?.name}</p>
                  <p style={{ color: theme.textSecondary, fontSize: "13px" }}>{selectedContact?.phone}</p>
                </div>
              </div>

              {[
                { label: "Montant", value: `${parseFloat(amount).toFixed(2)} TND` },
                { label: "Frais", value: "0.000 TND" },
                { label: "Note", value: note || "-" },
                { label: "Date", value: "Maintenant" },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-2">
                  <span style={{ color: theme.textSecondary, fontSize: "14px" }}>{row.label}</span>
                  <span style={{ color: row.label === "Montant" ? "#D4AF37" : theme.text, fontSize: "14px", fontWeight: row.label === "Montant" ? 700 : 500 }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div className="mt-4 pt-4 flex justify-between items-center" style={{ borderTop: `1px solid ${theme.divider}` }}>
                <span style={{ color: theme.textSecondary, fontSize: "15px", fontWeight: 600 }}>Total</span>
                <span style={{ color: theme.text, fontSize: "20px", fontWeight: 800 }}>{parseFloat(amount).toFixed(2)} TND</span>
              </div>
            </div>

            <button onClick={handleSend}
              className="w-full py-4 rounded-2xl transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
                color: "#0A0B14", fontWeight: 700, fontSize: "16px",
                boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
              }}>
              {t("sendNow")}
            </button>
          </motion.div>
        )}

        {/* STEP 4: Success */}
        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-5 pb-10">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 16px 50px rgba(16,185,129,0.4)" }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 style={{ color: theme.text, fontSize: "24px", fontWeight: 800 }}>Transfert Réussi !</h2>
            <p style={{ color: theme.textSecondary, fontSize: "14px", marginTop: "8px", textAlign: "center" }}>
              Votre argent a été envoyé avec succès à {selectedContact?.name}
            </p>

            <div className="rounded-2xl p-5 mt-6 w-full"
              style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
              <div className="flex justify-between mb-2">
                <span style={{ color: theme.textSecondary, fontSize: "13px" }}>Montant envoyé</span>
                <span style={{ color: "#10B981", fontSize: "20px", fontWeight: 800 }}>{parseFloat(amount).toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme.textSecondary, fontSize: "13px" }}>Réf.</span>
                <span style={{ color: theme.textSecondary, fontSize: "13px", fontFamily: "monospace" }}>
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
              {t("home")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}