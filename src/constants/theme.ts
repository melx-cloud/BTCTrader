export const COLORS = {
  white: '#FFFFFF',
  background: '#FFFFFF',
  textPrimary: '#202020',
  text: '#000000',
  primary: '#153243',
  primaryText: '#FFFFFF',
  card: '#F3F3F3',
  pnlUp: '#00BF13',
  pnlDown: '#FF4444',
  accent: '#74CDDC',
  overlay: 'rgba(0,0,0,0.36)',
  inputBackground: 'rgba(0,0,0,0.04)',
  inputUnderline: 'rgba(0,0,0,0.24)',
  placeholder: 'rgba(0,0,0,0.24)',
} as const;

export const FONTS = {
  regular: { fontFamily: 'OpenSans-Regular', fontWeight: '400' as const },
  semiBold: { fontFamily: 'OpenSans-SemiBold', fontWeight: '600' as const },
  bold: { fontFamily: 'OpenSans-Bold', fontWeight: '700' as const },
};

export const SPACING = {
  screenHorizontal: 24,
} as const;

export const RADIUS = {
  card: 12,
  button: 4,
} as const;
