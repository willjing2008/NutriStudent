
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
import { LanguageProvider } from './app/hooks/useLanguage';
import { SubscriptionProvider } from './app/hooks/useSubscription';
import { ConfirmProvider } from './app/hooks/useConfirm';
import { Toaster } from './app/components/ui/sonner';
import { ErrorBoundary } from './app/components/ErrorBoundary';

  createRoot(document.getElementById("root")!).render(<ErrorBoundary>
    <LanguageProvider>
      <SubscriptionProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
        <Toaster theme="dark" position="top-center" richColors />
      </SubscriptionProvider>
    </LanguageProvider>
    </ErrorBoundary>);
  