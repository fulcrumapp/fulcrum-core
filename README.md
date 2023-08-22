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
- Merge to main
- Checkout main, `git pull`
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
- Restore your .npmrc file
  - `mv $HOME/fulcrum.npmrc $HOME/.npmrc`
