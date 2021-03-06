# create-storybook-react-library

> CLI for creating reusable, modern React ts libraries using Rollup and storybook.

[![NPM](https://img.shields.io/npm/v/@21epub/create-storybook-react-library.svg)](https://www.npmjs.com/package/@21epub/create-storybook-react-library) [![Build Status](https://travis-ci.com/21epub/create-storybook-react-library.svg?branch=master)](https://travis-ci.com/21epub/create-storybook-react-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

This package was a upgrade for  [@21epub/create-parcel-react-library](https://github.com/21epub/create-parcel-react-library)

Implement storybook Component UI environment for npm library creating.

## Features

- [x] Easy-to-use CLI
- [x] Handles all modern JS features
- [x] Bundles `commonjs` and `es` module formats
- [x] [storybook](https://storybookjs.org/) for Component UI implementation
- [x] [Rollup](https://rollupjs.org/) for bundling
- [x] [Babel](https://babeljs.io/) for transpiling
- [x] [Jest + testing-library](https://facebook.github.io/jest/) for react testing
- [x] Supports complicated peer-dependencies
- [x] Supports CSS modules ( Both less and Sass ) with Storybook
- [x] TypeScript Only
- [x] Sourcemap creation
- [x] lint-staged support
- [X] [Conventional commit](https://github.com/streamich/git-cz) by `git-cz`
- [X] [standard-version](https://www.npmjs.com/package/standard-version?activeTab=versions) support by `npm run release`
- [X] Format on Save ( Vscode Editor )
- [X] Travis CI & Code coverage by custom configration

## Install globally

This package requires `node >= 10`.

```bash
npm install -g @21epub/create-storybook-react-library
```

## Usage with npx

> No need to create an empty folder before running.

```bash
npx @21epub/create-storybook-react-library
```

## Creating a New Module

```bash
create-storybook-react-library
```

Answer some basic prompts about your module, and then the CLI will perform the following steps:

- copy over the template
- install dependencies via yarn or npm
- install peers vis yarn or npm (You have to do this since peers will not auto installed , dev start will cause error !)
- initialize local git repo

At this point, your new module is ready and is all setup for local development.

## Development (with Storybook)

There's only one thing to do your development is enjoy your coding in `src/` 

```bash
npm start # start your Storybook ENV 
```

Now, anytime you make a change to your library in `src/` will live-reload your storybook dev so you can iterate on your component in real-time.


Get Start with Storybook and develop your Component, [Reference docs](https://storybook.js.org/docs) 

### Update Peers Dependencies

After update `peerDependencies` in package.json or install new dependencies

```bash
npm run install-peers # reinstall peers after update
```

#### Commit

Commit Method Recommandation

```bash
npm run commit # lint before commit can save your time , and then conventional commit with git-cz
```

#### Publishing to npm

```bash
npm run release # Version and changelog
git push --follow-tags origin master
npm publish # The `prePublishOnly` hook will run before publish to build and test your package
```

This builds `commonjs` and `es` versions of your module to `dist/` and then publishes your module to `npm`.

Make sure that any npm modules you want as peer dependencies are properly marked as `peerDependencies` in `package.json`. The rollup config will automatically recognize them as peers and not try to bundle them in your module.

## License

MIT © [21epub](https://github.com/21epub)
