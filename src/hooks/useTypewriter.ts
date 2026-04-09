import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 140, enabled = true) {
  const [value, setValue] = useState(enabled ? '' : text)

  useEffect(() => {
    if (!enabled) {
      setValue(text)
      return
    }

    setValue('')
    let index = 0

    const interval = window.setInterval(() => {
      index += 1
      setValue(text.slice(0, index))

      if (index >= text.length) {
        window.clearInterval(interval)
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [enabled, speed, text])

  return value
}