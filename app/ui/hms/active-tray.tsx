import styles from "@/app/ui/hms/hms.module.css"

export default function ActiveTray() {
    return (<div>
        <span className={styles.subtitle}>Active Tray </span>
        <span className={styles.content}>[ ] [ ] [X] [ ] </span>
    </div>)
}