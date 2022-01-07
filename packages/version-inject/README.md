# yarn-plugin-version-inject

> ⚠️ Yarn 3 support only

Easily keep root and/or workspace dependencies on the same version.

## Features

-   Use a variable in the package.json to reference a shared version
-   Change a version in one place to change is across the repo
-   Automatically removes the variable version and replaces it with the configured version when running `yarn pack`

## Installation

```bash
yarn plugin import https://raw.githubusercontent.com/korbinancell/yarn-plugins/bundles/plugin-version-inject.js
```

## Configuration

Add your variable and version to the `.yarnrc.yml` (usually a semver version, but most everything else supported by yarn should work)

```yaml
# .yarnrc.yml

sharedVersions:
    clipanion-version: 1.2.3
    utils-version: ^0.1.0
```

And reference the variable in your `package.json`

```json
// package.json

"dependencies": {
	"clipanion": "$(clipanion-version)",
	"other-package" : "~1.2.3",
	"utils": "$(utils-verison)",
	"second-utils": "$(utils-verison)"
}
```
