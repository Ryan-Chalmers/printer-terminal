import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LogEvent } from "./log-event";


const initialState: LogEvent[] = [{
    eventType: "initializing",
    timestamp: new Date().toISOString(),
    message: "Initializing log..."
}];

export const eventLogSlice = createSlice({
    name: 'eventLog',
    initialState: initialState,
    reducers: {
        addLogEvent: (state, action: PayloadAction<LogEvent>)=>{
            state.push(action.payload);
            console.log(state);
        }
    }
})

export const {addLogEvent} = eventLogSlice.actions;

export const selectEventLog = (state: RootState) => state.eventLog;

export default eventLogSlice.reducer;