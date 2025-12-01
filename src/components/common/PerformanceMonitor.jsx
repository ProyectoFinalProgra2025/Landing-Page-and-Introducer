import { useEffect } from 'react';
import { performanceMonitor } from '../../utils/performanceUtils';

// Performance monitoring component
export default function PerformanceMonitor({ children }) {
  useEffect(() => {
    // Only run in development
    if (!import.meta.env.DEV) return;

    // Measure navigation timing
    performanceMonitor.measureNavigation();

    // Measure LCP
    const lcpCleanup = performanceMonitor.measureLCP();

    // Measure FID  
    const fidCleanup = performanceMonitor.measureFID();

    // Measure memory usage every 30 seconds
    const memoryInterval = setInterval(() => {
      performanceMonitor.measureMemory();
    }, 30000);

    // Initial memory measurement
    setTimeout(() => {
      performanceMonitor.measureMemory();
    }, 1000);

    return () => {
      lcpCleanup && lcpCleanup();
      fidCleanup && fidCleanup();
      clearInterval(memoryInterval);
    };
  }, []);

  return children;
}