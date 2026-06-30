import reducer, { buy, sell } from '../src/store/portfolio/portfolioSlice';

const initial = { eurBalance: 10_000, btcBalance: 0, avgBuyPrice: 0, transactions: [] };

describe('portfolioSlice', () => {
  it('initial balance: 10000 EUR, 0 BTC', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchObject({ eurBalance: 10_000, btcBalance: 0 });
  });

  it('buying BTC debits EUR and credits BTC', () => {
    const state = reducer(initial, buy({ btcAmount: 0.1, price: 90_000 }));
    expect(state.eurBalance).toBeCloseTo(10_000 - 9_000);
    expect(state.btcBalance).toBeCloseTo(0.1);
    expect(state.avgBuyPrice).toBeCloseTo(90_000);
    expect(state.transactions[0].type).toBe('buy');
  });

  it('selling BTC credits EUR and debits BTC', () => {
    const afterBuy = reducer(initial, buy({ btcAmount: 0.1, price: 90_000 }));
    const state = reducer(afterBuy, sell({ btcAmount: 0.05, price: 95_000 }));
    expect(state.eurBalance).toBeCloseTo(1_000 + 4_750);
    expect(state.btcBalance).toBeCloseTo(0.05);
    expect(state.transactions[0].type).toBe('sell');
  });

  it('average buy price is weighted', () => {
    const s1 = reducer(initial, buy({ btcAmount: 0.05, price: 80_000 }));
    const s2 = reducer(s1, buy({ btcAmount: 0.05, price: 100_000 }));
    expect(s2.avgBuyPrice).toBeCloseTo(90_000);
  });

  it('resets avgBuyPrice when all BTC is sold', () => {
    const afterBuy = reducer(initial, buy({ btcAmount: 0.1, price: 90_000 }));
    const state = reducer(afterBuy, sell({ btcAmount: 0.1, price: 90_000 }));
    expect(state.btcBalance).toBe(0);
    expect(state.avgBuyPrice).toBe(0);
  });

  it('selling more BTC than owned is ignored, balance unchanged', () => {
    const afterBuy = reducer(initial, buy({ btcAmount: 0.1, price: 90_000 }));
    const state = reducer(afterBuy, sell({ btcAmount: 1, price: 90_000 }));
    expect(state).toEqual(afterBuy);
  });

  it('buying for more than the available EUR balance is ignored, balance unchanged', () => {
    const state = reducer(initial, buy({ btcAmount: 1, price: 50_000_000 }));
    expect(state).toEqual(initial);
  });

  it('buying/selling a zero or negative amount is ignored', () => {
    expect(reducer(initial, buy({ btcAmount: 0, price: 90_000 }))).toEqual(initial);
    expect(reducer(initial, buy({ btcAmount: -1, price: 90_000 }))).toEqual(initial);
    expect(reducer(initial, sell({ btcAmount: 0, price: 90_000 }))).toEqual(initial);
  });
});
