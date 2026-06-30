import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export const styles = StyleSheet.create({
  price: {
    fontSize: 24,
    ...FONTS.semiBold,
    lineHeight: 28,
    color: COLORS.textPrimary,
    textAlign: 'center',
    minHeight: 43,
  },
});
