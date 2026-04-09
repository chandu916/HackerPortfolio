import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')

    if (mediaQuery.matches) {
      return undefined
    }

    const updateCursor = (event: MouseEvent) => {
      const x = `${event.clientX}px`
      const y = `${event.clientY}px`

      if (dotRef.current) {
        dotRef.current.style.left = x
        dotRef.current.style.top = y
      }

      if (ringRef.current) {
        ringRef.current.style.left = x
        ringRef.current.style.top = y
      }
    }

    const handlePointerState = (event: MouseEvent) => {
      const target = event.target
      const interactive = target instanceof HTMLElement && target.closest('button, a, input, textarea, label')

      if (ringRef.current) {
        ringRef.current.style.width = interactive ? '3rem' : '2.1rem'
        ringRef.current.style.height = interactive ? '3rem' : '2.1rem'
        ringRef.current.style.background = interactive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 255, 159, 0.06)'
      }
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handlePointerState)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handlePointerState)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}