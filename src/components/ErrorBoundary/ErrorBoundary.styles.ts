import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 18,
    ...FONTS.semiBold,
    color: COLORS.text,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    ...FONTS.regular,
    color: '#666666',
    textAlign: 'center',
  },
});
