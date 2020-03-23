import { toast } from 'react-toastify';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { toolsSuccess, toolsFailure } from './actions';

interface Payload {
  search: string;
  name?: string;
}

interface Action {
  type: string;
  payload: Payload;
}

export function* createToll({ payload }: Action) {
  try {
    const { search, name } = payload;

    switch (search) {
      case 'q': {
        const response = yield call(api.get, `/tools?q=${name}`);
        console.tron.log(`/tools?q=:${name}`);
        yield put(toolsSuccess(response.data));
        break;
      }
      case 'tags': {
        const response = yield call(api.get, `/tools?tags_like=${name}`);
        console.tron.log(`/tools?tags_like=:${name}`);
        yield put(toolsSuccess(response.data));
        break;
      }
      default: {
        const response = yield call(api.get, '/tools');
        console.tron.log(`/tools`);
        yield put(toolsSuccess(response.data));
        break;
      }
    }
  } catch (error) {
    toast.error('Falha ao buscar ferramentas');
    yield put(toolsFailure());
  }
}

export default all([takeLatest('@tools/TOOLS_REQUEST', createToll)]);
