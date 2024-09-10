import { configureStore } from '@reduxjs/toolkit'
import haConnectionReducer from '@/app/lib/home-assistant/ha-connection-slice'
import haEntityStatesReducer from '@/app/lib/home-assistant/ha-entity-states-slice'

export const store = configureStore({
  reducer: {
    haConnection: haConnectionReducer,
    haEntityStates: haEntityStatesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch