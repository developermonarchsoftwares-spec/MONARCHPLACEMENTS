/**
 * Lightweight privacy-friendly analytics and event tracking helper.
 * Dispatches custom browser events without collecting personal data.
 */

type AnalyticsEvent = 
  | 'internship_cta_click'
  | 'internship_form_submission'
  | 'internship_modal_apply_click'
  | 'internship_view_domain_modal'
  | 'whatsapp_click'
  | 'email_enquiry_click'
  | 'college_proposal_request'
  | 'hiring_form_submission'
  | 'hiring_cta_click'
  | 'page_view'

export function trackEvent(eventName: AnalyticsEvent, metadata?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return

  try {
    // Dispatch custom DOM event for any attached monitoring systems
    const event = new CustomEvent('mp_analytics', {
      detail: {
        event: eventName,
        timestamp: new Date().toISOString(),
        ...metadata,
      },
    })
    window.dispatchEvent(event)

    // Also support Google Analytics / gtag if configured on window
    const win = window as unknown as { gtag?: (type: string, name: string, data?: unknown) => void }
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, metadata)
    }
  } catch {
    // Fail silently to never interrupt user interaction
  }
}
