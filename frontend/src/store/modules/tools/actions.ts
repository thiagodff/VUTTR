interface Tool {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export function toolsRequest() {
  return {
    type: '@tools/TOOLS_REQUEST',
  };
}

export function toolsSuccess(tool: Tool[]) {
  return {
    type: '@tools/TOOLS_SUCCESS',
    payload: tool,
  };
}

export function toolsFailure() {
  return {
    type: '@tools/TOOLS_FAILURE',
  };
}
