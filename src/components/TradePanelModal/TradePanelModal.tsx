import React, { FC } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import CloseIcon from '../icons/CloseIcon';
import AmountInput from '../AmountInput/AmountInput';
import { styles } from './TradePanelModal.styles';

export interface TradePanelModalProps {
  visible: boolean;
  eurInput: string;
  btcInput: string;
  onEurChange: (value: string) => void;
  onBtcChange: (value: string) => void;
  onBuy: () => void;
  onSell: () => void;
  onClose: () => void;
}

const TradePanelModal: FC<TradePanelModalProps> = ({
  visible,
  eurInput,
  btcInput,
  onEurChange,
  onBtcChange,
  onBuy,
  onSell,
  onClose,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableOpacity style={styles.overlayBg} onPress={onClose} activeOpacity={1} />

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <CloseIcon />
        </TouchableOpacity>

        <View style={styles.inputRow}>
          <AmountInput
            value={eurInput}
            label="EUR"
            placeholder="0.00"
            onChangeText={onEurChange}
          />
        </View>

        <View style={[styles.inputRow, styles.inputRowGap]}>
          <AmountInput
            value={btcInput}
            label="BTC"
            placeholder="0.00000000"
            onChangeText={onBtcChange}
          />
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={onBuy} activeOpacity={0.85}>
            <Text style={styles.actionBtnText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={onSell} activeOpacity={0.85}>
            <Text style={styles.actionBtnText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default TradePanelModal;
