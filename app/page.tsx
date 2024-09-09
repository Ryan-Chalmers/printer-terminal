'use client'
import EntityStateWrapper from "./lib/entity-state-wrapper";
import EntityStateProvider from "./lib/entity-state-provider";
import styles from "./page.module.css";
import PrintStatus from "./ui/print-status";
import PrintImage from "./ui/print-image";
import entityIDs from "./lib/entity-ids";


export default function Home() {

  return (
    <div className={styles.page}>
      <EntityStateProvider>
        <h1>Printer Terminal</h1>
        <EntityStateWrapper entityID={entityIDs.printImage}>
          <PrintImage/>
        </EntityStateWrapper>
        <EntityStateWrapper entityID={entityIDs.printStatus}>
          <PrintStatus/>
        </EntityStateWrapper>
        <EntityStateWrapper entityID={entityIDs.printStage}>
          <PrintStatus/>
        </EntityStateWrapper>
      </EntityStateProvider>
    </div>
  );
}
