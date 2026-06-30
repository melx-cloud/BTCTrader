import { ApiError } from './ApiError';

export async function getJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new ApiError('Network request failed');
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}
