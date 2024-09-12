'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import entities from "../../lib/entities"
import { selectEntityStateByID } from "../../lib/home-assistant/ha-entity-states-slice"
import styles from "@/app/ui/print-image/print-image.module.css"

type Attributes = {
    access_token: string,
    entity_picture: string,
    friendly_name: string,
}


export default function PrintImage() {

    const printImage = useSelector((state: RootState)=> selectEntityStateByID(state, "image.p1p_01s00c450400639_camera"))
    const HA_URL = process.env.NEXT_PUBLIC_HA_API_URL;

    const [url, setURL] = useState("");

    useEffect(() => {
        if (printImage) {
            const attributes = printImage.attributes as Attributes;
            setURL(`${HA_URL}${attributes.entity_picture}&timestamp=${new Date().getTime()}`)
        }
    }, [printImage, HA_URL, url]);

    return url ? <Image className={styles.image}
        src={url} 
        alt="Printer camera image"
        width={1000}
        height={750}
        /> : <p>loading</p>
}