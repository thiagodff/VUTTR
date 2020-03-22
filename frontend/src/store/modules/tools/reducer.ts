import produce from 'immer';

interface Tool {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

const INITIAL_STATE = {
  tools: null,
  loading: false,
};

interface State {
  tools: Tool[] | null;
  loading: boolean;
}

interface Action {
  type: string;
  payload: Tool[];
}

export default function tools(state: State = INITIAL_STATE, action: Action) {
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
