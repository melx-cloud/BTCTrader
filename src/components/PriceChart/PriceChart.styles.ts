import { StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../../constants/theme';

export const CHART_HEIGHT = 257;
export const CHART_PAD_TOP = 16; // chart-kit style.paddingTop default

// chart-kit hardcodes y = value * 0.75 + paddingTop, so data only fills 75% of SVG height.
// To make data reach CHART_HEIGHT, the SVG must be taller and we clip the empty bottom.
export const CHART_HEIGHT_SVG = Math.ceil((CHART_HEIGHT - CHART_PAD_TOP) / 0.75);

export const styles = StyleSheet.create({
  loaderWrapper: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: SPACING.screenHorizontal,
    marginTop: 8,
  },
  chartArea: {
    marginTop: 12,
    position: 'relative',
  },
  chartClip: {
    height: CHART_HEIGHT,
    overflow: 'hidden',
  },
  pnlOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  // invisible text rendered once to measure the pixel width of the widest possible label
  yLabelProbe: {
    position: 'absolute',
    opacity: 0,
    fontSize: 11,
    ...FONTS.regular,
  },
  yLabelsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    // width is set inline from the measured labelColWidth
    height: CHART_HEIGHT,
  },
  yLabel: {
    position: 'absolute',
    right: 0,
    fontSize: 11,
    ...FONTS.regular,
    color: COLORS.textPrimary,
    textAlign: 'right',
  },

  errorWrapper: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenHorizontal,
  },
  errorTitle: {
    fontSize: 15,
    ...FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 13,
    ...FONTS.regular,
    color: COLORS.pnlDown,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryBtn: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.button,
  },
  retryBtnText: {
    color: COLORS.primaryText,
    fontSize: 14,
    ...FONTS.semiBold,
  },

  staleBanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  staleText: {
    fontSize: 12,
    ...FONTS.regular,
    color: COLORS.pnlDown,
  },
  staleRetry: {
    fontSize: 12,
    ...FONTS.semiBold,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
