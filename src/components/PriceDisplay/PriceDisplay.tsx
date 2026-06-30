import React, { FC } from 'react';
import { Text } from 'react-native';
import { styles } from './PriceDisplay.styles';

export interface PriceDisplayProps {
  price: number;
}

const formatEur = (value: number): string =>
  value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

const PriceDisplay: FC<PriceDisplayProps> = ({ price }) => (
  <Text style={styles.price}>
    {'BTC\n'}
    {price > 0 ? formatEur(price) : '—'}
  </Text>
);

export default React.memo(PriceDisplay);
