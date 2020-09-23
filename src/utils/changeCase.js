export function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[']/g, '')
		.replace(/[^a-z0-9]/g, '-')
		.replace(/(-){2,}/g, '-');
}
