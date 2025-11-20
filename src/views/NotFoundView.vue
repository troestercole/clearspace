<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useIpad } from '@/composables/useIpad'

const { isIpad } = useIpad()
const router = useRouter()
const easterEggActive = ref(false)
const konamiCode = ref([])
const easterEggImage = ref('/easter-egg/ryu-ready-position.gif')
const hadoukenAudio = ref(null)
const showHadouken = ref(false)
const konamiSequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const handleKeyPress = (event) => {
  konamiCode.value.push(event.code)
  if (konamiCode.value.length > konamiSequence.length) {
    konamiCode.value.shift()
  }

  // Check if Konami code is entered
  if (
    konamiCode.value.length === konamiSequence.length &&
    konamiCode.value.every((key, index) => key === konamiSequence[index])
  ) {
    activateEasterEgg()
  }
}

const activateEasterEgg = async () => {
  easterEggActive.value = true
  konamiCode.value = []

  await delay(2500)
  hadoukenAudio.value.play()
  easterEggImage.value = '/easter-egg/ryu-throwing-hadouken.png'
  showHadouken.value = true

  await delay(2500)
  easterEggImage.value = '/easter-egg/ryu-ready-position.gif'
  showHadouken.value = false

  await delay(2000)
  easterEggActive.value = false
}

const clickedHint = () => {
  if (isIpad.value) {
    activateEasterEgg()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
  hadoukenAudio.value.load()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <audio ref="hadoukenAudio" src="/easter-egg/hadouken.mp3" preload="auto" />

    <div class="relative z-10 w-full max-w-2xl">
      <div
        class="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl p-8 md:p-12 border border-white/20"
      >
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-clearspace-primary to-clearspace-primary-dark rounded-2xl mb-6 shadow-lg transform transition-transform duration-300 hover:scale-110"
          >
            <span class="text-5xl font-bold text-white">404</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p class="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p class="text-sm text-gray-500">
            <span class="font-mono">Error Code: 0x404</span>
          </p>
        </div>

        <div
          v-if="easterEggActive"
          class="mb-6 p-4 bg-clearspace-primary/10 rounded-xl border border-clearspace-primary/20 relative overflow-hidden"
        >
          <img :src="easterEggImage" class="ryu" />
          <img
            v-if="showHadouken"
            src="/easter-egg/hadouken.gif"
            class="hadouken absolute h-10 w-auto"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            @click="router.push('/')"
            class="flex-1 group relative flex items-center justify-center gap-2 px-6 py-4 bg-clearspace-primary text-white rounded-xl font-medium transition-all duration-200 hover:bg-clearspace-primary-dark hover:shadow-lg hover:shadow-clearspace-primary/30 hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Go Home</span>
          </button>

          <button
            @click="router.push('/login')"
            class="flex-1 group relative flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:border-clearspace-primary hover:shadow-lg hover:shadow-clearspace-primary/20 hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Go to Login</span>
          </button>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <div class="flex items-start gap-4 text-sm">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 bg-clearspace-primary/10 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-clearspace-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-1">What happened?</h3>
              <p class="text-gray-600 mb-2">
                The requested resource could not be found. This might be due to:
              </p>
              <ul class="list-disc list-inside text-gray-500 space-y-1 text-xs">
                <li>The URL was mistyped or incorrect</li>
                <li>The page has been moved or deleted</li>
                <li>You don't have permission to access this resource</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-6 text-center">
          <p class="text-xs text-gray-400 font-mono">
            <!-- Hint: Try the classic cheat code -->
            <span
              @click="clickedHint"
              class="opacity-0 hover:opacity-100 transition-opacity duration-300"
              :class="{ 'ipad-hint': isIpad }"
              >↑ ↑ ↓ ↓ ← → ← → B A</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="absolute h-[1px] w-[1px] overflow-hidden opacity-0">
      <img src="/easter-egg/ryu-ready-position.gif" class="opacity-0" />
      <img src="/easter-egg/hadouken.gif" class="opacity-0" />
      <img src="/easter-egg/ryu-throwing-hadouken.png" class="opacity-0" />
    </div>
  </div>
</template>

<style scoped>
img.ryu {
  height: 200px;
}

img.hadouken {
  top: 50%;
  transform: translateY(-75%) translateX(-100%);
  left: 50%;
  animation: hadouken-animation 1s linear forwards;
}

.ipad-hint {
  animation: ipad-hint-animation 1s linear forwards;
  animation-delay: 5s;
}

@keyframes ipad-hint-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hadouken-animation {
  0% {
    transform: translateY(-75%) translateX(-100%);
  }
  100% {
    transform: translateY(-75%) translateX(600%);
  }
}
</style>
