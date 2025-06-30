
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.platforms = ['web', 'ios', 'android', 'native'];
config.resolver.alias = {
  '@react-native-async-storage/async-storage': require.resolve('@react-native-async-storage/async-storage'),
};

module.exports = config;
