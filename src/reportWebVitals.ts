// Performance reporting - optional, can be connected to analytics
// Accepts a callback that receives performance metrics
type MetricHandler = (metric: { name: string; value: number }) => void;

const reportWebVitals = (onPerfEntry?: MetricHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Web Vitals can be dynamically imported if needed:
    // npm install web-vitals
    // import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    //   onCLS(onPerfEntry);
    //   onFID(onPerfEntry);
    //   onFCP(onPerfEntry);
    //   onLCP(onPerfEntry);
    //   onTTFB(onPerfEntry);
    // });
  }
};

export default reportWebVitals;
