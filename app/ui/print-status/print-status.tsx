'use client'

import entities from "@/app/lib/entities"
import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice"
import { RootState } from "@/app/store"
import { useSelector } from "react-redux"



export default function PrintStatus() {

    const printStatus = useSelector((state: RootState)=> selectEntityStateByID(state, "sensor.p1p_01s00c450400639_print_status"))

    return (<p>{printStatus ? printStatus.state : "Not found"}</p>)
}