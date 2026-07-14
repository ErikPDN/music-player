const upstreamTransformer = require('@expo/metro-config/build/babel-transformer')
const svgTransformer = require('react-native-svg-transformer')

module.exports.transform = function (props) {
	if (props.filename.endsWith('.sql')) {
		return upstreamTransformer.transform({
			...props,
			src: `module.exports = ${JSON.stringify(props.src)}`,
		})
	}
	if (props.filename.endsWith('.svg')) {
		return svgTransformer.transform(props)
	}
	return upstreamTransformer.transform(props)
}
