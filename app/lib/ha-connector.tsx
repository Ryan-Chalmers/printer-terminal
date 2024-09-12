import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { AuthState, selectAuthState, updateAuthState, updateReadyState } from "./home-assistant/ha-connection-slice";
import { addLogEvent } from "./event-log-slice";
import { AuthEvent, ConnectionEvent } from "./log-event";

type Message = {
    type: string,
}

type Props = { children: React.ReactNode }

export default function HomeAssistantConnector({ children }: Props) {
    const WS_URL = process.env.NEXT_PUBLIC_HA_WEBOOK_URL ?? "";
    const dispatch = useDispatch();
    const authState = useSelector(selectAuthState)

    // Initialize the web socket
    const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        shouldReconnect: () => true,
    });

    // Run when the connection state (readyState) changes
    useEffect(() => {
        dispatch(updateReadyState(readyState))
        dispatch(addLogEvent(new ConnectionEvent(readyState)))
    }, [dispatch, readyState])

    useEffect(()=>{
        dispatch(addLogEvent(new AuthEvent(authState)))
    }, [dispatch,authState])

    // Checks for authentication update messages and updates state
    useEffect(() => {
        const message: Message = lastJsonMessage as Message;
        if (message) {
            if (message.type === 'auth_required') {
                const HA_API_KEY = process.env.NEXT_PUBLIC_HA_API_KEY;
                dispatch(updateAuthState(AuthState.NONE));
                sendJsonMessage({
                    type: "auth",
                    access_token: HA_API_KEY
                })
                dispatch(updateAuthState(AuthState.AUTHENTICATING));
            } else if (message.type === 'auth_ok') {
                dispatch(updateAuthState(AuthState.AUTHENTICATED));
            }

        }

    }, [lastJsonMessage, dispatch, sendJsonMessage])

    return <>{children}</>

}