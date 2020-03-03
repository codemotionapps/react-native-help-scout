module.exports = {
	presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					'react-native-help-scout': '../library/src',
					'react-native': './node_modules/react-native',
					react: './node_modules/react',
				},
			},
		],
	],
}
