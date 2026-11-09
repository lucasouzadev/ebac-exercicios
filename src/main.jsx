import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch, useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import { add, edit, remove, store } from './store'

const Global = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; background: #f7f3e9; color: #192c28; font-family: Verdana, sans-serif; }
  h1, h2 { font-family: Georgia, serif; margin-top: 0; }
  h1 { font-size: clamp(2.5rem, 7vw, 4.75rem); margin-bottom: .4rem; }
  button, input { font: inherit; }
  a { color: inherit; overflow-wrap: anywhere; }
`

const Main = styled.main`
  max-width: 920px; margin: auto; padding: 56px 20px;
  header { border-top: 5px solid #1d5346; padding: 22px 0; }
  header p { color: #3b5b50; }
  section, form { background: #fffdf7; border: 1px solid #cbd4c5; padding: 24px; }
  form { margin-bottom: 20px; }
  ul { list-style: none; margin: 0; padding: 0; }
  li { border-top: 1px solid #cbd4c5; padding: 16px 0; display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; }
  li strong, li a { display: block; margin-bottom: 4px; }
`

const Fields = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(175px, 1fr)); gap: 12px;
  label { display: grid; gap: 6px; }
  input { width: 100%; border: 1px solid #71897e; padding: 10px; background: #fff; color: inherit; }
`

const Actions = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;
  button { padding: 9px 13px; border: 1px solid #1d5346; color: #1d5346; background: transparent; cursor: pointer; }
  button[type=submit] { background: #1d5346; color: white; }
`

const blank = { name: '', email: '', phone: '' }
const fields = [['name', 'Nome completo', 'text'], ['email', 'E-mail', 'email'], ['phone', 'Telefone', 'tel']]

function Agenda() {
  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch()
  const [draft, setDraft] = useState(blank)

  function save(event) {
    event.preventDefault()
    const values = Object.fromEntries(fields.map(([key]) => [key, draft[key].trim()]))
    if (Object.values(values).some(value => !value)) return
    const contact = { ...values, id: draft.id ?? crypto.randomUUID() }
    dispatch(draft.id ? edit(contact) : add(contact))
    setDraft(blank)
  }

  return <Main>
    <header><h1>Agenda de contatos</h1><p>Seu diretório de nomes, e-mails e telefones.</p></header>
    <form onSubmit={save}>
      <h2>{draft.id ? 'Editar contato' : 'Novo contato'}</h2>
      <Fields>{fields.map(([key, label, type]) =>
        <label key={key}>{label}
          <input required type={type} value={draft[key]} onChange={event => setDraft({ ...draft, [key]: event.target.value })} />
        </label>
      )}</Fields>
      <Actions>
        <button type="submit">{draft.id ? 'Salvar alterações' : 'Adicionar contato'}</button>
        {draft.id && <button type="button" onClick={() => setDraft(blank)}>Cancelar</button>}
      </Actions>
    </form>
    <section aria-labelledby="contacts">
      <h2 id="contacts">Contatos ({contacts.length})</h2>
      {contacts.length === 0 && <p>Nenhum contato cadastrado.</p>}
      <ul>{contacts.map(contact => <li key={contact.id}>
        <div><strong>{contact.name}</strong><a href={'mailto:' + contact.email}>{contact.email}</a><a href={'tel:' + contact.phone}>{contact.phone}</a></div>
        <Actions>
          <button type="button" onClick={() => setDraft(contact)}>Editar</button>
          <button type="button" onClick={() => {
            dispatch(remove(contact.id))
            if (draft.id === contact.id) setDraft(blank)
          }}>Remover</button>
        </Actions>
      </li>)}</ul>
    </section>
  </Main>
}

createRoot(document.getElementById('root')).render(<Provider store={store}><Global /><Agenda /></Provider>)
