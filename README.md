# Leeway - Vehicle Fuel Expense Tracker
Leeway is a user-friendly mobile application designed to make managing your vehicle's fuel expenses effortless. With Leeway, you can easily add fuel entries every time you refuel your vehicle, and we'll handle the rest. Our advanced processing algorithms analyze the data to provide valuable insights into your vehicle's mileage and cost per kilometer. It's a hassle-free solution to keep track of your expenses and optimize your vehicle's performance.

> This project is part of Zympl's self-learning program called [Uplift](https://zympl-xyz.neetokb.com/articles/uplift).

## Installation
To get started with Leeway, follow these steps:

- Clone the repository: `git clone https://github.com/zympl/leeway-mobile.git`
- Navigate to the project directory: `cd leeway-mobile`
- Install dependencies: `yarn install`
- Start the development server: `yarn start`
- Open a new terminal window and run the app on Android: `yarn android` (Make sure you have an Android emulator or device connected)
- Open a new terminal window and run the app on iOS: `yarn ios` (Make sure you have Xcode installed for iOS development)
Note: For detailed instructions on setting up React Native development environment and running the app on different platforms, please refer to the [official React Native documentation](https://reactnative.dev/docs/environment-setup).

## Running Tests (E2E)
We are using Detox for E2E testing. Refer [Detox docs](https://wix.github.io/Detox/docs/introduction/getting-started) for environment setup.

### Running tests
```bash
yarn detox:android # Test Android debug build.
yarn detox:android:release # Test Android release build.
yarn detox:ios # Test iOS debug build.
yarn detox:ios:release # Test iOS release build.
```

## Contributing
We welcome contributions from the community to enhance Leeway. If you encounter any issues, have ideas for new features, or want to contribute code improvements, feel free to open an issue or even better raise a PR.
