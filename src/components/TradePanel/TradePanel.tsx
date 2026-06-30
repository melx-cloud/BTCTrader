import React, { FC, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { usePrice } from '../../store/price/usePrice';
import { usePortfolio, usePortfolioActions } from '../../store/portfolio/usePortfolio';
import TradePanelModal from '../TradePanelModal/TradePanelModal';
import { styles } from './TradePanel.styles';

const TradePanel: FC = () => {
  const { current: currentPrice } = usePrice();
  const { eurBalance, btcBalance } = usePortfolio();
  const { buy, sell } = usePortfolioActions();

  const [visible, setVisible] = useState(false);
  const [eurInput, setEurInput] = useState('');
  const [btcInput, setBtcInput] = useState('');

  const handleEurChange = (val: string) => {
    setEurInput(val);
    const eur = parseFloat(val.replace(',', '.'));
    if (!isNaN(eur) && eur > 0 && currentPrice > 0) {
      setBtcInput((eur / currentPrice).toFixed(8));
    } else {
      setBtcInput('');
    }
  };

  const handleBtcChange = (val: string) => {
    setBtcInput(val);
    const btc = parseFloat(val.replace(',', '.'));
    if (!isNaN(btc) && btc > 0 && currentPrice > 0) {
      setEurInput((btc * currentPrice).toFixed(2));
    } else {
      setEurInput('');
    }
  };

  const close = () => {
    setVisible(false);
    setEurInput('');
    setBtcInput('');
  };

  const handleBuy = () => {
    const btc = parseFloat(btcInput.replace(',', '.'));
    if (!btc || btc <= 0) {
      return Alert.alert('Error', 'Enter a valid BTC amount');
    }
    if (!currentPrice) {
      return Alert.alert('Error', 'Price not loaded yet');
    }
    const cost = btc * currentPrice;
    if (cost > eurBalance) {
      return Alert.alert(
        'Insufficient funds',
        `Need €${cost.toFixed(2)}, available €${eurBalance.toFixed(2)}`,
      );
    }
    buy(btc, currentPrice);
    close();
  };

  const handleSell = () => {
    const btc = parseFloat(btcInput.replace(',', '.'));
    if (!btc || btc <= 0) {
      return Alert.alert('Error', 'Enter a valid BTC amount');
    }
    if (btc > btcBalance) {
      return Alert.alert(
        'Insufficient BTC',
        `Need ${btc} BTC, available ${btcBalance.toFixed(8)}`,
      );
    }
    sell(btc, currentPrice);
    close();
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.tradeBtn} onPress={() => setVisible(true)} activeOpacity={0.85}>
        <Text style={styles.tradeBtnText}>Trade</Text>
      </TouchableOpacity>

      <TradePanelModal
        visible={visible}
        eurInput={eurInput}
        btcInput={btcInput}
        onEurChange={handleEurChange}
        onBtcChange={handleBtcChange}
        onBuy={handleBuy}
        onSell={handleSell}
        onClose={close}
      />
    </View>
  );
};

export default TradePanel;
