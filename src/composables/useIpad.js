import { computed } from 'vue'

export const useIpad = () => {
  const isIpad = computed(() => {
    const ua = navigator.userAgent
    return /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  })

  return { isIpad }
}
