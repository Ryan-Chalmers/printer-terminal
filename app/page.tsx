'use client'

import { Provider } from "react-redux";
import styles from "./page.module.css";
import { store } from "./store";
import HomeAssistantConnector from "./lib/ha-connector";
import HAEntityStateProvider from "./lib/ha-entity-state-provider";
import PrintImage from "./ui/print-image/print-image";
import PrintProgress from "./ui/print-progress/print-progress";
import PrintStatus from "./ui/print-status/print-status";
import PrintTimeRemaining from "./ui/print-time-remaining/print-time-remaining";
import EventLog from "./ui/event-log/event-log";


export default function Home() {

  return (
    <div className={styles.page}>
      <Provider store={store}>
        <HomeAssistantConnector>
          <HAEntityStateProvider>
            {/* <div className={styles.gridContainer}> */}
            <PrintImage/>
            <EventLog/>
            <PrintStatus/>
            <PrintTimeRemaining/>
            <PrintProgress/>
            {/* {/* </div> */}
          </HAEntityStateProvider>
        </HomeAssistantConnector>
      </Provider>
    </div>
  );
}
