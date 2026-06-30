import reducer, { loadPriceData } from '../src/store/price/priceSlice';

const initial = { current: 0, chart: [], loading: false, error: null };

describe('priceSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initial);
  });

  it('sets loading on pending', () => {
    const state = reducer(initial, loadPriceData.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores price and chart on fulfilled', () => {
    const payload = { current: 95000, chart: [90000, 92000, 95000] };
    const state = reducer(initial, loadPriceData.fulfilled(payload, '', undefined));
    expect(state.current).toBe(95000);
    expect(state.chart).toEqual([90000, 92000, 95000]);
    expect(state.loading).toBe(false);
  });

  it('stores the error on rejected', () => {
    const errorPayload = { message: 'Network unavailable' };
    const action = loadPriceData.rejected(null, '', undefined, errorPayload);
    const state = reducer(initial, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorPayload);
  });
});
