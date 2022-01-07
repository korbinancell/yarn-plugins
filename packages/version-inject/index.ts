import { Plugin, SettingsType } from '@yarnpkg/core';
import { VariableVersionResolver } from './variable-version-resolver';
import { beforeWorkspacePacking } from './hooks';

declare module '@yarnpkg/core' {
	interface ConfigurationValueMap {
		sharedVersions: Map<string, string>;
	}
}

const plugin: Plugin = {
	configuration: {
		sharedVersions: {
			description: 'Map of package versions to share between packages.',
			type: SettingsType.MAP,
			valueDefinition: {
				description: '',
				type: SettingsType.STRING,
			},
		},
	},
	hooks: {
		beforeWorkspacePacking,
		afterAllInstalled: () => {
			console.log(`What a great install, am I right?`);
		},
	},
	resolvers: [VariableVersionResolver],
};

export default plugin;
