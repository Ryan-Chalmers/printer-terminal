import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { AuthState, selectAuthState, selectReadyState } from "./home-assistant/ha-connection-slice";
import { EntityState, loadInitialData, selectEntityStates, Status, updateEntityState, updateStatus } from "./home-assistant/ha-entity-states-slice";
import { addLogEvent } from "./event-log-slice";
import { SensorEvent } from "./log-event";
import entities from "./entities";

type Props = { children: React.ReactNode }

type Message = {
    id?: number,
    type: string,
    success?: string,
    result?: EntityState[],
    event?: {
        event_type: string,
        data: {
            new_state: EntityState
        },
    }
}

export default function HAEntityStateProvider({ children }: Props) {  
    const WS_URL = process.env.NEXT_PUBLIC_HA_WEBOOK_URL ?? "";

    // Connect to web socket
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        shouldReconnect: () => true,
    });

    const stateFetchID = 18;
    const stateSubscriptionID = 25;
    const dispatch = useDispatch();
    const haReadyState = useSelector(selectReadyState)
    const haAuthState = useSelector(selectAuthState)
    const haEntityStates = useSelector(selectEntityStates)

    // Sends the initial data fetch request to the websocket
    useEffect(() => {
        if (haReadyState === ReadyState.OPEN && haAuthState === AuthState.AUTHENTICATED) {
            if (haEntityStates.status === Status.EMPTY) {
                sendJsonMessage({
                    id: stateFetchID,
                    type: "get_states"
                  })
                dispatch(updateStatus(Status.FETCHING_INITIAL))
            }
        }
    }, [haReadyState, haAuthState, dispatch, sendJsonMessage, haEntityStates.status])

    // Awaits results form the initial data fetch and updates state
    useEffect(() => {
        const message: Message = lastJsonMessage as Message;
        if (message && message.type === 'result' && message.id === stateFetchID && message.success && message.result) {
            dispatch(updateStatus(Status.FETCHED_INITIAL));
            dispatch(loadInitialData(message.result))
            sendJsonMessage({
                id: stateSubscriptionID,
                type: "subscribe_events",
                event_type: "state_changed"
              })
            dispatch((updateStatus(Status.LISTENING)))
        }

    }, [lastJsonMessage, dispatch, sendJsonMessage])

    useEffect(() => {
        const message: Message = lastJsonMessage as Message;
        if (haEntityStates.status === Status.LISTENING && message.type === 'event' && message.event) {
            const updatedState = message.event.data.new_state;
            dispatch(updateEntityState(updatedState))
            if (entities[updatedState.entity_id]?.logged) {
                dispatch(addLogEvent(new SensorEvent(updatedState)))
            }
        }
    })

    return children
}