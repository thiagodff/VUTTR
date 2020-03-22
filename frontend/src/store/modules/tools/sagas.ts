import { toast } from 'react-toastify';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { toolsSuccess, toolsFailure } from './actions';

export function* createToll() {
  try {
    const response = yield call(api.get, '/tools');
    console.tron.log(response.data);

    yield put(toolsSuccess(response.data));
  } catch (error) {
    toast.error('Falha ao buscar ferramentas');
    yield put(toolsFailure());
  }
}

export default all([takeLatest('@tools/TOOLS_REQUEST', createToll)]);
