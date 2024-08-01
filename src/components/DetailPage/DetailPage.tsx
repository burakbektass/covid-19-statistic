import "./DetailPage.css";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";

function DetailPage() {
  const dispatch = useDispatch();
  let { countryName } = useParams();
  const storeData = useSelector((state: any) => state.data.data);
  const loading = useSelector((state: any) => state.data.loading);
  const error = useSelector((state: any) => state.data.error);

  useEffect(() => {
    dispatch({
      type: "FETCH_DATA_REQUEST",
      selectedCountry: countryName,
    });
  }, [dispatch, countryName]);

  const formatData = (data: any) => {
    if (data) {
      const tableData = {
        countryName: data[0]?.region.name,
        iso: data[0]?.region.iso,
        active_case: 0,
        confirmed_case: 0,
        deaths: 0,
        fatality_rate: 0,
        recovered: 0,
        last_update: data[0]?.last_update,
      };
      data?.map((item: any) => {
        tableData.active_case += item.active;
        tableData.confirmed_case += item.confirmed;
        tableData.deaths += item.deaths;
        tableData.recovered += item.recovered;
        tableData.fatality_rate += item.fatality_rate;
      });
      tableData.fatality_rate /= data.length;
      return tableData;
    }
  };

  const formattedData = useMemo(() => {
    return formatData(storeData.data);
  }, [storeData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="data-row">COVID details of {countryName} </h1>
      {formattedData && (
        <div className="data-rows">
          <div style={{ width: "100%", height: "100%" }}>
            <div className="data-row">
              <span className="label">Country:</span>
              <span className="value">{formattedData.countryName}</span>
            </div>
            <div className="data-row">
              <span className="label">ISO:</span>
              <span className="value">{formattedData.iso}</span>
            </div>
            <div className="data-row">
              <span className="label">Active cases:</span>
              <span className="value">
                {formatNumber(formattedData.active_case)}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Confirmed cases:</span>
              <span className="value">
                {formatNumber(formattedData.confirmed_case)}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Deaths:</span>
              <span className="value">
                {formatNumber(formattedData.deaths)}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Fatality rate:</span>
              <span className="value">
                {formattedData.fatality_rate.toFixed(5)}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Recovered:</span>
              <span className="value">
                {formatNumber(formattedData.recovered)}
              </span>
            </div>
            <div className="data-row">
              <span className="label">Last update</span>
              <span className="value">{formattedData.last_update}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;
