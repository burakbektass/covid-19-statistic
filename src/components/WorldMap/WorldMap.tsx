/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import "./WorldMap.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function WorldMap() {
  const [tipContent, setTipContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.objects.countries.geometries.map(
          (geo: any) => geo.properties.name
        );
        setCountries(countryList);
      });
  }, []);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return [];
    return countries.filter((country) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, countries]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountrySelect = (countryName: string) => {
    navigate(`/${countryName}`);
    setSearchTerm("");
  };

  return (
    <div className="map-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <div className="search-results">
            {filteredCountries.map((country) => (
              <Link
                key={country}
                to={`/${country}`}
                className="search-result-item"
                onClick={() => setSearchTerm("")}
              >
                {country}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="WorldMap">
        <Tooltip anchorSelect=".tipElement" place="top">
          {tipContent}
        </Tooltip>
        <ComposableMap
          data-tip=""
          projectionConfig={{
            scale: 180,
            center: [0, 20]
          }}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
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
                      style={{
                        default: {
                          fill: "#e2e8f0",
                          stroke: "#fff",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#4299e1",
                          stroke: "#fff",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: "pointer",
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
