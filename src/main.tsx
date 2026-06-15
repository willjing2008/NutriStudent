
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
import { LanguageProvider } from './app/hooks/useLanguage';
import { SubscriptionProvider } from './app/hooks/useSubscription';
import { Toaster } from './app/components/ui/sonner';

  createRoot(document.getElementById("root")!).render(<LanguageProvider>
      <SubscriptionProvider>
        <App />
        <Toaster theme="dark" position="top-center" richColors />
      </SubscriptionProvider>
    </LanguageProvider>);
  