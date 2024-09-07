import styles from "./page.module.css";
import PrintStage from "./ui/PrintStage";
import PrintStatus from "./ui/PrintStatus";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Printer Terminal</h1>
      <PrintStatus/>
      <PrintStage/>
    </div>
  );
}
