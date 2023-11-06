# Development

To test your local version of this package, you can use [`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link).

You can do this quickly from the `examples` directory with:

```sh
cd examples
npm link ..

node with_object/handler.js
```

## Multiple versions

The tests run on multiple versions of Node. To manage multiple Node versions locally, you can use [`nvm`](https://github.com/nvm-sh/nvm).

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

From there, you can run tests with different versions, e.g.

```sh
nvm use 16
npm run format

nvm use 18
npm run format
```