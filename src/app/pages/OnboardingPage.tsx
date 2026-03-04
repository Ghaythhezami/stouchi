import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "../components/StatusBar";
import { VirtualCard } from "../components/VirtualCard";
import { useApp } from "../context/AppContext";
import stouchiLogo from "figma:asset/618e92cfa440e6180d320be5cb8afcf0debdc9bf.png";

const cardVariants = [
  { variant: "gold" as const, holder: "GHAYTH KHEZAMI", number: "4821", expiry: "12/28", rotate: -8, translateY: 20, translateX: -10, zIndex: 1 },
  { variant: "platinum" as const, holder: "SANA MEJRI", number: "7394", expiry: "09/27", rotate: 0, translateY: 10, translateX: 0, zIndex: 2 },
  { variant: "rosegold" as const, holder: "ANIS BELHADJ", number: "2156", expiry: "03/29", rotate: 8, translateY: 0, translateX: 10, zIndex: 3 },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { t, theme, darkMode } = useApp();
  const [slide, setSlide] = useState(0);
  const [activeCard, setActiveCard] = useState(2);

  const slides = [
    { title: t("welcome"), subtitle: t("welcomeSub"), highlight: t("badge1") },
    { title: t("slide2Title"), subtitle: t("slide2Sub"), highlight: t("badge2") },
    { title: t("slide3Title"), subtitle: t("slide3Sub"), highlight: t("badge3") },
  ];

  const handleCardTap = (idx: number) => {
    setActiveCard(idx);
    setSlide(idx);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden"
      style={{ background: theme.bgGrad }}>
      <StatusBar />

      {/* Logo */}
      <div className="flex justify-center pt-4 pb-2">
        <img src={stouchiLogo} alt="STOUCHI" className="h-16 w-auto object-contain" />
      </div>

      {/* E-Cards Stack */}
      <div className="flex-1 flex items-center justify-center px-8 relative" style={{ minHeight: 0 }}>
        <div className="relative w-full" style={{ height: "200px" }}>
          {cardVariants.map((card, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleCardTap(idx)}
              className="absolute inset-0 cursor-pointer"
              animate={{
                rotate: activeCard === idx ? 0 : card.rotate,
                y: activeCard === idx ? -15 : card.translateY,
                x: activeCard === idx ? 0 : card.translateX,
                scale: activeCard === idx ? 1.05 : 0.92,
                zIndex: activeCard === idx ? 10 : card.zIndex,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ zIndex: activeCard === idx ? 10 : card.zIndex }}
            >
              <VirtualCard
                variant={card.variant}
                cardHolder={card.holder}
                cardNumber={card.number}
                expiry={card.expiry}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Card selector dots */}
      <div className="flex justify-center gap-2 pb-2">
        {cardVariants.map((_, idx) => (
          <button key={idx} onClick={() => handleCardTap(idx)}
            className="transition-all duration-300"
            style={{
              width: activeCard === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: activeCard === idx ? "#D4AF37" : "rgba(212,175,55,0.3)",
            }} />
        ))}
      </div>

      {/* Slide Content */}
      <div className="px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div key={slide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-4">
            {/* Feature badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3"
              style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D4AF37" }} />
              <span style={{ color: "#D4AF37", fontSize: "12px", fontWeight: 600 }}>
                {slides[slide].highlight}
              </span>
            </div>

            <h1 style={{ color: theme.text, fontSize: "22px", fontWeight: 700, lineHeight: 1.3 }}>
              {slides[slide].title}
            </h1>
            <p className="text-center" style={{ color: theme.textSecondary, fontSize: "14px", lineHeight: 1.6, marginTop: "8px" }}>
              {slides[slide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex justify-center gap-1.5 mb-5">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setSlide(idx)}
              className="transition-all duration-300"
              style={{
                width: slide === idx ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: slide === idx ? "#D4AF37" : "rgba(255,255,255,0.2)",
              }} />
          ))}
        </div>

        {/* CTA Buttons */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-4 rounded-2xl mb-3 transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #F5E27A, #C9A027)",
            color: "#0A0B14",
            fontWeight: 700,
            fontSize: "16px",
            boxShadow: "0 8px 30px rgba(212,175,55,0.4)",
          }}>
          {t("createAccount")}
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="w-full py-4 rounded-2xl transition-all active:scale-95"
          style={{
            background: "transparent",
            color: "#D4AF37",
            fontWeight: 600,
            fontSize: "16px",
            border: "1.5px solid rgba(212,175,55,0.4)",
          }}>
          {t("signIn")}
        </button>

        <p className="text-center mt-4" style={{ color: theme.textMuted, fontSize: "11px" }}>
          {t("termsText")}
        </p>
      </div>
    </div>
  );
}
