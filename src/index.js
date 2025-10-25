import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register } from './utils/serviceWorker';
import { performanceConfig } from './config/performance';

// Add performance monitoring
if (performanceConfig.monitoring.webVitals) {
  reportWebVitals(console.log);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker in production
if (process.env.NODE_ENV === 'production' && performanceConfig.features.serviceWorker) {
  register({
    onSuccess: () => console.log('ServiceWorker registration successful'),
    onUpdate: (registration) => {
      console.log('New content is available; will refresh when all tabs are closed');
      if (window.confirm('New version available! Update now?')) {
        const waitingServiceWorker = registration.waiting;
        if (waitingServiceWorker) {
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      }
    }
  });
}
