export type Entities = {
    [id: string]: {
        description: string
        logged: boolean
    }
}

const entities: Entities =  {
    "image.p1p_01s00c450400639_camera": {
        description: "Camera",
        logged: true,
    },
    "sensor.p1p_01s00c450400639_print_status": {
        description: "Print Status",
        logged: true,
    },
    "sensor.p1p_01s00c450400639_current_stage": {
        description: "Print Stage",
        logged: true,
    },
    "sensor.p1p_01s00c450400639_print_progress": {
        description: "Print Progress",
        logged: true,
    },
    "binary_sensor.p1p_01s00c450400639_print_error": {
        description: "Printer Error",
        logged: true,
    },
    "sensor.p1p_01s00c450400639_end_time": {
        description: "Print End Time",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_remaining_time": {
        description: "Print Time Remaining",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_current_layer": {
        description: "Current Layer",
        logged: true,
    },
    
    "sensor.p1p_01s00c450400639_total_layer_count": {
        description: "Total Layers",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_task_name": {
        description: "Print Name",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_bed_temperature": {
        description: "Bed Temperature",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_nozzle_temperature": {
        description: "Nozzle Temperature",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_nozzle_target_temperature": {
        description: "Nozzle Target Temperature",
        logged: true,
    },
    "binary_sensor.p1p_01s00c450400639_hms_errors": {
        description: "AMS Error",
        logged: true,
    },
    "sensor.p1p_01s00c450400639_ams_1_tray_1": {
        description: "AMS Tray 1",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_ams_1_tray_2": {
        description: "AMS Tray 2",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_ams_1_tray_3": {
        description: "AMS Tray 3",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_ams_1_tray_4": {
        description: "AMS Tray 4",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_ams_1_humidity_index": {
        description: "AMS Humidity",
        logged: false,
    },
    "sensor.p1p_01s00c450400639_active_tray": {
        description: "AMS Active Tray",
        logged: true,
    },
    "sensor.p1p_01s00c450400639_active_tray_index": {
        description: "AMS Active Tray Index",
        logged: false
    }
}

export default entities;