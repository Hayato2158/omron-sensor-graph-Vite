import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSensorGet } from "../hooks/sensor_api";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./style.module.css";
import { SensorData } from "./types";

interface GraphProps {
  title: string;
  dataKey: keyof SensorData;
  domain: [number, number];
}

const Graph: React.FC<GraphProps> = ({ title, dataKey, domain }) => {
  const { sensor, isLoading } = useSensorGet();
  const [data, setData] = useState<({ date: Date; value: number } | null)[]>(
    []
  );

  // const error = console.error;
  // console.error = (...args: any) => {
  //   if (/defaultProps/.test(args[0])) return;
  //   error(...args);
  // };

  useEffect(() => {
    if (sensor) {
      let processedData = sensor
        .map((s) => {
          if (s.temperature === 0) return null;
          return {
            date: s.time_measured,
            value: Number(s[dataKey]), // Convert value to a string
          };
        })
        .filter((d) => d !== null);

      // 逆順にする
      processedData.reverse();
      setData(processedData);
    }
  }, [sensor, dataKey]);


  const formatTime = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };


  // if (isLoading) return <Spinner />;

  return (
    <Box w="100%" p="0">
      <p>{data.slice(-1)[0]?.value}</p>
      

      <Text fontSize="xl" textAlign="center">
        {title}
      </Text>
        <LineChart
          data={data}
          margin={{ top: 5, bottom: 5 }}
          width={500} height={300}
        >

          {/* ここのx軸の表示をなんとかする */}
          <XAxis dataKey= "date"
          tickFormatter={formatTime}
          interval={6}
          dx={-10}
          dy={5}
          tick={{
            fontSize: 15,
            fill: '#000',
          }}
          /> 
          <YAxis domain={domain} 
          />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff7300"
            yAxisId={0}
            dot={false}
          />
        </LineChart>
      {/* </ResponsiveContainer> */}
    </Box>
  );
};

export const TempGraph: React.FC = () => {
  return <Graph title="温度" dataKey="temperature" domain={[10, 40]}  />;
};

export const SoundNoiseGraph: React.FC = () => {
  return <Graph title="音量" dataKey="sound_noise" domain={[30, 100]} />;
};

export const EC02Graph: React.FC = () => {
  return <Graph title="eCO2" dataKey="eCO2" domain={[0, 1500]} />;
};

export const ETVOCGraph: React.FC = () => {
  return <Graph title="eTVOC" dataKey="eTVOC" domain={[0, 150]} />;
};

export const RelativeHumidityGraph: React.FC = () => {
  return (
    <Graph title="相対湿度" dataKey="relative_humidity" domain={[45, 85]} />
  );
};

export const SeismicIntensityGraph: React.FC = () => {
  return (
    <Graph title="地震強度" dataKey="seismic_intensity" domain={[0, 10]} />
  );
};

export const BarometricPressureGraph: React.FC = () => {
  return <Graph title="気圧" dataKey="barometric_pressure" domain={[950, 1100]} />;
};

export const AmbientLightGraph: React.FC = () => {
  return <Graph title="光" dataKey="ambient_light" domain={[1600, 1700]} />;
};