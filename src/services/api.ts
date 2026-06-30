import { getJson } from './httpClient';
import { BitstampOhlcResponse, BitstampTickerResponse } from '../types/api';
import {
  BITSTAMP_API_BASE_URL,
  BITSTAMP_CURRENCY_PAIR,
  OHLC_CANDLE_LIMIT,
  OHLC_STEP_SECONDS,
} from '../constants/config';

export const fetchTicker = async (): Promise<number> => {
  const ticker = await getJson<BitstampTickerResponse>(
    `${BITSTAMP_API_BASE_URL}/ticker/${BITSTAMP_CURRENCY_PAIR}/`,
  );
  return parseFloat(ticker.last);
};

export const fetchOHLC = async (): Promise<number[]> => {
  const ohlc = await getJson<BitstampOhlcResponse>(
    `${BITSTAMP_API_BASE_URL}/ohlc/${BITSTAMP_CURRENCY_PAIR}/?step=${OHLC_STEP_SECONDS}&limit=${OHLC_CANDLE_LIMIT}`,
  );
  return ohlc.data.ohlc.map(candle => parseFloat(candle.close));
};
