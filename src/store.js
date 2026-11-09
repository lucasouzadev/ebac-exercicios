import { configureStore, createSlice } from '@reduxjs/toolkit'

const contacts = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    add(state, { payload }) {
      state.push(payload)
    },
    edit(state, { payload }) {
      const index = state.findIndex(contact => contact.id === payload.id)
      if (index !== -1) state[index] = payload
    },
    remove(state, { payload }) {
      return state.filter(contact => contact.id !== payload)
    }
  }
})

export const { add, edit, remove } = contacts.actions
export const store = configureStore({ reducer: { contacts: contacts.reducer } })
