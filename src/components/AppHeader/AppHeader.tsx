import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { usePortfolio } from '../../store/portfolio/usePortfolio';
import BisonIcon from '../icons/BisonIcon';
import { styles } from './AppHeader.styles';

const AppHeader: FC = () => {
  const { eurBalance, btcBalance } = usePortfolio();

  return (
    <View style={styles.container}>
      <BisonIcon />
      <Text style={styles.available}>
        {'Available\n'}
        {btcBalance.toFixed(8)}
        {'  '}
        <Text style={styles.bold}>BTC</Text>
        {'\n'}
        {eurBalance.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        {'  '}
        <Text style={styles.bold}>€</Text>
      </Text>
    </View>
  );
};

export default AppHeader;
