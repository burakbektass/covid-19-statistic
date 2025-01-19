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
    return (
      <div className="loading-container">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="detail-container">
      <h1 className="page-title">COVID-19 Statistics: {countryName}</h1>
      {formattedData && (
        <div className="data-table">
          <table className="table">
            <tbody>
              <tr>
                <td className="label-cell">Country</td>
                <td className="value-cell info">{formattedData.countryName}</td>
              </tr>
              <tr>
                <td className="label-cell">ISO Code</td>
                <td className="value-cell info">{formattedData.iso}</td>
              </tr>
              <tr>
                <td className="label-cell">Active Cases</td>
                <td className="value-cell warning">
                  {formatNumber(formattedData.active_case)}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Confirmed Cases</td>
                <td className="value-cell warning">
                  {formatNumber(formattedData.confirmed_case)}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Deaths</td>
                <td className="value-cell critical">
                  {formatNumber(formattedData.deaths)}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Fatality Rate</td>
                <td className="value-cell critical">
                  {formattedData.fatality_rate.toFixed(5)}%
                </td>
              </tr>
              <tr>
                <td className="label-cell">Recovered</td>
                <td className="value-cell success">
                  {formatNumber(formattedData.recovered)}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Last Updated</td>
                <td className="value-cell info">{formattedData.last_update}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
