import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice";
import { RootState } from "@/app/store";
import styles from "@/app/ui/hms/hms.module.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ActiveTray() {

    const activeTrayState = useSelector((state: RootState) => selectEntityStateByID(state, "sensor.p1p_01s00c450400639_active_tray_index"))
    const [activeTray, setActiveTray] = useState(0);

    useEffect(() => {
        if (activeTrayState) {
            const indexNumber = Number(activeTrayState.state);
            setActiveTray(!Number.isNaN(indexNumber) ? indexNumber : -1)
        }
    }, [activeTrayState])

    function activeTrayDisplay(trayIndex: number) {
        const base: string = `[ ] [ ] [ ] [ ]`
        if (trayIndex < 0) {
            return base;
        }
        const index: number = 4 * trayIndex + 1
        return base.substring(0, index) + 'X' + base.substring(index + 1);
    }

    return (<div>
        <span className={styles.subtitle}>Active Tray </span>
        <span className={styles.content}>{activeTrayDisplay(activeTray)}</span>
    </div>)
}