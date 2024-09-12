import { useSelector } from "react-redux"
import { RootState } from "../../store"
import entities from "../../lib/entities"
import { selectEntityStateByID } from "../../lib/home-assistant/ha-entity-states-slice"

export default function PrintProgress() {
    const printProgress = useSelector((state: RootState)=> selectEntityStateByID(state, "sensor.p1p_01s00c450400639_print_progress"))

    return (<p>{printProgress ? printProgress.state : "Not found"}</p>)
}