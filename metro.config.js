
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure async-storage is properly resolved
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg');
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json');

module.exports = config;
