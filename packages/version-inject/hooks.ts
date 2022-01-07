import { structUtils, Workspace } from '@yarnpkg/core';
import { getVersionTag, isVariableVersion } from './utils';

const DEPENDENCY_TYPES = [`dependencies`, `devDependencies`, `peerDependencies`];

export async function beforeWorkspacePacking(workspace: Workspace, rawManifest: object) {
	const { project } = workspace;

	for (const dependencyType of DEPENDENCY_TYPES) {
		for (const descriptor of workspace.manifest.getForScope(dependencyType).values()) {
			if (!isVariableVersion(descriptor.range)) {
				continue;
			}

			const versionTag = getVersionTag(descriptor.range);
			const versionMap = project.configuration.get('sharedVersions');
			const version = versionMap.get(versionTag);

			rawManifest[dependencyType][structUtils.stringifyIdent(descriptor)] = version;
		}
	}
}
