
"use client"

import useSWR from "swr"

const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())

type sensor = {
    id: number,
    time_measured: Date, 
    area_id: number, 
    temperature: number, 
    relative_humidity: number, 
    ambient_light: number, 
    barometric_pressure: number, 
    sound_noise: number, 
    eTVOC: number, 
    eCO2: number, 
    discomfort_index: number, 
    heat_stroke: number, 
    vibration_information: number, 
    si_value: number, 
    pga: number, 
    seismic_intensity: number, 
    date: Date,
}

export const useSensorGet = (
    // startDate: Date,
    // endDate: Date, 
    // count: number
) => {
    const { data, error, isLoading } = useSWR<sensor[]>(`https://enviroment-backend.kajilab.dev/get/sensor`, fetcher)

    return {
        sensor: data,
        isLoading,
        isError: error
    }
}
