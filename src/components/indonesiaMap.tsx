"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup  } from "react-simple-maps";

const geoUrl = "/maps/gadm41_IDN_2_Topo.json"; // center: [118, -5], scale: 950,
const Sumatra = "/maps/Sumatra.json"; // center: [100, -3], scale: 1850,
const Java = "/maps/Java.json"; // center: [111, -9], scale: 3650,
const Borneo = "/maps/Borneo.json";  // center: [112, -2], scale: 2550,
const Sulawesi = "/maps/Sulawesi.json"; // center: [120, -5], scale: 2550,
const Nusa = "/maps/Nusa.json"; // center: [120, -10], scale: 3850,
const Maluku = "/maps/Maluku.json"; // center: [130, -7], scale: 3550,
const WestPapua = "/maps/West_Papua.json"; // center: [134, -5], scale: 2150,

export default function IndonesiaMap() {
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | null>(null);

  return (
    <>
      {selectedKabupaten && (
        <div className="mt-4 p-2 bg-white text-black rounded shadow">
          <strong>Selected Kabupaten:</strong> {selectedKabupaten}
        </div>
      )}
      <ComposableMap projection="geoMercator" 
        projectionConfig={{
        center: [134, -5],
        scale: 2150,
      }}>
        <ZoomableGroup>
          <Geographies geography={WestPapua}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    const kabupatenName = geo.properties.NAME_2; // Or any other field like `NAME_1`, `HASC_2`, etc.
                    setSelectedKabupaten(kabupatenName)
                    console.log("Kabupaten clicked:", kabupatenName);
                    // You can also update state here to show it in the UI
                  }}
                  style={{
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
    </>
  );
}
