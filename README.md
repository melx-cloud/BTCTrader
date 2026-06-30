# BTCTrader

A React Native app for simulated BTC/EUR trading using live prices from the Bitstamp API.

## Features

- Live BTC/EUR price chart — 24-hour OHLC candles, auto-refreshed every 30 seconds
- Simulated trading with a starting balance of €10,000
- P&L tracking relative to your average buy price
- Transaction history

## Tech Stack

- React Native 0.86, TypeScript
- Redux Toolkit — state management
- react-native-chart-kit — price chart

## Getting Started

### Prerequisites

- Node.js 18+
- Ruby (iOS only — required by CocoaPods)
- Java 17 (Android only)

### Install

```bash
npm install

# iOS — also install native pods
cd ios && bundle install && bundle exec pod install && cd ..
```

### Run

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### Tests

```bash
npm test
```

## Project Structure

```
src/
  components/   UI components, each co-located with its styles
  screens/      Screen-level components
  store/        Redux slices and domain hooks
  services/     HTTP client and Bitstamp API layer
  types/        Shared TypeScript interfaces (API response models)
  navigation/   Navigator with a screen registry
  constants/    Theme, config values, route names
```

## Architecture Notes

State is managed by two Redux slices — `price` (live market data) and `portfolio` (balances and transactions). Components access the store exclusively through domain hooks (`usePrice`, `usePricePolling`, `usePortfolio`, `usePortfolioActions`), keeping raw `dispatch` and `useSelector` calls out of UI code.

The navigation layer uses a plain registry (`SCREENS` constant + `Record<ScreenName, FC>`) so screens can be added without introducing a navigation library dependency.
