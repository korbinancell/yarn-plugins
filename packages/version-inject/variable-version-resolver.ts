import {
	ReportError,
	MessageName,
	Resolver,
	ResolveOptions,
	MinimalResolveOptions,
	TAG_REGEXP,
	DescriptorHash,
	Hooks,
} from '@yarnpkg/core';
import { structUtils } from '@yarnpkg/core';
import { Descriptor, Locator, Package } from '@yarnpkg/core';

const varStart = '$(';
const varRegex = /^\$\(.+?\)$/;

export class VariableVersionResolver implements Resolver {
	supportsDescriptor(descriptor: Descriptor, opts: MinimalResolveOptions): boolean {
		if (!descriptor.range.startsWith(varStart)) {
			console.log(descriptor.range);
			return false;
		}

		if (!varRegex.test(descriptor.range)) {
			return false;
		}

		return true;
	}

	supportsLocator(locator: Locator, opts: MinimalResolveOptions): boolean {
		return false;
	}

	shouldPersistResolution(locator: Locator, opts: MinimalResolveOptions): never {
		throw new Error(`Unreachable`);
	}

	bindDescriptor(descriptor: Descriptor, fromLocator: Locator, opts: MinimalResolveOptions): Descriptor {
		const versionTag = descriptor.range.slice(varStart.length, -1);

		const versionMap = opts.project.configuration.get('sharedVersions');
		if (!versionMap) {
			throw new Error('No `sharedVersions` property in .yarnrc.yml found.');
		}

		const version = versionMap.get(versionTag);
		if (!version) {
			throw new Error(`Missing property ${versionTag} in sharedVersions config.`);
		}

		return structUtils.makeDescriptor(structUtils.makeIdent(descriptor.scope, descriptor.name), `npm:${version}`);
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
