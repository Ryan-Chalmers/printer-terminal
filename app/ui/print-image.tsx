'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { useSelector } from "react-redux"
import { RootState } from "../store"
import entities from "../lib/entity-ids"
import { selectEntityStateByID } from "../lib/home-assistant/ha-entity-states-slice"

type Attributes = {
    access_token: string,
    entity_picture: string,
    friendly_name: string,
}


export default function PrintImage() {

    const entityState = useSelector((state: RootState)=> selectEntityStateByID(state, entities.printImage))
    const HA_URL = process.env.NEXT_PUBLIC_HA_API_URL;

    const [url, setURL] = useState("");

    useEffect(() => {
        // Set up the interval to run every 1000ms (1 second)
        if (entityState) {
            const attributes = entityState.attributes as Attributes;
            setURL(`${HA_URL}${attributes.entity_picture}&timestamp=${new Date().getTime()}`)
        }
    }, [entityState, HA_URL, url]);

    return url ? <Image 
        src={url} 
        alt="Printer camera image"
        width={1000}
        height={750}
        /> : <p>loading</p>
}