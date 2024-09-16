import { selectEventLog } from "@/app/lib/event-log-slice";
import { useSelector } from "react-redux";
import styles from "@/app/ui/event-log/event-log.module.css"

export default function EventLog() {
    const eventLog = useSelector(selectEventLog)


    return (
        <div className={styles.logContainer}>
          {eventLog.slice().reverse().map((log, index) => (
            <div key={index} className={styles.logEntry}>{`$ ${log.message}`}</div>
          ))}
        </div>
      );

}