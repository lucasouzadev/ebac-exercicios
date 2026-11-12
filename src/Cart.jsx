import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Dialog from './Dialog'
import Checkout from './Checkout'
import { Button } from './styles'
import { money } from './money'
import { clearCart, removeItem, selectItems, selectTotal } from './cart'

const List = styled.ul`
  list-style: none; margin: 0; padding: 0; display: grid; gap: 16px;
  li { position: relative; display: grid; grid-template-columns: 80px 1fr; gap: 8px; padding: 8px; background: var(--peach); color: var(--coral); }
  img { width: 80px; height: 80px; object-fit: cover; }
  strong { display: block; font-size: 18px; line-height: 1.25; }
  p { margin-top: 8px; }
  button { position: absolute; right: 6px; bottom: 6px; cursor: pointer; color: var(--ink); background: transparent; border: 0; }
`

const Total = styled.p`
  display: flex; justify-content: space-between; gap: 12px; font-weight: 700; margin-block: 28px 12px;
`

const DeliveryButton = styled(Button)`
  width: 100%;
`

export default function Cart({ onClose }) {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()
  const [step, setStep] = useState("cart")
  const [busy, setBusy] = useState(false)

  return <Dialog title="Carrinho e pedido" onClose={onClose} drawer busy={busy}>
    {step === "cart" && <>
      {items.length === 0 && <p>Seu carrinho está vazio.</p>}
      <List>{items.map(item => <li key={item.lineId}>
        <img src={item.foto} alt="" />
        <div><strong>{item.nome}</strong><p>{money(item.preco)}</p></div>
        <button type="button" aria-label={'Remover ' + item.nome} onClick={() => dispatch(removeItem(item.lineId))}>Remover</button>
      </li>)}</List>
      <Total><span>Valor total</span><span>{money(total)}</span></Total>
      {items.length > 0 && <DeliveryButton type="button" onClick={() => setStep("delivery")}>Continuar com a entrega</DeliveryButton>}
    </>}

      {step !== "cart" && <Checkout items={items} total={total} step={step} setStep={setStep}
        busy={busy} setBusy={setBusy} onClose={onClose} onComplete={() => {
          dispatch(clearCart())
          setStep("confirmation")
        }} />}
  </Dialog>
}
