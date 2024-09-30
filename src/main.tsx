import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "./hooks/useAuth";
import { ReminderProvider } from "./context/ReminderContext";

import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <AuthProvider>
      <Provider store={store}>
        <ReminderProvider>
          <App />
        </ReminderProvider>
      </Provider>
    </AuthProvider>
  </ThemeProvider>
);
