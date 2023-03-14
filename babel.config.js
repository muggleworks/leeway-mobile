module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          components: './src/components',
          assets: './src/assets',
          navigation: './src/navigation',
          screens: './src/screens',
          'react-native-styled': './src/styled',
        },
      },
    ],
  ],
};
