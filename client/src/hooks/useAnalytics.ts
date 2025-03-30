import { useCallback } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface AnalyticsHook {
  trackPageView: (page: string) => Promise<void>;
  trackFormSubmission: (formType: string) => Promise<void>;
}

export function useAnalytics(): AnalyticsHook {
  const trackPageView = useCallback(async (page: string) => {
    try {
      await apiRequest('POST', '/api/analytics/pageView', { page });
      console.log(`Page view tracked: ${page}`);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, []);

  const trackFormSubmission = useCallback(async (formType: string) => {
    try {
      await apiRequest('POST', '/api/analytics/formSubmission', { formType });
      console.log(`Form submission tracked: ${formType}`);
    } catch (error) {
      console.error('Failed to track form submission:', error);
    }
  }, []);

  return {
    trackPageView,
    trackFormSubmission
  };
}
