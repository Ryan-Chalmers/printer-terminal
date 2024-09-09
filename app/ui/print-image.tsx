'use client'

import { useEntityStateContext } from "../lib/entity-state-wrapper"


export default function PrintImage() {

    const state = useEntityStateContext()

    return (<p>{state?.state}</p>)
}