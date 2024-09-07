import { fetchPrintStage } from "../lib/actions"

export default function PrintStage() {
    const stage = fetchPrintStage()
    return <h1>Stage: {stage}</h1>
}