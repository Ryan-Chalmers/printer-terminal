import { AuthState } from "./home-assistant/ha-connection-slice";
import { EntityState } from "./home-assistant/ha-entity-states-slice";
import { ReadyState } from "react-use-websocket";

export interface LogEvent {
    eventType: string;
    timestamp: string;
    message: string;
}

export class AuthEvent implements LogEvent {
    eventType: string = "auth_event";
    timestamp: string;
    message: string;

    constructor(state: AuthState) {
        this.timestamp = new Date().toISOString();
        this.message = `Authentication state changed: ${AuthState[state]}`;
    }
}

export class ConnectionEvent implements LogEvent {
    eventType: string = "connection_event";
    timestamp: string;
    message: string;

    constructor(state: ReadyState) {
        this.timestamp = new Date().toISOString();
        this.message = `Connection state change: ${ReadyState[state]}`
    }
}

export class SensorEvent implements LogEvent {
    eventType: string = "sensor_event";
    timestamp: string;
    message: string;
    entityState: EntityState;

    constructor(message: string, entityState: EntityState) {
        this.timestamp = new Date().toISOString();
        this.message = message;
        this.entityState = entityState;
    }
}
