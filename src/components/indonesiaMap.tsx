"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/maps/gadm41_IDN_2_Topo.json";

export default function IndonesiaMap() {
  return (
    <ComposableMap projection="geoMercator" 
    projectionConfig={{
    center: [118, -5],
    scale: 950,
  }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
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
    </ComposableMap>
  );
}
