import React from 'react'
import styled from 'styled-components'
import Dialog from './Dialog'
import { Button } from './styles'
import { money } from './money'

const Detail = styled.div`
  display: grid; grid-template-columns: minmax(160px, 280px) 1fr; gap: 24px;
  img { width: 100%; aspect-ratio: 1; object-fit: cover; }
  p { margin: 12px 0; color: #311212; }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    img { max-height: 220px; }
  }
`

export default function ProductDetails({ product, onClose, onAdd }) {
  return <Dialog title={product.nome} onClose={onClose}>
    <Detail>
      <img src={product.foto} alt="" />
      <div>
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <p>Serve {product.porcao}</p>
        <p><strong>{money(product.preco)}</strong></p>
        <Button onClick={onAdd}>Adicionar ao carrinho · {money(product.preco)}</Button>
      </div>
    </Detail>
  </Dialog>
}
