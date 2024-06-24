import { reactive, ref } from 'vue';


export const useLazyLoading = () => {
  const pageRef = ref<HTMLElement>()
  const params = reactive({
    per_page: 15,
    page: 1
  })

  function onScroll(el: Event, cb: () => void) {
    const target = el.target as HTMLElement
    if (Math.ceil(target.scrollTop) >= target.scrollHeight - target.offsetHeight) {
      cb()
    }
  }

  return {
    pageRef,
    onScroll,
    params
  }
}