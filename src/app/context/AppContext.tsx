import React, { createContext, useContext, useState, useMemo } from "react";
import { translations, Lang, TranslationKey } from "../i18n/translations";

export interface User {
  name: string;
  phone: string;
  balance: number;
  avatar: string;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  type: "sent" | "received" | "payment" | "topup";
  name: string;
  amount: number;
  date: string;
  category: string;
  status: "completed" | "pending" | "failed";
  note?: string;
}

export interface StouchiTheme {
  bg: string;
  bgGrad: string;
  headerGrad: string;
  profileCardGrad: string;
  cardBg: string;
  cardBorder: string;
  inputBg: string;
  inputBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  sectionLabel: string;
  navBg: string;
  navIcon: string;
  backBtn: string;
  backBtnIcon: string;
  divider: string;
  statsCard: string;
}

const darkTheme: StouchiTheme = {
  bg: "#0A0B14",
  bgGrad: "linear-gradient(180deg, #0A0B14 0%, #130D22 60%, #0A0B14 100%)",
  headerGrad: "linear-gradient(180deg, #1A0D35 0%, #130D22 70%, transparent 100%)",
  profileCardGrad: "linear-gradient(135deg, #1A0D35, #2A1550)",
  cardBg: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.06)",
  inputBg: "rgba(255,255,255,0.06)",
  inputBorder: "rgba(255,255,255,0.1)",
  text: "white",
  textSecondary: "rgba(255,255,255,0.5)",
  textMuted: "rgba(255,255,255,0.3)",
  sectionLabel: "rgba(255,255,255,0.4)",
  navBg: "rgba(10,11,20,0.98)",
  navIcon: "rgba(255,255,255,0.45)",
  backBtn: "rgba(255,255,255,0.08)",
  backBtnIcon: "white",
  divider: "rgba(255,255,255,0.08)",
  statsCard: "rgba(255,255,255,0.04)",
};

const lightTheme: StouchiTheme = {
  bg: "#F2F0FA",
  bgGrad: "linear-gradient(180deg, #F2F0FA 0%, #EAE5F8 60%, #F2F0FA 100%)",
  headerGrad: "linear-gradient(180deg, #EDE6FF 0%, #E6DEFF 70%, transparent 100%)",
  profileCardGrad: "linear-gradient(135deg, #F5ECFF, #EDE4FF)",
  cardBg: "rgba(255,255,255,0.9)",
  cardBorder: "rgba(0,0,0,0.07)",
  inputBg: "rgba(255,255,255,0.8)",
  inputBorder: "rgba(0,0,0,0.12)",
  text: "#0D0C18",
  textSecondary: "rgba(13,12,24,0.55)",
  textMuted: "rgba(13,12,24,0.35)",
  sectionLabel: "rgba(13,12,24,0.45)",
  navBg: "rgba(242,240,250,0.98)",
  navIcon: "rgba(13,12,24,0.4)",
  backBtn: "rgba(0,0,0,0.07)",
  backBtnIcon: "#0D0C18",
  divider: "rgba(0,0,0,0.07)",
  statsCard: "rgba(255,255,255,0.75)",
};

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  transactions: Transaction[];
  pendingPhone: string;
  setPendingPhone: (phone: string) => void;
  pendingName: string;
  setPendingName: (name: string) => void;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  sendMoney: (amount: number, to: string) => boolean;
  // Theme & Language
  darkMode: boolean;
  toggleDarkMode: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  theme: StouchiTheme;
  isRTL: boolean;
}

const defaultTransactions: Transaction[] = [
  { id: "1", type: "received", name: "Mohamed Kamel", amount: 200, date: "Aujourd'hui, 14:30", category: "Transfer", status: "completed" },
  { id: "2", type: "payment", name: "STEG - Électricité", amount: -120, date: "Hier, 09:15", category: "Bills", status: "completed" },
  { id: "3", type: "sent", name: "Hayet Trabelsi", amount: -50, date: "Hier, 11:22", category: "Transfer", status: "completed" },
  { id: "4", type: "payment", name: "Orange Recharge", amount: -20, date: "Lun, 15:00", category: "Mobile", status: "completed" },
  { id: "5", type: "topup", name: "Virement Reçu", amount: 500, date: "Dim, 10:00", category: "Top Up", status: "completed" },
  { id: "6", type: "payment", name: "SONEDE - Eau", amount: -45, date: "Sam, 08:30", category: "Bills", status: "completed" },
  { id: "7", type: "sent", name: "Anis Belhadj", amount: -75, date: "Ven, 19:45", category: "Transfer", status: "completed" },
  { id: "8", type: "payment", name: "Tunisie Telecom", amount: -35, date: "Jeu, 12:10", category: "Bills", status: "completed" },
  { id: "9", type: "received", name: "Sana Mejri", amount: 150, date: "Mer, 16:30", category: "Transfer", status: "completed" },
  { id: "10", type: "topup", name: "Dépôt Espèces", amount: 300, date: "Mar, 11:00", category: "Top Up", status: "completed" },
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("stouchi_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate old "Karim Mansouri" name to new user
      if (parsed.name === "Karim Mansouri") {
        parsed.name = "Ghayth Khezami";
        localStorage.setItem("stouchi_user", JSON.stringify(parsed));
      }
      return parsed;
    }
    return null;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);
  const [pendingPhone, setPendingPhone] = useState("");
  const [pendingName, setPendingName] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("stouchi_dark");
    return saved !== null ? saved === "true" : true; // default dark
  });
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("stouchi_lang");
    return (saved as Lang) || "fr";
  });

  const isAuthenticated = !!user;
  const isRTL = lang === "tn";
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("stouchi_dark", String(next));
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("stouchi_lang", l);
  };

  const t = useMemo(() => (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.fr[key] ?? key;
  }, [lang]);

  const login = (phone: string, name?: string) => {
    const newUser: User = {
      name: name || "Ghayth Khezami",
      phone,
      balance: 1245.50,
      avatar: "",
      accountNumber: "TN59 0020 1000 0123 4567 8901",
    };
    setUser(newUser);
    localStorage.setItem("stouchi_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("stouchi_user");
  };

  const sendMoney = (amount: number, to: string): boolean => {
    if (!user || user.balance < amount) return false;
    const newBalance = user.balance - amount;
    const updatedUser = { ...user, balance: newBalance };
    setUser(updatedUser);
    localStorage.setItem("stouchi_user", JSON.stringify(updatedUser));
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: "sent",
      name: to,
      amount: -amount,
      date: "Maintenant",
      category: "Transfer",
      status: "completed",
    };
    setTransactions(prev => [newTx, ...prev]);
    return true;
  };

  return (
    <AppContext.Provider value={{
      user, isAuthenticated, transactions,
      pendingPhone, setPendingPhone,
      pendingName, setPendingName,
      login, logout, sendMoney,
      darkMode, toggleDarkMode,
      lang, setLang,
      t, theme, isRTL,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}