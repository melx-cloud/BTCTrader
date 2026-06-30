import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export const styles = StyleSheet.create({
  row: {
    textAlign: 'center',
    fontSize: 12,
    ...FONTS.semiBold,
    lineHeight: 16,
  },
  label: {
    ...FONTS.regular,
    color: COLORS.text,
  },
  value: {
    ...FONTS.semiBold,
  },
});
