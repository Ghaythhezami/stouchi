import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { BottomNav } from "../components/BottomNav";
import { useApp } from "../context/AppContext";

export default function AppLayout() {
  const { isAuthenticated, theme } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/onboarding");
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: theme.bg }}>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}