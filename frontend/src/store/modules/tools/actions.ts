import { Tool } from '../../../interface';

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
