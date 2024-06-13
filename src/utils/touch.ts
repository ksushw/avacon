let startY = 0
const MOVE_THRESHOLD = 10
export function handleTouchStart(e: TouchEvent) {
  startY = e.touches[0].clientY
}
export function handleTouchMove(e: TouchEvent) {
  const currentY = e.touches[0].clientY
  if (currentY > startY + MOVE_THRESHOLD) {
    e.preventDefault()
    e.stopPropagation()
  }
}

export function touchInit() {
  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)
}

export function touchRemove() {
  document.removeEventListener('touchstart', handleTouchStart, false)
  document.removeEventListener('touchmove', handleTouchMove, false)
}