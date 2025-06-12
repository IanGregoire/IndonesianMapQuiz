'use client'

import { useParams } from 'next/navigation';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { useQuizStore } from 'store/useQuizStore'
import { useEffect, useState } from 'react'

export default function QuizMap() {
  const params = useParams();
  const island = params.island; 
  
  const setProvinces = useQuizStore((state) => state.setProvinces)
  const setKabupaten = useQuizStore((state) => state.setKabupaten)
  const setTargetProvince = useQuizStore((state) => state.setTargetProvince)
  const setTargetKabupaten = useQuizStore((state) => state.setTargetKabupaten)
  const targetProvince = useQuizStore((state) => state.targetProvince)
  const targetKabupaten = useQuizStore((state) => state.targetKabupaten)
  const incrementScore = useQuizStore((state) => state.incrementScore)
  const incrementTotal = useQuizStore((state) => state.incrementTotal)

  const [geographies, setGeographies] = useState<any[]>([])

  useEffect(() => {
    if (!island) return
    // const url = Sumatra;
    const url = `/maps/${island}.json`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const features = data.objects[Object.keys(data.objects)[0]].geometries
        const kabupatenNames = features.map((f: any) => f.properties.NAME_2)
        // const provinceNames = features.map((f: any) => f.properties.NAME_1)
        setKabupaten(kabupatenNames)
        // setProvinces(provinceNames)

        // Pick random target province
        const randomKabupaten = kabupatenNames[Math.floor(Math.random() * kabupatenNames.length)]
        // const randomProvince = provinceNames[Math.floor(Math.random() * provinceNames.length)]
        setTargetKabupaten(randomKabupaten)
        // setTargetProvince(randomProvince)

        setGeographies(features)
      })

  }, [island, setProvinces, setKabupaten, setTargetProvince])

  const handleClick = (geo: any) => {
    const clickedName = geo.properties.NAME_2
    // const clickedName = geo.properties.NAME_1
    incrementTotal()

    // if (clickedName === targetProvince) {
    if (clickedName === targetKabupaten) {
      incrementScore()
      alert(`✅ Correct! ${clickedName}`)
    } else {
      alert(`❌ Wrong! You clicked ${clickedName}. Target was ${targetKabupaten}`)
    //   alert(`❌ Wrong! You clicked ${clickedName}. Target was ${targetProvince}`)
    }

    // Pick next target
    const kabupaten = useQuizStore.getState().kabupaten
    const nextTarget = kabupaten[Math.floor(Math.random() * kabupaten.length)]
    setTargetKabupaten(nextTarget)
    // const provinces = useQuizStore.getState().provinces
    // const nextTarget = provinces[Math.floor(Math.random() * provinces.length)]
    // setTargetProvince(nextTarget)
  }

  if (!island) return <p className="text-center mt-4">Select an island first.</p>

  const islandProjectionConfig = [
    { id: 'Sumatra', centerX: 100, centerY: -3  , scale: 1850 },
    { id: 'Java', centerX: 111, centerY: -9, scale: 3650 },
    { id: 'Kalimantan', centerX: 112, centerY: -2, scale: 2550 },
    { id: 'Sulawesi', centerX: 120, centerY: -5, scale: 2550 },
    { id: 'Nusa', centerX: 120, centerY: -10, scale: 3850 },
    { id: 'Maluku', centerX: 130, centerY: -7, scale: 3550 },
    { id: 'West_Papua', centerX: 134, centerY: -5, scale: 2150 },
  ]

  const islandIndex = islandProjectionConfig.findIndex((name) => name.id == island )

  return (
    <div className="flex flex-col items-center mt-6">
      {/* <p className="text-lg mb-2">Click on: <strong>{targetProvince}</strong></p> */}
      <p className="text-lg mb-2">Click on: <strong>{targetKabupaten}</strong></p>
        <ComposableMap projection="geoMercator"
            projectionConfig={{
                center: [islandProjectionConfig[islandIndex].centerX, islandProjectionConfig[islandIndex].centerY], 
                scale: islandProjectionConfig[islandIndex].scale,
            }}>
          <ZoomableGroup translateExtent={[[-1000, -1000], [1000, 1000]]}>
            <Geographies geography={`/maps/${island}.json`}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                    <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleClick(geo)}
                        style={{
                        // default: {
                        //     fill: '#444',
                        //     outline: 'none',
                        // },
                        // hover: {
                        //     fill: '#F53',
                        //     outline: 'none',
                        // },
                        // pressed: {
                        //     fill: '#E42',
                        //     outline: 'none',
                        // },
                        default: {
                            fill: "#E0E0E0",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                        },
                        hover: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                        },
                        pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                        },
                        }}
                    />
                    ))
                }
            </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
