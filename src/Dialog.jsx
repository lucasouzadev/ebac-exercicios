import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Surface = styled.dialog`
  color: white; background: #e66767; border: 0; padding: 32px;
  width: min(1024px, calc(100% - 28px)); max-width: none; max-height: 90dvh; overflow: auto;
  &::backdrop { background: #000c; }
  &[data-drawer] { inset: 0 0 0 auto; margin: 0; width: min(360px, 100%); height: 100dvh; max-height: 100dvh; max-width: 100%; }
  .close { display: block; margin: -15px -15px 6px auto; border: 0; background: transparent; color: white; font-size: 24px; cursor: pointer; }
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
