import { StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  overlayBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.overlay,
  },

  card: {
    alignSelf: 'center',
    width: 324,
    height: 252,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.card,
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputRow: {
    marginTop: 36,
  },
  inputRowGap: {
    marginTop: 12,
  },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  actionBtn: {
    width: 126,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: COLORS.primaryText,
    fontSize: 16,
    ...FONTS.semiBold,
    lineHeight: 21,
  },
});
