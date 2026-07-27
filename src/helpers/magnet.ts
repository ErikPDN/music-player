const MAGNET_URI_REGEX = /^magnet:\?xt=urn:btih:[a-zA-Z0-9]{32,40}/i

export const isValidMagnetUri = (uri: string): boolean => {
	return MAGNET_URI_REGEX.test(uri.trim())
}
