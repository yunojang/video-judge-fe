import {
  JsonResponse,
  ParseMethod,
  RequestMethod,
  TextResponse,
} from './types';

const parseResponse = async <T extends ParseMethod>(
  response: Response,
  parseMethod: ParseMethod = 'json',
  requestMethod?: RequestMethod,
) => {
  type ReturnType = T extends 'raw' | null
    ? Response
    : T extends 'json' | undefined
    ? JsonResponse
    : T extends 'text'
    ? TextResponse
    : never;

  const isActionMethod =
    requestMethod === 'DELETE' ||
    requestMethod === 'POST' ||
    requestMethod === 'PUT';

  if (parseMethod === 'raw' || parseMethod === null) {
    return response as ReturnType;
  } else if (parseMethod === 'text') {
    const text = await response.text();
    return { text, response } as ReturnType;
  } else if (parseMethod === 'json' && isActionMethod) {
    const json = await response.json();
    if (!json.result) {
      return json.message ?? 'error';
    }

    return { json: json.data, response } as ReturnType;
  } else {
    const json = await response.json();

    return { json, response } as ReturnType;
  }
};

export default parseResponse;
