'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { EntityState, useEntityStatesContext } from "./entity-state-provider"

type Props = {
    entityID: string,
    children: React.ReactNode,
}

const EntityStateContext = createContext<EntityState | undefined>(undefined);

export default function EntityStateWrapper(props: Props) {

    const states = useEntityStatesContext()
    const [entityState, setEntityState] = useState<EntityState>()
    const [lastChanged, setLastChanged] = useState<Date>()

    useEffect(()=>{
        if (states) {

            // Look for the entity in states
           const newEntityState: EntityState = states[props.entityID]

           if(newEntityState) {
            // If last changed not found, set it and update the entity state
            if(!lastChanged) {
                setLastChanged(new Date(newEntityState.last_changed))
                setEntityState(newEntityState)
                
            // If last changed is newer then previous, update entity and last changed
            } else {
                const newLastChanged = new Date(newEntityState.last_changed)
                if(newLastChanged > lastChanged) {
                    setLastChanged(newLastChanged);
                    setEntityState(newEntityState)
                }
            }
           }
        }
    }, [entityState, states])

    return (<EntityStateContext.Provider value={entityState}>
        {props.children}
    </EntityStateContext.Provider>)
}

export const useEntityStateContext = () => useContext(EntityStateContext);