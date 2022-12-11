import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target: any, event: Event, callback: Function) {
  onMounted(() => {
    target.addEventListener(event, callback)
  })

  onUnmounted(() => {
    target.removeEventListener(event, callback)
  })
}

// example of usage
// mouse.js
// import { ref } from 'vue'
// import { useEventListener } from './event'

// export function useMouse() {
//   const x = ref(0)
//   const y = ref(0)

//   useEventListener(window, 'mousemove', (event) => {
//     x.value = event.pageX
//     y.value = event.pageY
//   })

//   return { x, y }
// }
