import './App.css'
import { Grid } from '@chakra-ui/react'
import { AmbientLightGraph, BarometricPressureGraph, EC02Graph, ETVOCGraph, RelativeHumidityGraph, SeismicIntensityGraph, SoundNoiseGraph, TempGraph } from './graph'


function App() {
  return (
    <main>

      <Grid templateColumns={{sm:"repeat(1, 1fr)" , md:"repeat(2, 1fr)" ,lg:"repeat(3, 1fr)" , xl:"repeat(3, 1fr)" }} gap={4}>
        <TempGraph />
        <SoundNoiseGraph />
        <EC02Graph />
        <ETVOCGraph />
        <RelativeHumidityGraph />
        <SeismicIntensityGraph />
        <BarometricPressureGraph />
        <AmbientLightGraph />
      </Grid>
    </main>
  )
}


export default App
