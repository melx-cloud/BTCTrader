import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer, { act } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from '../src/store/portfolio/portfolioSlice';
import priceReducer from '../src/store/price/priceSlice';
import { usePrice, usePricePolling } from '../src/store/price/usePrice';

jest.mock('../src/services/api', () => ({
  fetchTicker: jest.fn().mockResolvedValue(95_000),
  fetchOHLC: jest.fn().mockResolvedValue([90_000, 92_000, 95_000]),
}));

const buildStore = () =>
  configureStore({ reducer: { price: priceReducer, portfolio: portfolioReducer } });

function renderPriceHook(store: ReturnType<typeof buildStore>) {
  const captured: { state?: ReturnType<typeof usePrice> } = {};

  const Harness = () => {
    usePricePolling();
    captured.state = usePrice();
    return null;
  };

  TestRenderer.create(
    <Provider store={store}>
      <Harness />
    </Provider>,
  );

  return captured;
}

describe('usePrice / usePricePolling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('loads price and chart data on mount', async () => {
    const store = buildStore();

    await act(async () => {
      renderPriceHook(store);
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(store.getState().price.current).toBe(95_000);
    expect(store.getState().price.chart).toEqual([90_000, 92_000, 95_000]);
    expect(store.getState().price.loading).toBe(false);
  });

  it('repeats the load on the polling interval', async () => {
    const { fetchTicker } = jest.requireMock('../src/services/api');
    const store = buildStore();

    await act(async () => {
      renderPriceHook(store);
      await Promise.resolve();
      await Promise.resolve();
    });

    const callsAfterMount = fetchTicker.mock.calls.length;

    await act(async () => {
      jest.advanceTimersByTime(30_000);
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(fetchTicker.mock.calls.length).toBeGreaterThan(callsAfterMount);
  });
});
