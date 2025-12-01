// Performance monitoring utility
export const performanceMonitor = {
  // Measure navigation timing
  measureNavigation: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          const metrics = {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            connect: perfData.connectEnd - perfData.connectStart,
            ttfb: perfData.responseStart - perfData.requestStart,
            download: perfData.responseEnd - perfData.responseStart,
            dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            load: perfData.loadEventEnd - perfData.loadEventStart,
            total: perfData.loadEventEnd - perfData.fetchStart
          };

          // Log in development
          if (import.meta.env.DEV) {
            console.group('🚀 Performance Metrics');
            console.log('DNS Lookup:', `${metrics.dns.toFixed(2)}ms`);
            console.log('Connection:', `${metrics.connect.toFixed(2)}ms`);
            console.log('TTFB:', `${metrics.ttfb.toFixed(2)}ms`);
            console.log('Download:', `${metrics.download.toFixed(2)}ms`);
            console.log('DOM Ready:', `${metrics.dom.toFixed(2)}ms`);
            console.log('Load Complete:', `${metrics.load.toFixed(2)}ms`);
            console.log('Total Time:', `${metrics.total.toFixed(2)}ms`);
            console.groupEnd();

            // Warnings for slow performance
            if (metrics.total > 3000) {
              console.warn('⚠️ Slow page load detected:', `${metrics.total.toFixed(2)}ms`);
            }
            if (metrics.ttfb > 1000) {
              console.warn('⚠️ Slow server response:', `${metrics.ttfb.toFixed(2)}ms`);
            }
          }

          return metrics;
        }
      });
    }
  },

  // Measure LCP (Largest Contentful Paint)
  measureLCP: (callback) => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          if (import.meta.env.DEV) {
            console.log('🎯 LCP (Largest Contentful Paint):', `${lcp.toFixed(2)}ms`);
            if (lcp > 2500) {
              console.warn('⚠️ LCP is slower than recommended (>2.5s)');
            }
          }
          callback && callback(lcp);
        }
      });
      
      try {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {
        // LCP might not be supported
        console.debug('LCP not supported');
      }

      return () => observer.disconnect();
    }
  },

  // Measure FID (First Input Delay)
  measureFID: (callback) => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fid = entry.processingStart - entry.startTime;
          if (import.meta.env.DEV) {
            console.log('⚡ FID (First Input Delay):', `${fid.toFixed(2)}ms`);
            if (fid > 100) {
              console.warn('⚠️ FID is slower than recommended (>100ms)');
            }
          }
          callback && callback(fid);
        }
      });

      try {
        observer.observe({ type: 'first-input', buffered: true });
      } catch {
        // FID might not be supported
        console.debug('FID not supported');
      }

      return () => observer.disconnect();
    }
  },

  // Memory usage monitoring
  measureMemory: () => {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
      const memory = performance.memory;
      if (import.meta.env.DEV && memory) {
        console.group('💾 Memory Usage');
        console.log('Used:', `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
        console.log('Total:', `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
        console.log('Limit:', `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
        console.groupEnd();

        // Warning for high memory usage
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
          console.warn('⚠️ High memory usage detected');
        }
      }
      return memory;
    }
  }
};