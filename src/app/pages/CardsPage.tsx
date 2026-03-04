import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { VirtualCard } from "../components/VirtualCard";
import { useApp } from "../context/AppContext";

const userCards = [
  {
    id: "1",
    variant: "gold" as const,
    label: "Carte Principale",
    number: "4821",
    holder: "GHAYTH KHEZAMI",
    expiry: "12/28",
    balance: 1245.50,
    frozen: false,
  },
  {
    id: "2",
    variant: "platinum" as const,
    label: "Carte Secondaire",
    number: "7394",
    holder: "GHAYTH KHEZAMI",
    expiry: "09/27",
    balance: 250.00,
    frozen: false,
  },
  {
    id: "3",
    variant: "rosegold" as const,
    label: "Carte Business",
    number: "2156",
    holder: "STOUCHI PRO",
    expiry: "03/29",
    balance: 5000.00,
    frozen: true,
  },
];

export default function CardsPage() {
  const navigate = useNavigate();
  const { user, t, theme } = useApp();
  const [activeCard, setActiveCard] = useState(0);
  const [cards, setCards] = useState(userCards);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const card = cards[activeCard];

  const toggleFreeze = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, frozen: !c.frozen } : c));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: theme.bg }}>
      <StatusBar />

      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>{t("myCards")}</h2>
        <button onClick={() => setShowAddCard(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl active:scale-95 transition-all"
          style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span style={{ color: "#D4AF37", fontSize: "13px", fontWeight: 600 }}>Ajouter</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Card carousel */}
        <div className="relative mb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3 }}>
              <div style={{ filter: card.frozen ? "grayscale(0.8)" : "none", transition: "filter 0.3s" }}>
                <VirtualCard
                  variant={card.variant}
                  cardHolder={card.holder}
                  cardNumber={card.number}
                  expiry={card.expiry}
                />
              </div>
              {card.frozen && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl"
                  style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}>
                  <div className="flex flex-col items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 2L12 7M12 17v5M4.93 4.93l3.54 3.54M15.54 15.54l3.53 3.53M2 12h5M17 12h5M4.93 19.07l3.54-3.54M15.54 8.46l3.53-3.53" />
                    </svg>
                    <span style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>Carte Gelée</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Card label */}
          <div className="flex items-center justify-between mt-3">
            <span style={{ color: theme.textSecondary, fontSize: "13px" }}>{card.label}</span>
            <span style={{ color: "#D4AF37", fontSize: "15px", fontWeight: 700 }}>
              {card.balance.toLocaleString("fr-TN", { minimumFractionDigits: 3 })} TND
            </span>
          </div>
        </div>

        {/* Card selector */}
        <div className="flex justify-center gap-2 mb-5">
          {cards.map((_, idx) => (
            <button key={idx} onClick={() => setActiveCard(idx)}
              className="transition-all duration-300"
              style={{
                width: activeCard === idx ? "24px" : "8px",
                height: "8px", borderRadius: "4px",
                background: activeCard === idx ? "#D4AF37" : "rgba(212,175,55,0.3)",
              }} />
          ))}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            {
              label: "Détails", emoji: "👁️",
              action: () => setShowDetails(!showDetails),
              color: "#7C3AED", bg: "rgba(124,58,237,0.15)"
            },
            {
              label: card.frozen ? "Dégeler" : "Geler",
              emoji: card.frozen ? "🔥" : "❄️",
              action: () => toggleFreeze(card.id),
              color: card.frozen ? "#F59E0B" : "#06B6D4",
              bg: card.frozen ? "rgba(245,158,11,0.15)" : "rgba(6,182,212,0.15)"
            },
            {
              label: "Recharger", emoji: "⬆️",
              action: () => {},
              color: "#10B981", bg: "rgba(16,185,129,0.15)"
            },
            {
              label: "Bloquer", emoji: "🚫",
              action: () => {},
              color: "#EF4444", bg: "rgba(239,68,68,0.15)"
            },
          ].map(btn => (
            <button key={btn.label} onClick={btn.action}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl active:scale-95 transition-all"
              style={{ background: btn.bg, border: `1px solid ${btn.color}25` }}>
              <span style={{ fontSize: "20px" }}>{btn.emoji}</span>
              <span style={{ color: theme.textSecondary, fontSize: "10px", fontWeight: 600 }}>{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Card details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl p-4 mb-4 overflow-hidden"
              style={{ background: theme.cardBg, border: "1px solid rgba(212,175,55,0.2)" }}>
              <p style={{ color: theme.sectionLabel, fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "12px" }}>
                DÉTAILS DE LA CARTE
              </p>
              {[
                { label: "Numéro", value: `•••• •••• •••• ${card.number}` },
                { label: "Titulaire", value: card.holder },
                { label: "Expire le", value: card.expiry },
                { label: "CVV", value: "•••" },
                { label: "Statut", value: card.frozen ? "🔒 Gelée" : "✅ Active" },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-2"
                  style={{ borderBottom: `1px solid ${theme.divider}` }}>
                  <span style={{ color: theme.textSecondary, fontSize: "13px" }}>{row.label}</span>
                  <span style={{ color: theme.text, fontSize: "13px", fontWeight: 600, fontFamily: "monospace" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* All cards list */}
        <div>
          <p style={{ color: theme.sectionLabel, fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "12px" }}>
            TOUTES MES CARTES
          </p>
          <div className="space-y-2">
            {cards.map((c, i) => (
              <button key={c.id} onClick={() => setActiveCard(i)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl active:scale-98 transition-all"
                style={{
                  background: i === activeCard ? "rgba(212,175,55,0.1)" : theme.cardBg,
                  border: i === activeCard ? "1px solid rgba(212,175,55,0.3)" : `1px solid ${theme.cardBorder}`,
                }}>
                <div className="w-10 h-6 rounded-md"
                  style={{
                    background: c.variant === "gold" ? "linear-gradient(135deg, #D4AF37, #F5E27A)" :
                      c.variant === "platinum" ? "linear-gradient(135deg, #2D2D4E, #3A3A60)" :
                      "linear-gradient(135deg, #CD7F32, #E8A882)",
                  }} />
                <div className="flex-1 text-left">
                  <p style={{ color: theme.text, fontSize: "13px", fontWeight: 600 }}>{c.label}</p>
                  <p style={{ color: theme.textSecondary, fontSize: "11px" }}>•••• {c.number}</p>
                </div>
                <div className="text-right">
                  <p style={{ color: c.frozen ? "#6B7280" : "#D4AF37", fontSize: "13px", fontWeight: 600 }}>
                    {c.frozen ? "Gelée" : `${c.balance.toFixed(2)} TND`}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add card modal */}
      <AnimatePresence>
        {showAddCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-end z-50"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setShowAddCard(false)}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full rounded-t-3xl p-6"
              style={{ background: theme.bg === "#F2F0FA" ? "#fff" : "#131525" }}
              onClick={e => e.stopPropagation()}>
              <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ background: theme.cardBorder }} />
              <h3 style={{ color: theme.text, fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>
                Ajouter une Carte
              </h3>

              {["Carte Virtuelle STOUCHI", "Carte Prépayée", "Carte Business"].map((type, i) => (
                <button key={type} className="w-full flex items-center gap-3 p-4 rounded-2xl mb-2 active:scale-98"
                  style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                  <div className="w-10 h-7 rounded-md"
                    style={{ background: ["linear-gradient(135deg,#D4AF37,#F5E27A)","linear-gradient(135deg,#2D2D4E,#3A3A60)","linear-gradient(135deg,#CD7F32,#E8A882)"][i] }} />
                  <div className="flex-1 text-left">
                    <p style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{type}</p>
                    <p style={{ color: theme.textSecondary, fontSize: "12px" }}>Gratuit · Immédiat</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.sectionLabel} strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}

              <button onClick={() => setShowAddCard(false)}
                className="w-full py-4 rounded-2xl mt-2"
                style={{ background: theme.cardBg, color: theme.textSecondary, fontWeight: 600, fontSize: "15px" }}>
                {t("cancel")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}