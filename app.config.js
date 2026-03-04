export default {
  name: 'Stouchi',
  slug: 'stouchi',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/stouchi.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/stouchi.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  assetBundlePatterns: ['**/*'],
  android: {
    package: 'com.stouchi.app',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './src/assets/stouchi.png',
      backgroundColor: '#000000',
    },
  },
};

