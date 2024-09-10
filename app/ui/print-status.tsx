'use client'

import { useSelector } from "react-redux"
import { selectEntityStateByID } from "../lib/home-assistant/ha-entity-states-slice"
import entities from "../lib/entity-ids"
import { RootState } from "../store"


export default function PrintStatus() {

    const entityState = useSelector((state: RootState)=> selectEntityStateByID(state, entities.printStatus))

    return (<p>{entityState ? entityState.state : "Not found"}</p>)
}