'use client'

import { Provider } from "react-redux";
import styles from "./page.module.css";
import { store } from "./store";
import HomeAssistantConnector from "./lib/ha-connector";
import HAEntityStateProvider from "./lib/ha-entity-state-provider";
import PrintStatus from "./ui/print-status";
import PrintImage from "./ui/print-image";


export default function Home() {

  return (
    <div className={styles.page}>
      <Provider store={store}>
        <HomeAssistantConnector>
          <HAEntityStateProvider>
            <p>Printer Terminal</p>
            <PrintImage/>
            <PrintStatus/>
          </HAEntityStateProvider>
        </HomeAssistantConnector>
      </Provider>
    </div>
  );
}
