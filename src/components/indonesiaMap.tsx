"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/maps/indoProvince.json";

export default function IndonesiaMap() {
  return (
    <ComposableMap projection="geoMercator">
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
