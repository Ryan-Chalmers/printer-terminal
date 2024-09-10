import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { AuthState, updateAuthState, updateReadyState } from "./ha-connection/ha-connection-slice";

type Message = {
    type: string,
}

type Props = { children: React.ReactNode }

export default function HomeAssistantConnector({ children }: Props) {
    const WS_URL = process.env.NEXT_PUBLIC_HA_WEBOOK_URL ?? "";
    const dispatch = useDispatch();

    // Initialize the web socket
    const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        shouldReconnect: () => true,
    });

    // Run when the connection state (readyState) changes
    useEffect(() => {
        dispatch(updateReadyState(readyState))
    }, [dispatch, readyState])

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