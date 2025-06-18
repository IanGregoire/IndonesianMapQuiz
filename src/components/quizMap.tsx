'use client'

import QuizControls from 'components/quizControls'
import { useParams } from 'next/navigation';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { useQuizStore } from 'store/useQuizStore'
import { useEffect, useState } from 'react'

export default function QuizMap() {
  const params = useParams();
  const island = params.island; 
  
  const setKabupaten = useQuizStore((state) => state.setKabupaten)
  const setTargetKabupaten = useQuizStore((state) => state.setTargetKabupaten)
  const targetKabupaten = useQuizStore((state) => state.targetKabupaten) 
  const incrementScore = useQuizStore((state) => state.incrementScore)
  const incrementTotal = useQuizStore((state) => state.incrementTotal)

  const [selectedTarget, setSelectedTarget] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [clickedLabel, setClickedLabel] = useState<{ name: string; x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!island) return
    const url = `/maps/${island}.json`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const features = data.objects[Object.keys(data.objects)[0]].geometries
        // eslint-disable-next-line
        const kabupatenNames = features.map((f: any) => f.properties.NAME_2)
        setKabupaten(kabupatenNames)

        // Pick random target province
        const randomKabupaten = kabupatenNames[Math.floor(Math.random() * kabupatenNames.length)]
        setTargetKabupaten(randomKabupaten)
      })

  }, [island, setKabupaten, setTargetKabupaten])

  // eslint-disable-next-line
  const handleClick = (geo: any) => {
    const clickedName = geo.properties.NAME_2
    setSelectedTarget(clickedName);
    incrementTotal()

    if (clickedName === targetKabupaten) {
      incrementScore()

      // Pick next target 
      const kabupaten = useQuizStore.getState().kabupaten
      const nextTarget = kabupaten[Math.floor(Math.random() * kabupaten.length)]
      setTargetKabupaten(nextTarget)
      
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
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
    <div className="flex flex-col items-center mt-6 h-screen">
      <p className="text-lg mb-2">Click on: <strong>{targetKabupaten}</strong></p>
      <p className="text-lg mb-2">Clicked on: <strong>{selectedTarget} which is {correctAnswer ? 'Correct': 'Wrong'}</strong></p>
      <QuizControls />  
        <ComposableMap 
            className='height-400'
            projection="geoMercator"
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
                        onClick={(e) => {
                            handleClick(geo);
                            const kabupaten = geo.properties.NAME_2;
                            const x = e.clientX;
                            const y = e.clientY;
                            setClickedLabel({ name: kabupaten, x, y });

                            // Hide after 2 seconds
                            setTimeout(() => setClickedLabel(null), 2000);
                        }}
                        onMouseEnter={() => {
                            // const kabupaten = geo.properties.NAME_2;
                            // setTooltipContent(kabupaten);
                            setTooltipContent('Click on: ' + targetKabupaten);
                        }}
                        onMouseLeave={() => {
                            setTooltipContent(null);
                        }}
                        onMouseMove={handleMouseMove}
                        style={{  
                            default: {
                                fill: '#ccc',
                                stroke: '#333',
                                strokeWidth: 0.5,
                                outline: 'none',
                            },
                            hover: {
                                fill: '#4f46e5',
                                stroke: '#000',
                                strokeWidth: 1,
                                outline: 'none',
                            },
                            pressed: {
                                fill: '#1d4ed8', // optional: a color for "pressed" state
                                outline: 'none',
                            },
                        }}
                    />
                    ))
                }
            </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && mousePos && (
        <div
          className="absolute bg-white text-black text-sm px-2 py-1 rounded shadow"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 40,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {tooltipContent}
        </div>
      )}
      {clickedLabel && (
        <div
            className="absolute bg-black text-white text-sm px-2 py-1 rounded shadow"
            style={{
            left: clickedLabel.x + 10,
            top: clickedLabel.y - 10,
            pointerEvents: 'none',
            zIndex: 20,
            }}
        >
            {clickedLabel.name}
        </div>
       )}
    </div>
  )
}
