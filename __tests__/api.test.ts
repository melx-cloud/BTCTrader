import { fetchOHLC, fetchTicker } from '../src/services/api';
import { ApiError } from '../src/services/ApiError';

describe('fetchTicker', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the current BTC/EUR price as a number', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ last: '95123.45' }),
    }) as unknown as typeof fetch;

    const price = await fetchTicker();
    expect(price).toBe(95123.45);
  });

  it('rethrows ApiError on a failed request', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    }) as unknown as typeof fetch;

    await expect(fetchTicker()).rejects.toThrow(ApiError);
  });
});

describe('fetchOHLC', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns close prices in chronological order', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            ohlc: [
              { close: '90000.0' },
              { close: '92000.5' },
              { close: '95000.25' },
            ],
          },
        }),
    }) as unknown as typeof fetch;

    const closes = await fetchOHLC();
    expect(closes).toEqual([90000, 92000.5, 95000.25]);
  });
});
