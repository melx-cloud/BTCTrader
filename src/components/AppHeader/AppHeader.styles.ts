import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.screenHorizontal,
    paddingTop: 8,
    paddingBottom: 4,
  },
  available: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 12,
    ...FONTS.regular,
    lineHeight: 16,
    color: COLORS.text,
    textAlign: 'right',
  },
  bold: {
    ...FONTS.semiBold,
  },
});
