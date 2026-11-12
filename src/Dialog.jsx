import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Surface = styled.dialog`
  color: var(--peach); background: var(--coral); border: 0; padding: 32px;
  width: min(1024px, calc(100% - 28px)); max-width: none; max-height: 90dvh; overflow: auto;
  &::backdrop { background: #000c; }
  &[data-drawer] { inset: 0 0 0 auto; margin: 0; width: min(360px, 100%); padding: 32px 8px 16px; height: 100dvh; max-height: 100dvh; max-width: 100%; }
  &[data-drawer] h2 { font-size: 16px; }
  .close { position: absolute; top: 5px; right: 6px; border: 0; background: transparent; color: var(--peach); font-size: 24px; line-height: 1; cursor: pointer; }
`

export default function Dialog({ title, onClose, children, drawer = false, busy = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  return <Surface
    ref={ref}
    aria-label={title}
    data-drawer={drawer || undefined}
    onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
    onClick={event => {
      if (event.target !== event.currentTarget || busy) return
      const box = event.currentTarget.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose()
    }}
  >
    <button className="close" type="button" aria-label="Fechar" onClick={onClose} disabled={busy}>×</button>
    {children}
  </Surface>
}
