const upstreamTransformer = require('@expo/metro-config/build/babel-transformer')

module.exports.transform = function (props) {
	if (props.filename.endsWith('.sql')) {
		return upstreamTransformer.transform({
			...props,
			src: `module.exports = ${JSON.stringify(props.src)}`,
		})
	}
	return upstreamTransformer.transform(props)
}
