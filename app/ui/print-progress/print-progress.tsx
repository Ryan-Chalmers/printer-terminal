import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { selectEntityStateByID } from "../../lib/home-assistant/ha-entity-states-slice"
import styles from "@/app/ui/print-progress/print-progress.module.css"
import { useEffect, useState } from "react";

type TimeRemainingAttributes = {
    unit_of_measurement: string
}
export default function PrintProgress() {
    const BAR_SIZE = 25;
    const [progress, setProgress] = useState(0);
    const [unitOfMeasurement, setUnitOfMeasurement] = useState("min");
    
    const printProgress = useSelector((state: RootState)=> selectEntityStateByID(state, "sensor.p1p_01s00c450400639_print_progress"))
    const totalLayers = useSelector((state: RootState) => selectEntityStateByID(state, "sensor.p1p_01s00c450400639_total_layer_count"))
    const currentLayer = useSelector((state: RootState) => selectEntityStateByID(state, "sensor.p1p_01s00c450400639_current_layer"))
    const timeRemaining = useSelector((state: RootState) => selectEntityStateByID(state, "sensor.p1p_01s00c450400639_remaining_time"))

    function generateProgressBar(progress: number): string {
        const empty = '-'
        const full = '+'
        const start = full.repeat(Math.round(BAR_SIZE * progress));
        const end = empty.repeat(Math.round(BAR_SIZE * (1 - progress)));
        return start + end;
    }

    useEffect(()=>{
        if(printProgress?.state) {
            setProgress(Number(printProgress?.state)/100)
        }
    }, [printProgress])

    useEffect(()=> {
        if(timeRemaining?.state) {
            const attributes = timeRemaining.attributes as TimeRemainingAttributes;
            setUnitOfMeasurement(attributes.unit_of_measurement);
        }
    }, [timeRemaining])

    return (
        <div className={styles.printProgress}>
            <div>
                Progress
            </div>
            <div>
                <span className={styles.layer}>{`[${currentLayer?.state}/${totalLayers?.state}]`}</span>
                <span className={styles.percentage}> {progress * 100}% </span>
                <span> {`[${generateProgressBar(progress)}]`} </span>
                <span> finished in: {`${timeRemaining?.state } ${unitOfMeasurement}`} </span>
            </div>
        </div>
    )
}