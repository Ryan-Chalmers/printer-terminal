import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "@/app/store"
import { ReadyState } from 'react-use-websocket'

enum AuthState {
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

export const counterSlice = createSlice({
  name: 'haConnection',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateReadyState: (state, action: PayloadAction<ReadyState>) => {
      state.readyState = action.payload;
    },
    updateAuthState: (state, action: PayloadAction<AuthState>) => {
      state.authState = action.payload;
    },
  },
})

export const { updateReadyState, updateAuthState } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const readyState = (state: RootState) => state.haConnection.readyState;
export const authState = (state: RootState) => state.haConnection.authState;

export default counterSlice.reducer