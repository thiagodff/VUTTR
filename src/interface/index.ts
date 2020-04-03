export interface Tool {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
  handleRemoveClick: Function;
}

export interface Tools {
  tools: Tool[];
}

export interface State {
  tools: Tools;
  loading: boolean;
}

export interface StateRedux {
  tools: Tool[] | null;
  loading: boolean;
}

export interface Action {
  type: string;
  payload: Tool[];
}

export interface Payload {
  payload: Tools;
}
