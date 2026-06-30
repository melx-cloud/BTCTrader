import React, { FC } from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants/theme';
import { styles } from './PnlText.styles';

export interface PnlTextProps {
  value: number;
}

const formatEur = (value: number): string =>
  value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

const PnlText: FC<PnlTextProps> = ({ value }) => {
  const isPositive = value >= 0;
  return (
    <Text style={styles.row}>
      <Text style={styles.label}>PnL: </Text>
      <Text style={[styles.value, { color: isPositive ? COLORS.pnlUp : COLORS.pnlDown }]}>
        {isPositive ? '+' : ''}
        {formatEur(value)}
      </Text>
    </Text>
  );
};

export default React.memo(PnlText);
