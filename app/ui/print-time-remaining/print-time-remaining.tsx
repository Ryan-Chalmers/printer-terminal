import entities from "@/app/lib/entity-ids"
import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice"
import { RootState } from "@/app/store"
import { useSelector } from "react-redux"


export default function PrintTimeRemaining() {
    const printTimeRemaining = useSelector((state: RootState)=> selectEntityStateByID(state, entities.printTimeRemaining))

    return (<p>{printTimeRemaining ? printTimeRemaining.state : "Not found"}</p>)
}