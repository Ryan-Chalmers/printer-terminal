import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice";
import { RootState } from "@/app/store";
import styles from "@/app/ui/hms/hms.module.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Filament() {

    const filamentState = useSelector((state: RootState) => selectEntityStateByID(state, "sensor.p1p_01s00c450400639_active_tray"))
    const [filament, setFilament] = useState("unavailable");

    useEffect(() => {
        if (filamentState) {
            setFilament(filamentState.state)
        }
    }, [filamentState])
    
    return (<div>
        <span className={styles.subtitle}>Filament </span>
        <span className={styles.content}>{filament}</span>
    </div>)
}