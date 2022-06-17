import { JsonResponse, ParseMethod, TextResponse } from './types';

const parseResponse = async <T extends ParseMethod>(
  response: Response,
  parseMethod?: T,
) => {
  type ReturnType = T extends 'raw' | null
    ? Response
    : T extends 'json' | undefined
    ? JsonResponse
    : T extends 'text'
    ? TextResponse
    : never;

  if (parseMethod === 'raw' || parseMethod === null) {
    return response as ReturnType;
  } else if (parseMethod === 'text') {
    const text = await response.text();
    return { text, response } as ReturnType;
  } else {
    const json = await response.json();
    return { json, response } as ReturnType;
  }
};

export default parseResponse;
