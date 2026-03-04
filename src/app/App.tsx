import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";
import { MobileFrame } from "./components/MobileFrame";

export default function App() {
  return (
    <AppProvider>
      <MobileFrame>
        <RouterProvider router={router} />
      </MobileFrame>
    </AppProvider>
  );
}
