import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../index';
import { loadPriceData } from './priceSlice';
import { PRICE_REFRESH_INTERVAL_MS } from '../../constants/config';

export const usePrice = () => useAppSelector(state => state.price);

export const usePriceActions = () => {
  const dispatch = useAppDispatch();
  return { refresh: useCallback(() => dispatch(loadPriceData()), [dispatch]) };
};

// Owns the polling lifecycle so screens don't talk to the store directly.
export const usePricePolling = () => {
  const dispatch = useAppDispatch();
  const refresh = useCallback(() => dispatch(loadPriceData()), [dispatch]);

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, PRICE_REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [refresh]);
};
