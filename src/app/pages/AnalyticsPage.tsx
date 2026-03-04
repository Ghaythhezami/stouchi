import { useState } from "react";
import { useNavigate } from "react-router";
import { StatusBar } from "../components/StatusBar";
import { useApp } from "../context/AppContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const monthlyData = [
  { month: "Oct", income: 800, expense: 450 },
  { month: "Nov", income: 1200, expense: 700 },
  { month: "Déc", income: 950, expense: 820 },
  { month: "Jan", income: 1100, expense: 600 },
  { month: "Fév", income: 1400, expense: 750 },
  { month: "Mar", income: 1245, expense: 580 },
];

const categories = [
  { name: "Factures", value: 35, color: "#F59E0B" },
  { name: "Transferts", value: 28, color: "#7C3AED" },
  { name: "Recharges", value: 15, color: "#3B82F6" },
  { name: "QR Paiements", value: 12, color: "#10B981" },
  { name: "Autres", value: 10, color: "#6B7280" },
];

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { user, transactions, t, theme } = useApp();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const totalIncome = transactions.filter(tx => tx.amount > 0).reduce((s, tx) => s + tx.amount, 0);
  const totalExpense = Math.abs(transactions.filter(tx => tx.amount < 0).reduce((s, tx) => s + tx.amount, 0));

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: theme.bg }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 pt-2 pb-3">
        <h2 style={{ color: theme.text, fontSize: "18px", fontWeight: 700 }}>{t("myAnalytics")}</h2>
        <div className="ml-auto flex gap-1 p-1 rounded-xl" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
          {(["week","month","year"] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-3 py-1 rounded-lg transition-all"
              style={{
                background: period === p ? "rgba(212,175,55,0.3)" : "transparent",
                color: period === p ? "#D4AF37" : theme.navIcon,
                fontSize: "12px", fontWeight: 600,
              }}>
              {p === "week" ? "Sem" : p === "month" ? "Mois" : "An"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 space-y-4">
        {/* Total Balance */}
        <div className="rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, #1A0D35, #2A1550)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Solde Total</p>
          <p style={{ color: "white", fontSize: "30px", fontWeight: 800 }}>
            {user?.balance?.toLocaleString("fr-TN", { minimumFractionDigits: 3 })} TND
          </p>

          <div className="flex gap-3 mt-3">
            <div className="flex-1 p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#10B981" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Revenus</span>
              </div>
              <p style={{ color: "#10B981", fontSize: "15px", fontWeight: 700 }}>{totalIncome.toFixed(2)} TND</p>
            </div>

            <div className="flex-1 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#EF4444" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Dépenses</span>
              </div>
              <p style={{ color: "#EF4444", fontSize: "15px", fontWeight: 700 }}>{totalExpense.toFixed(2)} TND</p>
            </div>
          </div>
        </div>

        {/* Bar Chart - Overview */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex justify-between items-center mb-4">
            <p style={{ color: "white", fontSize: "15px", fontWeight: 700 }}>Aperçu Mensuel</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Revenus</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#7C3AED" }} />
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Dépenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData} barGap={4} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#1A1C2C", border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "12px", color: "white",
                }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="income" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Categories */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
            Répartition des Dépenses
          </p>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%" cy="50%"
                  innerRadius={40} outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1A1C2C", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px", color: "white", fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-2">
              {categories.map(cat => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{cat.name}</span>
                  </div>
                  <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent summary */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>
            Ce Mois (Mars 2026)
          </p>
          {[
            { label: "Transactions totales", value: "12", icon: "🔄" },
            { label: "Économies réalisées", value: "87.50 TND", icon: "💰" },
            { label: "Factures payées", value: "3", icon: "📋" },
            { label: "Transferts effectués", value: "5", icon: "📤" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{item.label}</span>
              </div>
              <span style={{ color: "white", fontSize: "14px", fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}