import { toast } from 'react-toastify';
import { takeLatest, put, all } from 'redux-saga/effects';

import { Tool } from '../../../interface';
// import api from '../../../services/api';

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
        // const response = yield call(api.get, `/tools?q=${name}`);
        // console.tron.log(`/tools?q=:${name}`);
        const tools = localStorage.getItem('tools') as string;
        const parseTools = JSON.parse(tools);

        const filterTools = parseTools.filter((parseTool: Tool) => {
          return parseTool.description.search(`${name}`) !== -1;
        });

        yield put(toolsSuccess(filterTools as Tool[]));
        break;
      }
      case 'tags': {
        // const response = yield call(api.get, `/tools?tags_like=${name}`);
        // console.tron.log(`/tools?tags_like=:${name}`);
        // yield put(toolsSuccess(response.data));
        const tools = localStorage.getItem('tools') as string;
        const parseTools = JSON.parse(tools);

        const filterTools = parseTools.filter((parseTool: Tool) => {
          return parseTool.tags.find(tag => tag === name) !== undefined;
        });

        yield put(toolsSuccess(filterTools as Tool[]));
        break;
      }
      default: {
        // const response = yield call(api.get, '/tools');
        // console.tron.log(`/tools`);
        const tools = localStorage.getItem('tools');

        if (typeof tools === 'string') {
          yield put(toolsSuccess(JSON.parse(tools) as Tool[]));
        } else {
          yield put(toolsSuccess([]));
        }
        break;
      }
    }
  } catch (error) {
    toast.error('Falha ao buscar ferramentas');
    yield put(toolsFailure());
  }
}

export default all([takeLatest('@tools/TOOLS_REQUEST', createToll)]);
