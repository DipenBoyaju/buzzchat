import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
  onlineUser: [],
  expiresAt: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true
      state.currentUser = action.payload.user
      state.token = action.payload.token
      state.expiresAt = action.payload.expiresAt
    },
    removeCredentials: (state) => {
      state.isAuthenticated = false
      state.currentUser = null
      state.token = null
      state.expiresAt = null
    },
    setOnlineuser: (state, action) => {
      state.onlineUser = action.payload
    }
  }
})

export const { setCredentials, removeCredentials, setOnlineuser, setSocketConnection } = authSlice.actions;

export default authSlice.reducer
