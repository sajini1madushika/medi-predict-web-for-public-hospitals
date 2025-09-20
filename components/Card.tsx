import { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
  className?: string
}

const Card = ({ title, children, className }: Props) => {
  return (
    <section className={`card p-4 ${className ?? ''}`}>
      {title && <h3 className="mb-3 text-base font-semibold tracking-wide text-white/90">{title}</h3>}
      {children}
    </section>
  )
}

export default Card