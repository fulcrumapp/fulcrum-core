## Fulcrum Core

The JavaScript object model for Fulcrum.

Includes:
* Form schema parsing and definitions
* Record parsing and field value definitions
* Record (and child record) titles
* Address field formatting
* Date/time localization
* Number localization (1.337,00 vs 1,337.00)
* Currency formatting
* Choice and classification set label lookups
* Visibility and requirement conditions
* Required field validations
* Min/max validations
* Pattern validations
* Default values
* Canonical definitions of "emptiness" / blank / length / etc
* JSON serialization for all field types
* Formatting calculation fields
* Full support for record link fields and repeatables

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
