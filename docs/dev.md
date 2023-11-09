# Development

To test your local version of this package, you can use [`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link).

You can do this from the `examples` directory with:

```sh
cd examples
npm link ..

node with_object/handler.js
```

## Tests

You can run tests locally with:

```sh
npm test
```

Make sure you have at least Node 18 installed (see below).

## Releasing

To release a new version:

- Update the version in `package.json`
- Create a PR (or add to an existing PR)
- Merge the PR to `main`
- Create a new Release [in Github](https://github.com/scaleway/serverless-functions-node/releases)
- Check that the `publish` pipeline succeeded

Please follow [Semantic Versioning](https://semver.org/) guidelines when deciding which version to go to.

## Managing multiple Node versions

The build runs on multiple versions of Node. To manage multiple Node versions locally, you can use [`nvm`](https://github.com/nvm-sh/nvm).

Once installed, you can install versions with:

```sh
# Install versions
nvm install 16
nvm install 18

# Check
nvm use 16
npm i
which node

nvm use 18
npm i
which node
```

From there, you can check the build:

```sh
nvm use 16
npm run build

nvm use 18
npm run build
```
