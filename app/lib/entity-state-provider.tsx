import { useState, useEffect, createContext, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type AuthResponse = {
  type: string,
}

type FetchResult = {
  id: number,
  type: string,
  success: boolean,
  result: EntityState[]
}

type EntityStateChange = {
  type: string,
  event: {
    event_type: string,
    data: {
      entity_id: string,
      new_state: EntityState,
    }
  }
}

export type EntityState = {
  entity_id: string,
  state: string,
  attributes: unknown,
  last_changed: string,
}

type Props = { children: React.ReactNode }

const EntityStatesContext = createContext<{[entity_id: string]: EntityState} | null>(null);


const EntityStateProvider = ({ children }: Props) => {

  const WS_URL = process.env.NEXT_PUBLIC_HA_WEBOOK_URL ?? "";

  const stateFetchID = 18;
  const stateSubscriptionID = 25;
  const [authorized, setAuthorized] = useState(false);
  const [initialStateFetched, setInitialStateFetched] = useState(false);
  const [entityStates, setEntityStates] = useState<{[entity_id: string]: EntityState} | null>(null);

  // Initialize the web socket
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
  });

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed")
    if (readyState === ReadyState.OPEN) {
      console.log("Requsting authorization")
      const HA_API_KEY = process.env.NEXT_PUBLIC_HA_API_KEY;
      console.log(HA_API_KEY);
      sendJsonMessage({
        type: "auth",
        access_token: HA_API_KEY
      })
    }
  }, [readyState, sendJsonMessage])

  // Gets initial states when authorization is successful
  useEffect(() => {
    if (authorized) {
      console.log("Successful authorization")
      console.log("Fetching initial data...")
      sendJsonMessage({
        id: stateFetchID,
        type: "get_states"
      })
    }
  }, [authorized, sendJsonMessage])

  // Check for authorization message and set authorized
  useEffect(() => {
    if (!authorized) {
      if (typeof lastJsonMessage === "object" && lastJsonMessage !== null) {
        // Wait for successful authorization, then fetch initial states
        const message = lastJsonMessage as AuthResponse;

        if (message.type === "auth_ok") {
          setAuthorized(true);
        }
      }
    }
  }, [lastJsonMessage, authorized])

  // Checks for original fetch results, then subscribes to entity state chages
  useEffect(() => {
    if (!initialStateFetched) {
      if (typeof lastJsonMessage === "object" && lastJsonMessage !== null) {
        // Wait for successful authorization, then fetch initial states
        const fetchResult = lastJsonMessage as FetchResult;

        if (fetchResult.id === stateFetchID && fetchResult.success) {
          const statesById = fetchResult.result.reduce<Record<string, EntityState>>((acc, entityState) => {
            acc[entityState.entity_id] = entityState;
            return acc;
          }, {});
          console.log("Initial fetch successful")
          console.log("Receiving events...")
          setEntityStates(statesById)
          setInitialStateFetched(true)
          sendJsonMessage({
            id: stateSubscriptionID,
            type: "subscribe_events",
            event_type: "state_changed"
          })
        }
      }
    }
  }, [lastJsonMessage, sendJsonMessage, initialStateFetched])

  // Gets state changes and updates state array
  useEffect(() => {
    if (initialStateFetched) {
      if (typeof lastJsonMessage === "object" && lastJsonMessage !== null) {
        // Wait for successful authorization, then fetch initial states
        // const stateChange = lastJsonMessage as EntityState;

        const stateChange: EntityStateChange = lastJsonMessage as EntityStateChange;

        if(stateChange.type === "event") {
          // console.log(`New state change: ${JSON.stringify(stateChange.event.data.new_state)}`)
          const updatedState = stateChange.event.data.new_state;
          updatedState.entity_id

          setEntityStates({
            ...entityStates,
            [updatedState.entity_id]: updatedState
          })
        }

      }
    }
  }, [lastJsonMessage, initialStateFetched])

  if (authorized) {
    return (<EntityStatesContext.Provider value={entityStates}>
      {children}
    </EntityStatesContext.Provider>)
  } else {
    return <div>Authorizing...</div>
  }
}

export default EntityStateProvider;

export const useEntityStatesContext = () => useContext(EntityStatesContext);