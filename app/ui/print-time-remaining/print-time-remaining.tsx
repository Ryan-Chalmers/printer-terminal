import entities from "@/app/lib/entities"
import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice"
import { RootState } from "@/app/store"
import { useSelector } from "react-redux"


export default function PrintTimeRemaining() {
    const printTimeRemaining = useSelector((state: RootState)=> selectEntityStateByID(state, "sensor.p1p_01s00c450400639_remaining_time"))

    return (<p>{printTimeRemaining ? printTimeRemaining.state : "Not found"}</p>)
}