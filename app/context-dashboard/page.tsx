"use client"

import EntityStateProvider from "../lib/entity-state-provider";
import EntityStateWrapper from "../lib/entity-state-wrapper";
import PrintImage from "../ui/print-image";
import entities from "../lib/entity-ids";
import PrintStatus from "../ui/print-status";

export default function Page() {
    return (<EntityStateProvider>
        <h1>Printer Terminal</h1>
        <EntityStateWrapper entityID={entities.printImage}>
            <PrintImage />
        </EntityStateWrapper>
        <EntityStateWrapper entityID={entities.printStatus}>
            <PrintStatus />
        </EntityStateWrapper>
        <EntityStateWrapper entityID={entities.printStage}>
            <PrintStatus />
        </EntityStateWrapper>
    </EntityStateProvider>)
}