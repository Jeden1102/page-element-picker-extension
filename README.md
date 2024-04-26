# Page element picker chrome extension.


## Extension constist of

* Content script (vanilla TS) - for the element picking logic.
* Popup page (Vue.js, Sass) - for the information of the extension.

_And, of course, the `./manifest.json` file describing its configuration._

## Environment

* Node.js >=12.0.0
* NPM >= 6.0.0


## Testing

`Jest` is included and ready for the vanilla TS parts. Testing for React/Vue is not included in order to keep the Jest config clean.

## Scripts

* `npm run dist` - build the extension into `./dist` folder
* `npm run lint` - ESLint for `.ts` and `.tsx` files
* `npm run test` - Jest unit tests
