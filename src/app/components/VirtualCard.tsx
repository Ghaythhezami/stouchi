import stouchiLogo from "figma:asset/618e92cfa440e6180d320be5cb8afcf0debdc9bf.png";

interface VirtualCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiry?: string;
  variant?: "gold" | "platinum" | "rosegold";
  className?: string;
  style?: React.CSSProperties;
  masked?: boolean;
}

const gradients = {
  gold: "linear-gradient(135deg, #8B6914 0%, #D4AF37 40%, #F5E27A 70%, #C9A027 100%)",
  platinum: "linear-gradient(135deg, #1A1A2C 0%, #2D2D4E 40%, #3A3A60 70%, #1A1A2C 100%)",
  rosegold: "linear-gradient(135deg, #8B4513 0%, #CD7F32 40%, #E8A882 70%, #9A5030 100%)",
};

const chipColors = {
  gold: "#5A4000",
  platinum: "#D4AF37",
  rosegold: "#5A2800",
};

export function VirtualCard({
  cardNumber = "4821",
  cardHolder = "STOUCHI USER",
  expiry = "12/28",
  variant = "gold",
  className = "",
  style,
  masked = true,
}: VirtualCardProps) {
  const gradient = gradients[variant];
  const chipColor = chipColors[variant];
  const isGold = variant === "gold";

  return (
    <div
      className={`relative rounded-3xl overflow-hidden select-none ${className}`}
      style={{
        width: "100%",
        aspectRatio: "1.586",
        background: gradient,
        boxShadow: isGold
          ? "0 20px 60px rgba(212, 175, 55, 0.4), 0 8px 20px rgba(0,0,0,0.6)"
          : "0 20px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)",
        ...style,
      }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
        }} />

      {/* Top row */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
        {/* Chip */}
        <div className="relative w-9 h-7 rounded-md"
          style={{ background: `linear-gradient(135deg, ${chipColor}, rgba(255,200,50,0.8))` }}>
          <div className="absolute inset-1 grid grid-cols-3 gap-px opacity-60">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-sm"
                style={{ background: "rgba(0,0,0,0.3)" }} />
            ))}
          </div>
        </div>

        {/* NFC symbol */}
        <div className="flex items-center opacity-80">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M6 11 Q6 6 11 6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M4 11 Q4 4 11 4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M2 11 Q2 2 11 2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="11" cy="11" r="1.5" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
      </div>

      {/* Card number */}
      <div className="absolute bottom-12 left-5 right-5">
        <p className="tracking-widest text-white opacity-90"
          style={{ fontSize: "13px", fontFamily: "monospace", letterSpacing: "0.2em", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
          {masked ? `•••• •••• •••• ${cardNumber}` : `4532 8814 2321 ${cardNumber}`}
        </p>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
        <div>
          <p className="text-white opacity-50" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>CARD HOLDER</p>
          <p className="text-white opacity-90" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }}>
            {cardHolder}
          </p>
        </div>

        <div className="text-right mr-2">
          <p className="text-white opacity-50" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>EXPIRES</p>
          <p className="text-white opacity-90" style={{ fontSize: "11px", fontWeight: 600 }}>{expiry}</p>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img src={stouchiLogo} alt="Stouchi" className="h-7 w-auto object-contain opacity-90"
            style={{ filter: isGold ? "brightness(0.3) sepia(1)" : "brightness(0) invert(1)" }} />
        </div>
      </div>
    </div>
  );
}