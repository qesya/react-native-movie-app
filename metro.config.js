/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 module.exports = {
  resolver: {
    /* resolver options */
    sourceExts: [
      'jsx',
      'js',
      'ts',
      'tsx',
      'native',
      'ios.js',
      'android.js',
      'native.js',
      'android.json',
      'ios.json',
      'native.json',
      'android.ts',
      'ios.ts',
      'native.ts',
      'android.tsx',
      'ios.tsx',
      'native.tsx',
    ], //add here
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
