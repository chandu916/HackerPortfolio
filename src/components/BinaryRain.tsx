type BinaryRainProps = {
  active?: boolean
}

const columns = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${index * 5.8}%`,
  duration: `${12 + (index % 5) * 1.8}s`,
  delay: `${(index % 6) * -1.4}s`,
  content: Array.from({ length: 22 }, (_, bitIndex) => ((index + bitIndex) % 2 === 0 ? '0' : '1')).join(' '),
}))

export function BinaryRain({ active = false }: BinaryRainProps) {
  return (
    <div className={`binary-rain ${active ? 'is-active' : ''}`} aria-hidden="true">
      {columns.map((column) => (
        <span
          key={column.id}
          className="binary-column"
          style={{
            left: column.left,
            animationDuration: column.duration,
            animationDelay: column.delay,
          }}
        >
          {column.content}
        </span>
      ))}
    </div>
  )
}