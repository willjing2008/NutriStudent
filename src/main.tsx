
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
import { LanguageProvider } from './app/hooks/useLanguage';
import { SubscriptionProvider } from './app/hooks/useSubscription';

  createRoot(document.getElementById("root")!).render(<LanguageProvider>
      <SubscriptionProvider>
        <App />
      </SubscriptionProvider>
    </LanguageProvider>);
  