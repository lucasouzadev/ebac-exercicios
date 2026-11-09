import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { API_ROOT } from './catalog'
import { Button } from './styles'
import { money } from './money'

const Form = styled.form`
  display: grid; gap: 10px; margin-top: 12px;
  label { display: grid; gap: 4px; min-width: 0; font-weight: 700; }
  input { min-width: 0; width: 100%; border: 1px solid var(--ink); padding: 7px; background: var(--peach); color: #301919; }
  .actions { display: grid; gap: 8px; margin-top: 8px; }
`

const Pair = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px;
`

const Confirmation = styled.section`
  display: grid; gap: 14px;
`

const defaultAddress = { receiver: '', description: '', city: '', zipCode: '', number: '', complement: '' }

export default function Checkout({ items, total, step, setStep, onComplete, onClose, busy, setBusy }) {
  const [address, setAddress] = useState(defaultAddress)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const submitting = useRef(false)

  function addressField(name, label, props = {}) {
    return <label>{label}<input
      required={name !== 'complement'} value={address[name]}
      onChange={event => setAddress({ ...address, [name]: event.target.value })}
      {...props}
    /></label>
  }

  async function submit(event) {
    event.preventDefault()
    if (submitting.current) return
    const fields = new FormData(event.currentTarget)
    const payload = {
      products: items.map(({ id, preco }) => ({ id, price: preco })),
      delivery: {
        receiver: address.receiver.trim(),
        address: {
          description: address.description.trim(),
          city: address.city.trim(),
          zipCode: address.zipCode,
          number: Number(address.number),
          complement: address.complement.trim()
        }
      },
      payment: {
        card: {
          name: fields.get('name').trim(),
          number: fields.get('number'),
          code: Number(fields.get('code')),
          expires: { month: Number(fields.get('month')), year: Number(fields.get('year')) }
        }
      }
    }

    submitting.current = true
    setBusy(true)
    setError('')
    try {
      const response = await fetch(API_ROOT + '/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) throw new Error('Pedido recusado')
      const confirmation = await response.json()
      if (!confirmation.orderId) throw new Error('Confirmação sem número do pedido')
      setOrderId(confirmation.orderId)
      onComplete()
    } catch {
      setError('Não foi possível confirmar o pedido. Confira os dados e tente novamente.')
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }

  if (step === 'confirmation') return <Confirmation>
    <h2>Pedido realizado · {orderId}</h2>
    <p>Seu pedido foi confirmado. Guarde o número para acompanhar a entrega.</p>
    <Button onClick={onClose}>Concluir</Button>
  </Confirmation>

  if (step === 'delivery') return <>
    <h2>Entrega</h2>
    <Form onSubmit={event => {
      event.preventDefault()
      setStep('payment')
    }}>
      {addressField('receiver', 'Quem irá receber', { autoFocus: true, pattern: '.*\\S.*' })}
      {addressField('description', 'Endereço', { pattern: '.*\\S.*' })}
      {addressField('city', 'Cidade', { pattern: '.*\\S.*' })}
      <Pair>
        {addressField('zipCode', 'CEP', { inputMode: 'numeric', pattern: '[0-9]{8}', maxLength: 8, title: 'Digite oito números' })}
        {addressField('number', 'Número', { type: 'number', min: 0 })}
      </Pair>
      {addressField('complement', 'Complemento (opcional)')}
      <div className="actions">
        <Button type="submit">Continuar com o pagamento</Button>
        <Button type="button" onClick={() => setStep('cart')}>Voltar ao carrinho</Button>
      </div>
    </Form>
  </>

  return <>
    <h2>Pagamento · {money(total)}</h2>
    <p>Exercício da EBAC. Preencha com dados fictícios.</p>
    <Form onSubmit={submit} aria-busy={busy}>
      <label>Nome no cartão<input autoFocus required name="name" pattern={'.*\\S.*'} /></label>
      <Pair>
        <label>Número do cartão<input required name="number" inputMode="numeric" pattern="[0-9]{16}" maxLength={16} /></label>
        <label>CVV<input required name="code" inputMode="numeric" pattern="[0-9]{3,4}" maxLength={4} /></label>
      </Pair>
      <Pair>
        <label>Mês de vencimento<input required name="month" type="number" min={1} max={12} /></label>
        <label>Ano de vencimento<input required name="year" type="number" min={2026} max={2099} /></label>
      </Pair>
      {error && <p role="alert">{error}</p>}
      <div className="actions">
        <Button disabled={busy} type="submit">{busy ? 'Enviando pedido…' : 'Finalizar pedido'}</Button>
        <Button disabled={busy} type="button" onClick={() => { setError(''); setStep('delivery') }}>Voltar à entrega</Button>
      </div>
    </Form>
  </>
}
