import { useAppDispatch, useAppSelector } from '../index';
import { buy, sell } from './portfolioSlice';

export const usePortfolio = () => useAppSelector(state => state.portfolio);

export const usePortfolioActions = () => {
  const dispatch = useAppDispatch();
  return {
    buy: (btcAmount: number, price: number) => dispatch(buy({ btcAmount, price })),
    sell: (btcAmount: number, price: number) => dispatch(sell({ btcAmount, price })),
  };
};
