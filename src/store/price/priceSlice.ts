import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOHLC, fetchTicker } from '../../services/api';
import { ApiError } from '../../services/ApiError';

export interface PriceError {
  message: string;
  status?: number;
}

export const loadPriceData = createAsyncThunk<
  { current: number; chart: number[] },
  void,
  { rejectValue: PriceError }
>('price/load', async (_, { rejectWithValue }) => {
  try {
    const [current, chart] = await Promise.all([fetchTicker(), fetchOHLC()]);
    return { current, chart };
  } catch (err) {
    if (err instanceof ApiError) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
    return rejectWithValue({ message: 'Unexpected error' });
  }
});

interface PriceState {
  current: number;
  chart: number[];
  loading: boolean;
  error: PriceError | null;
}

const priceSlice = createSlice({
  name: 'price',
  initialState: { current: 0, chart: [], loading: false, error: null } as PriceState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPriceData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPriceData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.current = payload.current;
        state.chart = payload.chart;
      })
      .addCase(loadPriceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? { message: 'Failed to load data' };
      });
  },
});

export default priceSlice.reducer;
