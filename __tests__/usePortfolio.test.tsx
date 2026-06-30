import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer, { act } from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from '../src/store/portfolio/portfolioSlice';
import priceReducer from '../src/store/price/priceSlice';
import { usePortfolio, usePortfolioActions } from '../src/store/portfolio/usePortfolio';

const buildStore = () =>
  configureStore({ reducer: { price: priceReducer, portfolio: portfolioReducer } });

function renderPortfolioHooks(store: ReturnType<typeof buildStore>) {
  const captured: {
    state?: ReturnType<typeof usePortfolio>;
    actions?: ReturnType<typeof usePortfolioActions>;
  } = {};

  const Harness = () => {
    captured.state = usePortfolio();
    captured.actions = usePortfolioActions();
    return null;
  };

  act(() => {
    TestRenderer.create(
      <Provider store={store}>
        <Harness />
      </Provider>,
    );
  });

  return captured;
}

describe('usePortfolio / usePortfolioActions', () => {
  it('reads the initial balance from the store', () => {
    const store = buildStore();
    const { state } = renderPortfolioHooks(store);
    expect(state?.eurBalance).toBe(10_000);
    expect(state?.btcBalance).toBe(0);
  });

  it('actions.buy dispatches buy and updates the store', () => {
    const store = buildStore();
    const { actions } = renderPortfolioHooks(store);

    act(() => {
      actions!.buy(0.1, 90_000);
    });

    expect(store.getState().portfolio.btcBalance).toBeCloseTo(0.1);
    expect(store.getState().portfolio.eurBalance).toBeCloseTo(1_000);
  });

  it('actions.sell dispatches sell and updates the store', () => {
    const store = buildStore();
    const { actions } = renderPortfolioHooks(store);

    act(() => {
      actions!.buy(0.1, 90_000);
    });
    act(() => {
      actions!.sell(0.1, 95_000);
    });

    expect(store.getState().portfolio.btcBalance).toBe(0);
  });
});
