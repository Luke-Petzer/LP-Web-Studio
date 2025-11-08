import { useEffect } from 'react';
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
    // Monitor LCP
    try {
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          // Log LCP to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP:', entry.startTime);
          }
          // In production, you'd send this to your analytics
          // sendToAnalytics({ metric: 'LCP', value: entry.startTime });
        }
      }).observe({
        type: 'largest-contentful-paint',
        buffered: true
      });
    } catch (e) {
      console.error('LCP monitoring error:', e);
    }
    // Monitor CLS
    try {
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          // Log CLS to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', (entry as any).value);
          }
          // In production, you'd send this to your analytics
          // sendToAnalytics({ metric: 'CLS', value: (entry as any).value });
        }
      }).observe({
        type: 'layout-shift',
        buffered: true
      });
    } catch (e) {
      console.error('CLS monitoring error:', e);
    }
    // Monitor FID/INP
    try {
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log('INP:', (entry as any).processingStart - (entry as any).startTime);
          }
          // In production, you'd send this to your analytics
          // sendToAnalytics({
          //   metric: 'INP',
          //   value: (entry as any).processingStart - (entry as any).startTime
          // });
        }
      }).observe({
        type: 'first-input',
        buffered: true
      });
    } catch (e) {
      console.error('INP monitoring error:', e);
    }
  }, []);
  return null; // This component doesn't render anything
}