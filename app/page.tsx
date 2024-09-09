'use client'
import WebSocketProvider from "./lib/WebSocketProvider";
import styles from "./page.module.css";
import PrintStatus from "./ui/PrintStatus";

export default function Home() {

  return (
    <div className={styles.page}>
      <WebSocketProvider>
        <h1>Printer Terminal</h1>
        <PrintStatus/>
      </WebSocketProvider>
    </div>
  );
}
