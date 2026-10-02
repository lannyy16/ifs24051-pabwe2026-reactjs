import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import auth from './features/auth/states/authSlice'
import users from './features/users/states/userSlice'
import lostFounds from './features/lost-founds/states/lostFoundSlice'

export function makeTestStore(preloadedState) {
  return configureStore({
    reducer: { auth, users, lostFounds },
    preloadedState,
  })
}

export function renderWithProviders(
  ui,
  { route = '/', preloadedState, store = makeTestStore(preloadedState) } = {},
) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  )
}
