import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'

type TiltPanelProps = {
  children: ReactNode
  className?: string
  innerClassName?: string
  style?: CSSProperties
}

export function TiltPanel({ children, className = '', innerClassName = '', style }: TiltPanelProps) {
  const innerRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = innerRef.current

    if (!element) {
      return
    }

    const bounds = element.getBoundingClientRect()
    const percentX = (event.clientX - bounds.left) / bounds.width
    const percentY = (event.clientY - bounds.top) / bounds.height
    const rotateY = (percentX - 0.5) * 9
    const rotateX = (0.5 - percentY) * 8

    element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const reset = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = ''
    }
  }

  return (
    <div className={className} style={style} onMouseMove={handleMouseMove} onMouseLeave={reset} onBlur={reset}>
      <div ref={innerRef} className={innerClassName}>
        {children}
      </div>
    </div>
  )
}