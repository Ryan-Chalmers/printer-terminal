'use client'

import { useEntityStateContext } from "../lib/entity-state-wrapper"


export default function PrintStatus() {

    const state = useEntityStateContext()
    // const [entityState, setEntityState] = useState("")

    return (<p>{state?.state}</p>)
}