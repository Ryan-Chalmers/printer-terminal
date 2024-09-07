'use client'

import { fetchPrintStage} from "../lib/actions"
import { useEffect, useState } from "react";

export default function PrintStatus() {
    const [status, setStatus] = useState("");

    const getStatus = async () => {
        const printStatus = await fetchPrintStage();
        setStatus(printStatus);
    }

    useEffect(() => {
        const timer = setInterval(getStatus, 10000);
        return () => clearInterval(timer);
      }, []);
    
    return <h1>Status: {status}</h1>;
}