import { StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.screenHorizontal,
    marginTop: 24,
  },
  tradeBtn: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeBtnText: {
    color: COLORS.primaryText,
    fontSize: 16,
    ...FONTS.semiBold,
    lineHeight: 21,
  },
});
