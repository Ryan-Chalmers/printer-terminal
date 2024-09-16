'use client'

import { Provider } from "react-redux";
import styles from "./page.module.css";
import { store } from "./store";
import HomeAssistantConnector from "./lib/ha-connector";
import HAEntityStateProvider from "./lib/ha-entity-state-provider";
import PrintImage from "./ui/print-image/print-image";
import EventLog from "./ui/event-log/event-log";
import PrintProgress from "./ui/print-progress/print-progress";


export default function Home() {

  return (
    <div className={styles.page}>
      <Provider store={store}>
        <HomeAssistantConnector>
          <HAEntityStateProvider>
            <div className={styles.container}>
              <div className={styles.leftSection}>
                <PrintImage/>
                <div className={styles.data}>
                  <PrintProgress/>
                </div>
              </div>
              <div className={styles.rightSection}>
                <div className={styles.logWrapper}>
                  <EventLog/>
                </div>
              </div>
            </div>
          </HAEntityStateProvider>
        </HomeAssistantConnector>
      </Provider>
    </div>
  );
}
