import React, { FC } from 'react';
import { Text, TextInput, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { styles } from './AmountInput.styles';

export interface AmountInputProps {
  value: string;
  label: 'EUR' | 'BTC';
  placeholder: string;
  onChangeText: (value: string) => void;
}

const AmountInput: FC<AmountInputProps> = ({ value, label, placeholder, onChangeText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="decimal-pad"
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeholder}
    />
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default React.memo(AmountInput);
