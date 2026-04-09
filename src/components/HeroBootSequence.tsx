import { useEffect, useState } from 'react'
import { MagneticButton } from './MagneticButton'

const bootLines = [
  'Initializing secure interface...',
  'Establishing encrypted connection...',
  'Access granted.',
]

type HeroBootSequenceProps = {
  onAccess: () => void
  onBackgroundActivation: () => void
}

export function HeroBootSequence({ onAccess, onBackgroundActivation }: HeroBootSequenceProps) {
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentLine, setCurrentLine] = useState('')
  const [backgroundActive, setBackgroundActive] = useState(false)
  const [nameVisible, setNameVisible] = useState(false)
  const [roleVisible, setRoleVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [idleState, setIdleState] = useState(false)
  const [typedName, setTypedName] = useState('')

  useEffect(() => {
    if (currentLineIndex >= bootLines.length) {
      return undefined
    }

    const line = bootLines[currentLineIndex]
    let charIndex = 0
    let completionTimeout: number | undefined

    const typingInterval = window.setInterval(() => {
      charIndex += 1
      setCurrentLine(line.slice(0, charIndex))

      if (charIndex >= line.length) {
        window.clearInterval(typingInterval)

        completionTimeout = window.setTimeout(() => {
          setCompletedLines((previous) => [...previous, line])
          setCurrentLine('')
          setCurrentLineIndex((previous) => previous + 1)
        }, 220)
      }
    }, 34)

    return () => {
      window.clearInterval(typingInterval)
      if (completionTimeout) {
        window.clearTimeout(completionTimeout)
      }
    }
  }, [currentLineIndex])

  useEffect(() => {
    if (currentLineIndex < bootLines.length) {
      return undefined
    }

    const timers = [
      window.setTimeout(() => {
        setBackgroundActive(true)
        onBackgroundActivation()
      }, 120),
      window.setTimeout(() => setNameVisible(true), 500),
      window.setTimeout(() => setRoleVisible(true), 1300),
      window.setTimeout(() => setCtaVisible(true), 1700),
      window.setTimeout(() => setIdleState(true), 2250),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [currentLineIndex, onBackgroundActivation])

  useEffect(() => {
    if (!nameVisible) {
      return undefined
    }

    const target = 'CHANDU'
    let charIndex = 0

    const typingInterval = window.setInterval(() => {
      charIndex += 1
      setTypedName(target.slice(0, charIndex))

      if (charIndex >= target.length) {
        window.clearInterval(typingInterval)
      }
    }, 140)

    return () => window.clearInterval(typingInterval)
  }, [nameVisible])

  return (
    <div
      className={[
        'hero-boot',
        backgroundActive ? 'is-background-active' : '',
        idleState ? 'is-idle' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`hero-blackout ${backgroundActive ? 'is-clearing' : ''}`} aria-hidden="true" />

      <div className="hero-console">
        <div className="hero-console__header">
          <div className="hero-console__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="hero-console__label">SYSTEM_BOOT.LOG</span>
        </div>

        <div className="hero-console__body terminal-flicker">
          {completedLines.map((line) => (
            <p key={line} className="hero-console__line is-complete">
              <span>&gt;</span> {line}
            </p>
          ))}
          {currentLineIndex < bootLines.length && (
            <p className="hero-console__line is-active">
              <span>&gt;</span> {currentLine}
              <span className="hero-console__cursor">_</span>
            </p>
          )}
        </div>
      </div>

      <div className={`hero-identity ${idleState ? 'is-floating' : ''}`}>
        <p className={`hero-kicker hero-boot__kicker ${backgroundActive ? 'is-visible' : ''}`}>
          SECURE INTERFACE / AUTHORIZED SESSION
        </p>

        <h1 className={`hero-name hero-boot__name ${nameVisible ? 'is-visible' : ''}`}>
          {typedName}
          <span className="hero-caret">_</span>
        </h1>

        <p className={`hero-role ${roleVisible ? 'is-visible' : ''}`}>
          Cyber Security Engineer
        </p>

        <MagneticButton
          className={`cta-button hero-boot__cta ${ctaVisible ? 'is-visible' : ''}`}
          onClick={onAccess}
        >
          &gt; Access Portfolio
        </MagneticButton>
      </div>
    </div>
  )
}