import { Ref, ref } from "vue"

export function useDrag(list: Ref<{ id: string; order: number }[]>) {
  const isDragged = ref(false)
  const listRef = ref<HTMLElement | null>(null)
  const draggableContainer = ref<HTMLElement | null>(null)
  const originalElement = ref<HTMLElement | null>(null)
  const draggableElement = ref<HTMLElement | null>(null)

  function handleDrag(e: PointerEvent, id: string) {
    if (!isDragged.value) {
      isDragged.value = true

      cloneElement(e, id)

      document.addEventListener("pointerup", handleCancel)
      document.addEventListener("pointermove", handleMove)
    }
  }

  function handleCancel() {
    if (!originalElement.value || !draggableElement.value || !draggableContainer.value) return

    isDragged.value = false

    originalElement.value.style.height = `auto`
    originalElement.value.style.width = `auto`
    originalElement.value.classList.remove("drag-blur")
    originalElement.value = null

    draggableContainer.value.style.left = "0px"
    draggableContainer.value.style.top = "0px"
    draggableContainer.value.removeChild(draggableElement.value as Node)
    draggableElement.value?.remove()
    draggableElement.value = null

    document.removeEventListener("pointermove", handleMove)
  }

  function cloneElement(e: PointerEvent, id: string) {
    const element = document.getElementById(id)
    if (!element) return

    draggableElement.value = element.cloneNode(true) as HTMLElement
    originalElement.value = element

    if (draggableContainer.value) {
      const originalElementRect = originalElement.value.getBoundingClientRect()
      originalElement.value.style.height = `${originalElementRect.height}px`
      originalElement.value.style.width = `${originalElementRect.width}px`
      originalElement.value.classList.add("drag-blur")

      draggableElement.value.style.height = `${originalElementRect.height}px`
      draggableElement.value.style.width = `${originalElementRect.width}px`
      draggableContainer.value.appendChild(draggableElement.value)
      draggableContainer.value.style.left = `${e.pageX}px`
      draggableContainer.value.style.top = `${e.pageY}px`

      const elementRect = originalElement.value.getBoundingClientRect()
      const offsetX = e.clientX - elementRect.left
      const offsetY = e.clientY - elementRect.top
      draggableContainer.value.style.transform = `translate(${-offsetX}px, ${-offsetY}px) rotate(5deg)`
    }
  }

  function handleMove(e: PointerEvent) {
    if (draggableContainer.value) {
      draggableContainer.value.style.left = `${e.pageX}px`
      draggableContainer.value.style.top = `${e.pageY}px`
    }

    if (listRef.value) {
      const box = listRef.value.getBoundingClientRect()

      const xBound = e.clientX < box.right && e.clientX > box.left
      const yBound = e.clientY > box.top && e.clientY < box.bottom

      if (xBound && yBound) {
        const closestDrop = findClosestDroppableElement(e)
        if (!closestDrop || !originalElement.value) return

        const closestElementId = closestDrop.getAttribute("id")
        const originalElementId = originalElement.value.getAttribute("id")

        const closestElementIndex = list.value.findIndex((i) => i.id === closestElementId)
        const originalElementIndex = list.value.findIndex((i) => i.id === originalElementId)

        if (closestElementIndex === -1 && originalElementIndex === -1) return

        const tempOrder = list.value[closestElementIndex].order
        list.value[closestElementIndex].order = list.value[originalElementIndex].order
        list.value[originalElementIndex].order = tempOrder
      }
    }
  }

  function findClosestDroppableElement(e: PointerEvent) {
    if (!listRef.value) return

    const droppableElements = [...listRef.value.querySelectorAll(".card")]

    return droppableElements.reduce<{
      offsetY: number
      child?: Element
    }>(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offsetY = e.clientY - box.top - box.height / 2

        const isClosestY = offsetY < 0 && offsetY > closest.offsetY
        if (isClosestY) {
          return { offsetY, child }
        } else {
          return closest
        }
      },
      { offsetY: Number.NEGATIVE_INFINITY }
    ).child
  }

  return {
    listRef,
    draggableContainer,
    originalElement,
    draggableElement,
    handleDrag,
    isDragged
  }
}
