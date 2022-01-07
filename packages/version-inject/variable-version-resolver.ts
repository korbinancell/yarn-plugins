import { Resolver, ResolveOptions, MinimalResolveOptions, DescriptorHash } from '@yarnpkg/core';
import { structUtils } from '@yarnpkg/core';
import { Descriptor, Locator, Package } from '@yarnpkg/core';
import { getVersionTag, isVariableVersion } from './utils';

export class VariableVersionResolver implements Resolver {
	supportsDescriptor(descriptor: Descriptor, opts: MinimalResolveOptions): boolean {
		return isVariableVersion(descriptor.range);
	}

	supportsLocator(locator: Locator, opts: MinimalResolveOptions): boolean {
		return false;
	}

	shouldPersistResolution(locator: Locator, opts: MinimalResolveOptions): never {
		throw new Error(`Unreachable`);
	}

	bindDescriptor(descriptor: Descriptor, fromLocator: Locator, opts: MinimalResolveOptions): Descriptor {
		const versionTag = getVersionTag(descriptor.range);

		const versionMap = opts.project.configuration.get('sharedVersions');
		if (!versionMap) {
			throw new Error('No `sharedVersions` property in .yarnrc.yml found.');
		}

		const version = versionMap.get(versionTag);
		if (!version) {
			throw new Error(`Missing property ${versionTag} in sharedVersions config.`);
		}

		return structUtils.makeDescriptor(structUtils.makeIdent(descriptor.scope, descriptor.name), version);
	}

	getResolutionDependencies(descriptor: Descriptor, opts: MinimalResolveOptions): Descriptor[] {
		return [];
	}

	async getCandidates(
		descriptor: Descriptor,
		dependencies: Map<DescriptorHash, Package>,
		opts: ResolveOptions
	): Promise<Locator[]> {
		throw new Error(`Unreachable`);
	}

	async getSatisfying(descriptor: Descriptor, references: string[], opts: ResolveOptions): Promise<Locator[]> {
		return null;
	}

	async resolve(locator: Locator, opts: ResolveOptions): Promise<Package> {
		throw new Error(`Unreachable`);
	}
}
