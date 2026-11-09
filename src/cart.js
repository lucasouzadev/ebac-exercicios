import { configureStore, createSlice } from '@reduxjs/toolkit'

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: {
      prepare(product) {
        return { payload: { ...product, lineId: crypto.randomUUID() } }
      },
      reducer(items, { payload }) {
        items.push(payload)
      }
    },
    clearCart() { return [] },
    removeItem(items, { payload }) {
      return items.filter(item => item.lineId !== payload)
    }
  }
})

export const { addItem, clearCart, removeItem } = cart.actions
export const selectItems = state => state.cart
export const selectTotal = state =>
  selectItems(state).reduce((total, item) => total + Math.round(item.preco * 100), 0) / 100

export const store = configureStore({ reducer: { cart: cart.reducer } })
