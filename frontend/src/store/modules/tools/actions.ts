import { Tool } from '../../../interface';

export function toolsRequest(search: string, name?: string) {
  return {
    type: '@tools/TOOLS_REQUEST',
    payload: { search, name },
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
