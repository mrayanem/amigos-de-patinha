export function scrollToById(id: string, position: ScrollLogicalPosition) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: position,
  })
}
