import { StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.button,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputUnderline,
    paddingLeft: 16,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    ...FONTS.regular,
    color: COLORS.text,
    textAlign: 'right',
    paddingVertical: 0,
  },
  label: {
    marginLeft: 4,
    fontSize: 12,
    ...FONTS.bold,
    color: COLORS.accent,
    lineHeight: 21,
  },
});
