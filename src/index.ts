import type { EnhanceAppContext } from 'vitepress'

/* global GA_ID, ga */
export default ({ router, siteData, app }) => {
  const { googleAnalytics = {} } = siteData?.value?.themeConfig
  const GA_ID = googleAnalytics.ga || false

  // Google analytics integration
  if (process.env.NODE_ENV === 'production' && GA_ID && typeof window !== 'undefined') {
    const scriptEl = (function (i, s, o, g, r, a?: HTMLScriptElement, m?: HTMLElement) {
      i['GoogleAnalyticsObject'] = r
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }
      i[r].l = Number(new Date())
      a = s.createElement(o) as HTMLScriptElement
      m = s.getElementsByTagName(o)[0] as HTMLScriptElement
      a.async = true
      a.src = g
      m!.parentNode!.insertBefore(a, m)
      return a
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

    scriptEl.onload = () => {
      window['ga']('create', GA_ID, 'auto')
      window['ga']('set', 'anonymizeIp', true)
    }

    setTimeout(() => {
      const originalRouteHook = router.onAfterRouteChanged
      router.onAfterRouteChanged = (to) => {
        originalRouteHook?.(to)

        window['ga']('set', 'page', to)
        window['ga']('send', 'pageview')
      }
    })
  }
}