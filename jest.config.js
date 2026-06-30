module.exports = {
  preset: '@react-native/jest-preset',
  // Transform ESM packages: react-redux, toolkit, and its immer dependency
  transformIgnorePatterns: [
    'node_modules/(?!(react-redux|@reduxjs/toolkit|immer|react-native|@react-native|react-native-chart-kit|react-native-svg)/)',
  ],
};
