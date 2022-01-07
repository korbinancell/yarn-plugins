const varStart = '$(';
const varRegex = /^\$\(.+?\)$/;

export function isVariableVersion(version: string) {
	return version.startsWith(varStart) && varRegex.test(version);
}

export function getVersionTag(version: string) {
	return version.slice(varStart.length, -1);
}
