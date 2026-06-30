import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  btcAmount: number;
  eurAmount: number;
  price: number;
  timestamp: number;
}

interface PortfolioState {
  eurBalance: number;
  btcBalance: number;
  avgBuyPrice: number;
  transactions: Transaction[];
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    eurBalance: 10_000,
    btcBalance: 0,
    avgBuyPrice: 0,
    transactions: [],
  } as PortfolioState,
  reducers: {
    buy(state, { payload }: PayloadAction<{ btcAmount: number; price: number }>) {
      const { btcAmount, price } = payload;
      const cost = btcAmount * price;
      if (btcAmount <= 0 || price <= 0 || cost > state.eurBalance) {
        return;
      }
      state.avgBuyPrice =
        (state.avgBuyPrice * state.btcBalance + cost) /
        (state.btcBalance + btcAmount);
      state.eurBalance -= cost;
      state.btcBalance += btcAmount;
      state.transactions.unshift({
        id: String(Date.now()),
        type: 'buy',
        btcAmount,
        eurAmount: cost,
        price,
        timestamp: Date.now(),
      });
    },
    sell(state, { payload }: PayloadAction<{ btcAmount: number; price: number }>) {
      const { btcAmount, price } = payload;
      if (btcAmount <= 0 || price <= 0 || btcAmount > state.btcBalance) {
        return;
      }
      state.eurBalance += btcAmount * price;
      state.btcBalance -= btcAmount;
      if (state.btcBalance <= 0) {
        state.btcBalance = 0;
        state.avgBuyPrice = 0;
      }
      state.transactions.unshift({
        id: String(Date.now()),
        type: 'sell',
        btcAmount,
        eurAmount: btcAmount * price,
        price,
        timestamp: Date.now(),
      });
    },
  },
});

export const { buy, sell } = portfolioSlice.actions;
export default portfolioSlice.reducer;
