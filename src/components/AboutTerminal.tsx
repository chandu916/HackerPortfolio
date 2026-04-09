import { useEffect, useState } from 'react'
import { terminalLines } from '../data/portfolio'

type AboutTerminalProps = {
  active: boolean
}

export function AboutTerminal({ active }: AboutTerminalProps) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!active) {
      setVisibleLines(0)
      return
    }

    let index = 0

    const interval = window.setInterval(() => {
      index += 1
      setVisibleLines(index)

      if (index >= terminalLines.length) {
        window.clearInterval(interval)
      }
    }, 220)

    return () => window.clearInterval(interval)
  }, [active])

  return (
    <div className="terminal-card">
      <div className="terminal-header" aria-hidden="true">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot is-live" />
      </div>

      <div className="terminal-output">
        {terminalLines.map((line, index) => (
          <div key={line} className={`terminal-line ${visibleLines > index ? 'is-visible' : ''}`}>
            <span>&gt;</span> {line}
          </div>
        ))}
      </div>
    </div>
  )
}