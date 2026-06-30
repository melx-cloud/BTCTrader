import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import portfolioReducer from './portfolio/portfolioSlice';
import priceReducer from './price/priceSlice';

export const store = configureStore({
  reducer: {
    price: priceReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
