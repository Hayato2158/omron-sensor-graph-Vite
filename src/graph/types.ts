// types.ts
export type SensorData = {
    time_measured: string;
    temperature: number;
    sound_noise: number;
    eCO2: number;
    eTVOC: number;
    relative_humidity: number;
    seismic_intensity: number;
    barometric_pressure: number;
    ambient_light: number;
}