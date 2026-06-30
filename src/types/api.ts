export interface BitstampTickerResponse {
  last: string;
}

export interface BitstampOhlcCandle {
  close: string;
}

export interface BitstampOhlcResponse {
  data: {
    ohlc: BitstampOhlcCandle[];
  };
}
