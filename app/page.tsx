'use client'

import { Provider } from "react-redux";
import styles from "./page.module.css";
import { store } from "./store";
import HomeAssistantConnector from "./lib/ha-connector";


export default function Home() {

  return (
    <div className={styles.page}>
      <Provider store={store}>
        <HomeAssistantConnector>
          <p>Printer Terminal</p>
        </HomeAssistantConnector>
      </Provider>
    </div>
  );
}
