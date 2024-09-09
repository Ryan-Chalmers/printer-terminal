'use client'

import { useEffect, useState } from "react"
import { useWebSocketEvents } from "../lib/WebSocketProvider"

export default function PrintStatus() {

    const event = useWebSocketEvents()
    const [message, setMessage] = useState("");

    useEffect(()=>{
        if (event !== null) {
           setMessage(JSON.stringify(event));
        }
    }, [message, event])

    return (<p>{message}</p>)
}