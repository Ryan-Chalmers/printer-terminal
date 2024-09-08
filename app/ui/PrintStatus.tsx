'use client'

import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function PrintStatus() {

    const WS_URL = "ws://192.168.2.27:8123/api/websocket"

    const { sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(WS_URL, {
        share: true,
        shouldReconnect: ()=>true,
      });
    
    // Run when the connection state (readyState) changes
    useEffect(() => {
            sendJsonMessage({
                type: "auth",
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ODk1ZWU5ZDRjNWI0YmRmYmQ2OWE3NjcxNjIxNGIyNSIsImlhdCI6MTcyNTU1MDIyMiwiZXhwIjoyMDQwOTEwMjIyfQ.z7E2wlzyTWQAqEKOUKMaSjGnMbmSBk7cJjkFCICq71o"
            })
        }, [sendJsonMessage])

    return <></>
}