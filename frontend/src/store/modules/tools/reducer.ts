import produce from 'immer';

import { StateRedux, Action } from '../../../interface';

const INITIAL_STATE = {
  tools: null,
  loading: false,
};

export default function tools(
  state: StateRedux = INITIAL_STATE,
  action: Action,
) {
  return produce(state, draft => {
    switch (action.type) {
      case '@tools/TOOLS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@tools/TOOLS_SUCCESS': {
        draft.tools = action.payload;
        draft.loading = false;
        break;
      }
      case '@tools/TOOLS_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
