<script setup lang="ts">
  import { ref, onUpdated, onMounted } from 'vue'
  import { onClickOutside, onKeyStroke, useScrollLock } from '@vueuse/core'
  import ResultGame from '@/components/card/ResultGame.vue'

  const props = defineProps({
    show: Boolean
  })
  const emit = defineEmits(['close-modal'])
  const isLocked = useScrollLock(document.body)
  onUpdated(() => {
    if (props.show) {
      isLocked.value = true
      // on click ESCAPE key
      onKeyStroke(['Escape'], () => {
        emit('close-modal')
      })
    } else {
      isLocked.value = false
    }
  })
  onMounted(() => {
    if (props.show) {
      isLocked.value = true
      // on click ESCAPE key
      onKeyStroke(['Escape'], () => {
        emit('close-modal')
      })
    } else {
      isLocked.value = false
    }
  })
  const modal = ref(null)
  onClickOutside(modal, () => {
    emit('close-modal')
  })
</script>

<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div
        v-show="props.show"
        class="modal-mask"
      >
        <div
          class="modal-wrapper"
          ref="modal"
        >
          <button
            type="button"
            class="btn-close"
            @click="$emit('close-modal')"
          >
            <span class="icon-cross"></span>
          </button>

          <div class="modal-container">
            <Suspense>
              <ResultGame />
            </Suspense>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .modal-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.6);
    transition: opacity 0.7s ease;
    overflow: show;
  }
  .modal-wrapper {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: whitesmoke;
    border-radius: 0.7em;
    /* overflow: auto !important; */
    overflow: show;
    padding: 1em;
    width: max-content;
    height: max-content;
  }
  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
  .modal-enter-from {
    opacity: 0;
  }
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.9);
    transform: none;
  }
  /* @media (max-width: 1280px) {
  .modal-wrapper {
    padding: 10px;
    width: 90%;
  }
} */
  /* CLOSE BUTTON */
  .btn-close {
    position: absolute;
    top: -35px;
    right: -35px;
    margin: 0;
    border: 0;
    padding: 0;
    background: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 300ms ease;
  }
  .btn-close .icon-cross {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    position: relative;
    width: 30px;
    height: 30px;
  }
  .btn-close .icon-cross:before,
  .btn-close .icon-cross:after {
    content: '';
    position: absolute;
    top: 13px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: black;
    border-radius: 6px;
  }
  .btn-close .icon-cross:before {
    transform: rotate(45deg);
  }
  .btn-close .icon-cross:after {
    transform: rotate(-45deg);
  }
  .btn-close .icon-cross span {
    display: block;
  }
  .btn-close:hover,
  .btn-close:focus {
    /* transform: rotateZ(90deg); */
    background-color: crimson;
  }
</style>
