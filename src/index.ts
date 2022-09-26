declare const dataLayer: any[]
declare const gtag: (...args: any[]) => void
declare global {
  interface Window {
    dataLayer?: typeof dataLayer
    gtag?: typeof gtag
}
}

const mountGoogleAnalytics = (id: string) => {
  // avoid duplicated import
  if (window.dataLayer && window.gtag) {
    return
  }
  
  // insert gtag `<script>` tag
  const gtagScript = document.createElement('script')
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  gtagScript.async = true
  document.head.appendChild(gtagScript)
  // insert gtag snippet
  window.dataLayer = window.dataLayer || []
  // the gtag function must use `arguments` object to forward parameters
  window.gtag = function () {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', id)
}
/* global GA_ID, ga */
export default ({id}) => {
  // Google analytics integration
  if (process.env.NODE_ENV === 'production' && id && typeof window !== 'undefined') {
    mountGoogleAnalytics(id)
  }
}
