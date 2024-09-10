import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Status {
    EMPTY,
    FETCHING_INITIAL,
    FETCHED_INITIAL,
    LISTENING,
}

export type EntityState = {
    entity_id: string,
    state: string,
    attributes: unknown,
    last_changed: string,
  }

// Define a type for the slice state
interface HAEntityStates {
    status: Status,
    states?: {
        [entity_id: string]: EntityState,
    }
}
// Define the initial state using that type
const initialState: HAEntityStates = {
    status: Status.EMPTY,
}

export const haEntityStatesSlice = createSlice({
    name: 'haEntityStates',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateStatus: (state, action: PayloadAction<Status>) => {
            console.log(`Entity states status changed: ${Status[action.payload]}`)
            state.status = action.payload;
        },
        updateEntityState: (state, action: PayloadAction<EntityState>) => {
            // Ignoring any incoming events when stats has not yet been initialized
            if(state.states) {
                state.states[action.payload.entity_id] = action.payload;
            }

        },
        loadInitialData: (state, action: PayloadAction<EntityState[]>) => {
            const statesById = action.payload.reduce<Record<string, EntityState>>((acc, entityState) => {
                acc[entityState.entity_id] = entityState;
                return acc;
              }, {});
            state.states = statesById;
        },
    },
})

export const { loadInitialData, updateStatus, updateEntityState } = haEntityStatesSlice.actions

export const selectEntityStateByID = (state: RootState, id: string) => state.haEntityStates.states ? state.haEntityStates.states[id] : null;
export const selectEntityStates = (state: RootState) => state.haEntityStates

export default haEntityStatesSlice.reducer