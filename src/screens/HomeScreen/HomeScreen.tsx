import React, { FC } from 'react';
import { FlatList, ListRenderItem, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePricePolling } from '../../store/price/usePrice';
import { usePortfolio } from '../../store/portfolio/usePortfolio';
import { Transaction } from '../../store/portfolio/portfolioSlice';
import { COLORS } from '../../constants/theme';
import AppHeader from '../../components/AppHeader/AppHeader';
import PriceChart from '../../components/PriceChart/PriceChart';
import TradePanel from '../../components/TradePanel/TradePanel';
import TransactionRow from '../../components/TransactionRow/TransactionRow';
import { styles } from './HomeScreen.styles';

const HomeScreen: FC = () => {
  usePricePolling();
  const { transactions } = usePortfolio();

  const renderItem: ListRenderItem<Transaction> = ({ item, index }) => (
    <TransactionRow
      tx={item}
      isFirst={index === 0}
      isLast={index === transactions.length - 1}
    />
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <AppHeader />
      <PriceChart />
      <TradePanel />
      <FlatList
        data={transactions}
        keyExtractor={tx => tx.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.txList}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
