import { refreshToken } from "./token";

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

const parseJSON = (response: Response) =>
  response.status === 204 || response.status === 205 ? null : response.json();

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    refreshToken();
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
};

export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  const body = await parseJSON(response);
  return body;
}
