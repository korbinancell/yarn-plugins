import { Hooks, structUtils, Workspace } from '@yarnpkg/core';

const DEPENDENCY_TYPES = [`dependencies`, `devDependencies`, `peerDependencies`];
const varStart = '$(';
// const varRegex = /^\$\(.+?\)$/;

export async function beforeWorkspacePacking(workspace: Workspace, rawManifest: object) {
	const { project } = workspace;

	let updated = false;
	for (const dependencyType of DEPENDENCY_TYPES) {
		for (const descriptor of workspace.manifest.getForScope(dependencyType).values()) {
			if (!descriptor.range.startsWith(varStart)) {
				continue;
			}

			const versionTag = descriptor.range.slice(varStart.length, -1);
			const versionMap = project.configuration.get('sharedVersions');
			const version = versionMap.get(versionTag);

			rawManifest[dependencyType][structUtils.stringifyIdent(descriptor)] = version;
		}
	}
}
