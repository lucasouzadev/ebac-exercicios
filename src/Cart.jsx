import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Dialog from './Dialog'
import { money } from './money'
import { removeItem, selectItems, selectTotal } from './cart'

const List = styled.ul`
  list-style: none; padding: 0; display: grid; gap: 12px;
  li { position: relative; display: grid; grid-template-columns: 72px 1fr; gap: 12px; padding: 8px; background: var(--peach); color: var(--ink); }
  img { width: 72px; height: 72px; object-fit: cover; }
  button { position: absolute; right: 6px; bottom: 6px; cursor: pointer; color: var(--ink); background: transparent; border: 0; }
`

const Total = styled.p`
  display: flex; justify-content: space-between; gap: 12px; font-weight: 700; margin-block: 18px;
`

export default function Cart({ onClose }) {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()

  return <Dialog title="Carrinho" onClose={onClose} drawer>
    <h2>Carrinho</h2>
    {items.length === 0 && <p>Seu carrinho está vazio.</p>}
    <List>{items.map(item => <li key={item.lineId}>
      <img src={item.foto} alt="" />
      <div><strong>{item.nome}</strong><p>{money(item.preco)}</p></div>
      <button type="button" aria-label={'Remover ' + item.nome} onClick={() => dispatch(removeItem(item.lineId))}>Remover</button>
    </li>)}</List>
    <Total><span>Valor total</span><span>{money(total)}</span></Total>
  </Dialog>
}
