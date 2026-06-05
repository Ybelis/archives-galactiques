import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a container ref.
 * Adds `.is-visible` on every child (or the element itself) that has
 * `.ag-reveal`, `.ag-reveal--fade`, or `.ag-reveal-stagger`.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>()
 *   <div ref={ref} className="ag-reveal">…</div>
 *
 * Or on a section that wraps multiple ag-reveal children:
 *   const ref = useReveal<HTMLElement>({ selector: '.ag-reveal, .ag-reveal-stagger' })
 */
export function useReveal<T extends Element>(options?: {
  threshold?: number
  rootMargin?: string
  selector?: string
  once?: boolean
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      threshold = 0.12,
      rootMargin = '0px 0px -40px 0px',
      selector = '.ag-reveal, .ag-reveal--fade, .ag-reveal-stagger',
      once = true,
    } = options ?? {}

    const targets: Element[] = el.matches(selector)
      ? [el]
      : Array.from(el.querySelectorAll(selector))

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold, rootMargin }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}
