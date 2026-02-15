
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
import { LanguageProvider } from './app/hooks/useLanguage';

  createRoot(document.getElementById("root")!).render(<LanguageProvider>
      <App />
    </LanguageProvider>);
  