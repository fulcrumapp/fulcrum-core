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
- Move .npmrc off to fulcrum.npmrc and `npm login` (1password) support@fulcrumapp.com
- `npm publish`
- Move fulcrum.npmrc back to .npmrc and `npm login` (1password) support@fulcrumapp.com
- `npm publish`
