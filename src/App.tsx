import React from "react";
import "./App.css";
import WorldMap from "./components/WorldMap/WorldMap";
import DetailPage from "./components/DetailPage/DetailPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1 className="header">COVID-19 Map</h1>
              <div className="container">
                <WorldMap />
              </div>
            </div>
          }
        />
        <Route path="/:countryName" element={<DetailPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
