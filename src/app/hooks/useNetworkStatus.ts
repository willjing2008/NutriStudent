import { useEffect, useState } from 'react';

const getCurrentOnlineStatus = (): boolean => {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
};

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(getCurrentOnlineStatus);

  useEffect(() => {
    const updateStatus = () => setIsOnline(getCurrentOnlineStatus());

    updateStatus();
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return { isOnline };
}
