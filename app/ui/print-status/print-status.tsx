'use client'

import entities from "@/app/lib/entity-ids"
import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice"
import { RootState } from "@/app/store"
import { useSelector } from "react-redux"



export default function PrintStatus() {

    const printStatus = useSelector((state: RootState)=> selectEntityStateByID(state, entities.printStatus.id))

    return (<p>{printStatus ? printStatus.state : "Not found"}</p>)
}