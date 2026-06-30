import { StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../../constants/theme';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.screenHorizontal,
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
  },
  cardFirst: {
    marginTop: 16,
    paddingTop: 15,
    borderTopLeftRadius: RADIUS.card,
    borderTopRightRadius: RADIUS.card,
  },
  cardLast: {
    marginBottom: 32,
    paddingBottom: 15,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 21,
  },
  type: {
    fontSize: 12,
    ...FONTS.regular,
    lineHeight: 21,
    color: COLORS.text,
    width: 28,
  },
  amount: {
    flex: 1,
    fontSize: 12,
    ...FONTS.semiBold,
    lineHeight: 21,
    color: COLORS.text,
    textAlign: 'right',
    paddingHorizontal: 4,
  },
  time: {
    fontSize: 12,
    ...FONTS.regular,
    lineHeight: 21,
    color: COLORS.text,
    textAlign: 'right',
    width: 58,
  },
});
