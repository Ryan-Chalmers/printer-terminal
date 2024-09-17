import { selectEntityStateByID } from "@/app/lib/home-assistant/ha-entity-states-slice"
import { RootState } from "@/app/store"
import styles from "@/app/ui/hms/hms.module.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Humidity() {
    const humidityState = useSelector((state: RootState)=> selectEntityStateByID(state, "sensor.p1p_01s00c450400639_ams_1_humidity_index"))
    const [humidity, setHumidity] = useState(1);
    
    useEffect(()=>{
        if(humidityState){
            setHumidity(Number(humidityState.state))
        }
    }, [humidityState])

    function humidityDisplay(hum: number) {
        const base: string = `[-+--+--+--+--+-]`
        const index: number = (hum * 3) - 1;
        
        return base.substring(0, index) + '|' + base.substring(index+1);
    }

    return (<div>
        <span className={styles.subtitle}>Humidity </span>
        <span className={styles.content}>{humidityDisplay(humidity)}</span>
    </div>)
}