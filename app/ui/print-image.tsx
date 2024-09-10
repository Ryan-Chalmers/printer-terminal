'use client'

import { useEffect, useState } from "react"
import { useEntityStateContext } from "../lib/entity-state-wrapper"
import Image from 'next/image'

type Attributes = {
    access_token: string,
    entity_picture: string,
    friendly_name: string,
}


export default function PrintImage() {

    const state = useEntityStateContext()
    const HA_URL = process.env.NEXT_PUBLIC_HA_API_URL;

    const [url, setURL] = useState("");

    useEffect(() => {
        // Set up the interval to run every 1000ms (1 second)
        if (state) {
            const attributes = state.attributes as Attributes;
            setURL(`${HA_URL}${attributes.entity_picture}&timestamp=${new Date().getTime()}`)
        }
    }, [state, HA_URL, url]);

    console.log(url);

    return <Image 
        src={url} 
        alt="Printer camera image"
        width={1000}
        height={750}
        />
}