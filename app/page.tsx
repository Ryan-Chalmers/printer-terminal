'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import useWebSocket, { ReadyState } from "react-use-websocket";

type AuthResponse = {
  type: string,
}

export default function Home() {
  const WS_URL = "ws://192.168.2.27:8123/api/websocket"
  const [authorized, setAuthorized] = useState(false);

  const { sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: ()=>true,
  });

    // Run when the connection state (readyState) changes
    useEffect(() => {
      console.log("Connection state changed")
      if (readyState === ReadyState.OPEN) {
        sendJsonMessage({
          type: "auth",
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ODk1ZWU5ZDRjNWI0YmRmYmQ2OWE3NjcxNjIxNGIyNSIsImlhdCI6MTcyNTU1MDIyMiwiZXhwIjoyMDQwOTEwMjIyfQ.z7E2wlzyTWQAqEKOUKMaSjGnMbmSBk7cJjkFCICq71o"
        })
      }
    }, [readyState, sendJsonMessage])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
      if(typeof lastJsonMessage === "object" && lastJsonMessage !== null) {
        console.log(`Got a new message: ${JSON.stringify(lastJsonMessage)}`)
        const message = lastJsonMessage as AuthResponse;

        if (message.type === "auth_ok") {
          setAuthorized(true);
        }
        
      }

    }, [lastJsonMessage])

    useEffect(()=>{
      if(authorized) {
        sendJsonMessage({
          id: 18,
          type: "subscribe_events",
        })
      }
    }, [authorized, sendJsonMessage])

  return (
    <div className={styles.page}>
      <h1>Printer Terminal</h1>
    </div>
  );
}
