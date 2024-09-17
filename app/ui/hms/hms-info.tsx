import styles from "@/app/ui/hms/hms.module.css"
import Humidity from "./humidity"
import ActiveTray from "./active-tray"
import Filament from "./filament"

export default function HMSInfo() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>HMS</div>
            <div className={styles.grid}>
                <Humidity/>
                <ActiveTray/>
                <Filament/>
            </div>
        </div>
    )
}