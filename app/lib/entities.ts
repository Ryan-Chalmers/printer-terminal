type Entities = {
    [key: string]: {
        id: string,
        name: string
    }
}

const entities: Entities =  {
    printImage: {
        id: "image.p1p_01s00c450400639_camera",
        name: "Camera"
    },
    printStatus: {
        id:  "sensor.p1p_01s00c450400639_print_status",
        name: "Print Status"
    },
    printStage: {
        id: "sensor.p1p_01s00c450400639_current_stage",
        name: "Print Stage",
    },
    printProgress: {
        id: "sensor.p1p_01s00c450400639_print_progress",
        name: "Print Progress"
    },
    printError: {
        id: "binary_sensor.p1p_01s00c450400639_print_error",
        name: "Printer Error"
    },
    printEndTime: {
        id: "sensor.p1p_01s00c450400639_end_time",
        name: "Print End Time"
    },
    printTimeRemaining: {
        id: "sensor.p1p_01s00c450400639_remaining_time",
        name: "Print Time Remaining"
    },
    printCurrentLayer: {
        id: "sensor.p1p_01s00c450400639_current_layer",
        name: "Current Layer"
    },
    
    printTotalLayers: {
        id: "sensor.p1p_01s00c450400639_total_layer_count",
        name: "Total Layers"
    },
    printName: {
        id: "sensor.p1p_01s00c450400639_task_name",
        name: "Print Name"
    },
    bedTemperature: {
        id: "sensor.p1p_01s00c450400639_bed_temperature",
        name: "Bed Temperature"
    },
    nozzleTemperature: {
        id: "sensor.p1p_01s00c450400639_nozzle_temperature",
        name: "Nozzle Temperature"
    },
    nozzleTargetTemperature: {
        id: "sensor.p1p_01s00c450400639_nozzle_target_temperature",
        name: "Nozzle Target Temperature"
    },
    amsError: {
        id:  "binary_sensor.p1p_01s00c450400639_hms_errors",
        name: "AMS Error"
    },
    amsTray1: {
        id: "sensor.p1p_01s00c450400639_ams_1_tray_1",
        name: "AMS Tray 1"
    },
    amsTray2: {
        id: "sensor.p1p_01s00c450400639_ams_1_tray_2",
        name: "AMS Tray 2"
    },
    amsTray3: {
        id: "sensor.p1p_01s00c450400639_ams_1_tray_3",
        name: "AMS Tray 3"
    },
    amsTray4: {
        id: "sensor.p1p_01s00c450400639_ams_1_tray_1",
        name: "AMS Tray 4"
    },
    amsHumidity: {
        id: "sensor.p1p_01s00c450400639_ams_1_humidity_index",
        name: "AMS Humidity"
    },
    amsActiveTray: {
        id: "sensor.p1p_01s00c450400639_active_tray",
        name: "AMS Active Tray"
    },
    amsActiveTrayIndex: {
        id: "sensor.p1p_01s00c450400639_active_tray_index",
        name: "AMS Active Tray Index"
    }
}

export default entities;