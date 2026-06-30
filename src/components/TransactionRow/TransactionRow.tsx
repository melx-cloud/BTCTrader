import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Transaction } from '../../store/portfolio/portfolioSlice';
import { styles } from './TransactionRow.styles';

export interface TransactionRowProps {
  tx: Transaction;
  isFirst: boolean;
  isLast: boolean;
}

const formatTime = (timestamp: number): string =>
  new Date(timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const TransactionRow: FC<TransactionRowProps> = ({ tx, isFirst, isLast }) => {
  const btcSign = tx.type === 'buy' ? '+' : '-';
  const eurSign = tx.type === 'buy' ? '-' : '+';
  const amount = `${btcSign}${tx.btcAmount.toFixed(6)} BTC / ${eurSign}${tx.eurAmount.toFixed(2)} €`;

  return (
    <View style={[styles.card, isFirst && styles.cardFirst, isLast && styles.cardLast]}>
      <View style={styles.row}>
        <Text style={styles.type}>{tx.type === 'buy' ? 'Buy' : 'Sell'}</Text>
        <Text style={styles.amount} numberOfLines={1}>
          {amount}
        </Text>
        <Text style={styles.time}>{formatTime(tx.timestamp)}</Text>
      </View>
    </View>
  );
};

export default React.memo(TransactionRow);
