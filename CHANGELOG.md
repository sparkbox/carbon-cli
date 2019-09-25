# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.1](https://github.com/sparkbox/carbon-cli/compare/v0.3.0...v0.3.1) (2019-09-25)

## [0.3.0](https://github.com/sparkbox/carbon-cli/compare/v0.2.3...v0.3.0) (2019-09-25)


### ⚠ BREAKING CHANGES

* carbon bin will now run prompts and perform i/o

* add github client
* add github auth with 2fa or personal access token
* add build-package step
* add build-templates step

note: temporarily will create remote repos under authenticated user

### Features

* add initial repo templating functionality ([#6](https://github.com/sparkbox/carbon-cli/issues/6)) ([e811943](https://github.com/sparkbox/carbon-cli/commit/e811943))

### [0.2.3](https://github.com/sparkbox/carbon-cli/compare/v0.2.2...v0.2.3) (2019-09-24)


### Bug Fixes

* release ci task ([#5](https://github.com/sparkbox/carbon-cli/issues/5)) ([05196d8](https://github.com/sparkbox/carbon-cli/commit/05196d8))


### Features

* add test coverage to ci ([#4](https://github.com/sparkbox/carbon-cli/issues/4)) ([2207d24](https://github.com/sparkbox/carbon-cli/commit/2207d24))

### [0.2.2](https://github.com/sparkbox/carbon-cli/compare/v0.2.1...v0.2.2) (2019-09-24)


### Features

* add initial source and test files ([#3](https://github.com/sparkbox/carbon-cli/issues/3)) ([72b9353](https://github.com/sparkbox/carbon-cli/commit/72b9353))

### [0.2.1](https://github.com/sparkbox/carbon-cli/compare/v0.2.0...v0.2.1) (2019-09-23)


### Bug Fixes

* ci skip release on push back to master ([#2](https://github.com/sparkbox/carbon-cli/issues/2)) ([9c27793](https://github.com/sparkbox/carbon-cli/commit/9c27793))

## [0.2.0](https://github.com/sparkbox/carbon-cli/compare/v0.1.0...v0.2.0) (2019-09-23)


### ⚠ BREAKING CHANGES

* bumping minor version for zero-major
* fix: remove man docs task
* ci: only publish master
* ci: run real release and publish
* ci: skip signing commits and tags (future improvement)

### Features

* ci setup ([1203ddb](https://github.com/sparkbox/carbon-cli/commit/1203ddb)), closes [#1](https://github.com/sparkbox/carbon-cli/issues/1)

## 0.1.0 (2019-09-21)


### Features

* initial scaffolding and configs ([68783f9](https://github.com/sparkbox/carbon-cli/commit/68783f9))
