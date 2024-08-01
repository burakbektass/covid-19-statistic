import { all } from 'redux-saga/effects';
import dataSaga from './dataSaga';

function* rootSaga() {
  yield all([
    dataSaga(),
  ]);
}

export default rootSaga;
