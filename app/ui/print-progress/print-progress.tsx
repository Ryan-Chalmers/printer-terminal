import { useSelector } from "react-redux"
import { RootState } from "../../store"
import entities from "../../lib/entity-ids"
import { selectEntityStateByID } from "../../lib/home-assistant/ha-entity-states-slice"

export default function PrintProgress() {
    const printProgress = useSelector((state: RootState)=> selectEntityStateByID(state, entities.printProgress))

    return (<p>{printProgress ? printProgress.state : "Not found"}</p>)
}