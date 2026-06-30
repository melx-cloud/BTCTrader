import { getJson } from '../src/services/httpClient';
import { ApiError } from '../src/services/ApiError';

describe('getJson', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the parsed JSON on a successful response', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ last: '95000' }),
    }) as unknown as typeof fetch;

    const result = await getJson<{ last: string }>('https://example.com');
    expect(result).toEqual({ last: '95000' });
  });

  it('throws ApiError with the status on a failed HTTP response', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    }) as unknown as typeof fetch;

    await expect(getJson('https://example.com')).rejects.toThrow(ApiError);
    await expect(getJson('https://example.com')).rejects.toMatchObject({ status: 404 });
  });

  it('throws ApiError on a network failure', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('offline')) as unknown as typeof fetch;

    await expect(getJson('https://example.com')).rejects.toThrow(ApiError);
    await expect(getJson('https://example.com')).rejects.toThrow('Network request failed');
  });
});
