import { useRef, type ButtonHTMLAttributes, type MouseEvent } from 'react'

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current

    if (!button) {
      return
    }

    const bounds = button.getBoundingClientRect()
    const offsetX = event.clientX - (bounds.left + bounds.width / 2)
    const offsetY = event.clientY - (bounds.top + bounds.height / 2)
    button.style.transform = `translate3d(${offsetX * 0.12}px, ${offsetY * 0.12}px, 0)`
  }

  const resetTransform = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = ''
    }
  }

  return (
    <button
      {...props}
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      onBlur={resetTransform}
    >
      <span>{children}</span>
    </button>
  )
}