import { call, put, takeEvery } from "redux-saga/effects";

const fetchDataFromApi = (country) => {
  if (country === "United States of America") {
    country = "US";
  }
  const url = `https://covid-19-statistics.p.rapidapi.com/reports?region_name=${country}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3cff110a0bmsh04741f7f9a69d97p1923afjsn1458d4a31aa5",
      "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
    },
  };
  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

function* fetchData(action) {
  try {
    const data = yield call(fetchDataFromApi, action.selectedCountry);
    yield put({ type: "FETCH_DATA_SUCCESS", payload: data });
  } catch (error) {
    yield put({ type: "FETCH_DATA_FAILURE", error: error.message });
  }
}

function* dataSaga() {
  yield takeEvery("FETCH_DATA_REQUEST", fetchData);
}

export default dataSaga;
