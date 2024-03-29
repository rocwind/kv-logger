# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.3](https://github.com/rocwind/kv-logger/compare/v0.5.2...v0.5.3) (2022-02-18)


### Bug Fixes

* export Logger class ([673728b](https://github.com/rocwind/kv-logger/commit/673728bfbf4ab3994fffbcb7210875dfb33e0f0d))

### [0.5.2](https://github.com/rocwind/kv-logger/compare/v0.5.1...v0.5.2) (2022-02-11)


### Bug Fixes

* correct LogMessage type ([039d0a4](https://github.com/rocwind/kv-logger/commit/039d0a45c1518c5952fbe52a0d371f3ee36b4e1b))

### [0.5.1](https://github.com/rocwind/kv-logger/compare/v0.5.0...v0.5.1) (2022-02-11)


### Bug Fixes

* add withLogLevelFilter, deprecate withLogLevel ([89592ab](https://github.com/rocwind/kv-logger/commit/89592abe11e458394e52da215f7de7997c8c3552))
* setLogTransports() supports set single transport ([3062f2f](https://github.com/rocwind/kv-logger/commit/3062f2ff14591aa11d7ee24e249934312fa02e92))

## [0.5.0](https://github.com/rocwind/kv-logger/compare/v0.4.1...v0.5.0) (2022-02-11)


### ⚠ BREAKING CHANGES

* change LogLevel to string enum, rename ConsoleTransport to ConsoleLogTransport

### Features

* support withLogScope to set global log context ([fe7728f](https://github.com/rocwind/kv-logger/commit/fe7728f39b49f433b3559cb5d723ee80da04aafa))

### [0.4.1](https://github.com/rocwind/kv-logger/compare/v0.4.0...v0.4.1) (2022-02-08)


### Bug Fixes

* LogLevelFilter takes string level type as parameter ([f3523a7](https://github.com/rocwind/kv-logger/commit/f3523a71619fb985d064df20e6c267912d2d8d12))

## [0.4.0](https://github.com/rocwind/kv-logger/compare/v0.3.0...v0.4.0) (2022-02-07)


### ⚠ BREAKING CHANGES

* remove the default export of logger instance

### Features

* deprecate enums ConsoleFormat and LogLevel, use string values in api ([2597aa8](https://github.com/rocwind/kv-logger/commit/2597aa8838bd573c837614eed27834f9e7bf88a6))


### Bug Fixes

* remove the default export of logger instance ([3214b86](https://github.com/rocwind/kv-logger/commit/3214b86abad67e2b85f1b6c2d14aeda4d6d71b0f))
* use formated date time for console text log ([4de1132](https://github.com/rocwind/kv-logger/commit/4de1132d93117eda44bce77aa4a7783e148ac9aa))

## [0.3.0](https://github.com/rocwind/kv-logger/compare/v0.2.2...v0.3.0) (2020-01-06)


### ⚠ BREAKING CHANGES

* refactor LogTransport interface

### Features

* refactor LogTransport interface ([26639a3](https://github.com/rocwind/kv-logger/commit/26639a36743479396a5c6ea70611ac35c25f92a7))

### [0.2.2](https://github.com/rocwind/kv-logger/compare/v0.2.1...v0.2.2) (2019-12-14)


### Features

* add logger to default export ([a4430fb](https://github.com/rocwind/kv-logger/commit/a4430fb2429b2f2b331056655588cef1e9014ba1))


### Bug Fixes

* setLogTransports() make a copy of input array ([2e8b385](https://github.com/rocwind/kv-logger/commit/2e8b385abacdc2d13eadf57f8f852d41c573580e))

### [0.2.1](https://github.com/rocwind/kv-logger/compare/v0.2.0...v0.2.1) (2019-12-10)


### Features

* add log() method ([6bd8c6f](https://github.com/rocwind/kv-logger/commit/6bd8c6f4b4c713ecbe5a4fce0696a449c1b50864))

## [0.2.0](https://github.com/rocwind/kv-logger/compare/v0.1.0...v0.2.0) (2019-12-10)


### ⚠ BREAKING CHANGES

* global setConfig() is removed, LogTransport interface is updated

### Features

* refactor the transports to support customized format ([07a8088](https://github.com/rocwind/kv-logger/commit/07a8088b51196d91ad2420c643050acd5cb4c64a))

## 0.1.0 (2019-12-09)


### Features

* initial commit ([ce8f54e](https://github.com/rocwind/kv-logger/commit/ce8f54e26607081151ebe2d732421c930854e250))
