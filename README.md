## Fulcrum Core [![Build Status](https://secure.travis-ci.org/fulcrumapp/fulcrum-core.svg)](http://travis-ci.org/fulcrumapp/fulcrum-core)

### Setup

```sh
npm install fulcrum-core
```

### Tests

```sh
npm test
```

### Build

```sh
make
```

### Console

Starts an interactive node terminal with the library available to use

```sh
./console
```


### Publishing

- `yarn clean && yarn build`
- Bump package.json version
- Merge to ~~main~~ master
- Checkout master, `git pull`
- `git tag -a vx.x.x -m "x.x.x"`
- `git push origin --tags`
- Create vx.x.x release for tag in github
  - Choose the tag and use tag as the release title
  - Auto-generate release nots
  - Click the "Publish release" button
- Publish to the public NPM registry
  - `mv $HOME/.npmrc $HOME/fulcrum.npmrc`
  - `npm login` using creds from "npmjs (fulcrumapp)" in 1password
  - use "support@fulcrumapp.com" for the email address when prompted
  - `npm publish`
- Publish to artifactory
  - `mv $HOME/fulcrum.npmrc $HOME/.npmrc`
  - `npm publish`
