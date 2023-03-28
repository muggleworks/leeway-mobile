# leeway

A Android/iOS app build with [React Native](https://reactnative.dev) that helps track vehicle cost.

## Project setup
Refer [React Native docs](https://reactnative.dev/docs/environment-setup) for project setup.

## Env setup
Add a config.json file in the project root

```json
{
  "webClientId": <WEB_CLIENT_ID>
}
```

`WEB_CLIENT_ID` - is used for google sign in and can be obtained from the firebase project dashboard Authentication -> Google


## Running Tests (E2E)
We are using Detox for E2E testing. Refer [Detox docs](https://wix.github.io/Detox/docs/introduction/getting-started) for environment setup.

### Running tests
```bash
yarn detox:android # Test Android debug build.
yarn detox:android:release # Test Android release build.
yarn detox:ios # Test iOS debug build.
yarn detox:ios:release # Test iOS release build.
```
