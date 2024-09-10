import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "@/app/store"
import { ReadyState } from 'react-use-websocket'

export enum AuthState {
  NONE,
  AUTHENTICATING,
  AUTHENTICATED,
}

// Define a type for the slice state
interface HAConnection {
  readyState: ReadyState,
  authState: AuthState
}
// Define the initial state using that type
const initialState: HAConnection = {
  readyState: ReadyState.UNINSTANTIATED,
  authState: AuthState.NONE,
}

export const haConnectionSlice = createSlice({
  name: 'haConnection',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateReadyState: (state, action: PayloadAction<ReadyState>) => {
      console.log(`Ready state changed: ${ReadyState[action.payload]}`)
      state.readyState = action.payload;
    },
    updateAuthState: (state, action: PayloadAction<AuthState>) => {
      console.log(`Auth state changed: ${AuthState[action.payload]}`)
      state.authState = action.payload;
    },
  },
})

export const { updateReadyState, updateAuthState } = haConnectionSlice.actions

export const selectReadyState = (state: RootState) => state.haConnection.readyState;
export const selectAuthState = (state: RootState) => state.haConnection.authState;

export default haConnectionSlice.reducer