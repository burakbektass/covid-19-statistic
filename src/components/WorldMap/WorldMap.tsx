/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./WorldMap.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function WorldMap() {
  const [tipContent, setTipContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});

  const onCountrySelect = (params: any): void => {
    setSelectedCountry(params);
  };

  return (
    <div>
      <div className="WorldMap">
        <Tooltip anchorSelect=".tipElement" place="top">
          {tipContent}
        </Tooltip>{" "}
        <ComposableMap
          data-tip=""
          projectionConfig={{
            scale: 180,
          }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo, index) => (
                  <Link key={geo.rsmKey} to={`/${geo.properties.name}`}>
                    <Geography
                      className="tipElement"
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTipContent(geo.properties.name);
                      }}
                      onMouseLeave={() => {
                        setTipContent("");
                      }}
                      onClick={() => {
                        onCountrySelect(geo);
                      }}
                      style={{
                        hover: {
                          fill: "white",
                          outline: "none",
                        },
                      }}
                    />
                  </Link>
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default WorldMap;
