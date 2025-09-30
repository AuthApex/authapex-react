# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.2](https://github.com/AuthApex/authapex-react/compare/v0.1.1...v0.1.2) (2025-09-30)


### Bug Fixes

* add retry logic for queries in `queryClient` and ignore retries for 401 errors, add TODO for token refresh ([b72bf54](https://github.com/AuthApex/authapex-react/commit/b72bf547559aba35e61f07c624a3337dea658504))
* refactor `AuthGuard` and `PermissionGuard` to use `useAuthContext` translations, replace `messages` with `displayMessages` ([9885861](https://github.com/AuthApex/authapex-react/commit/9885861c9cd28f4bc99eb6fa2943807c635deb36))
* refactor `queryClient` retry logic and enhance `useAuth` with translations for error messages ([1b04374](https://github.com/AuthApex/authapex-react/commit/1b04374f6bdb6d797564729aa2807636d44e1b21))

### [0.1.1](https://github.com/AuthApex/authapex-react/compare/v0.1.0...v0.1.1) (2025-09-20)


### Bug Fixes

* enhance `useAuth` hook with error handling, refetch support, and modular query function ([d39ca84](https://github.com/AuthApex/authapex-react/commit/d39ca84c66c1d5fca97bbd4ea86cbb2ec3d09e85))
* make `messages` optional in `AuthGuard` and handle error state with retry logic ([17130f3](https://github.com/AuthApex/authapex-react/commit/17130f3d8cab4bc531af1fc54545bc26df931f45))
* make `messages` optional in `PermissionGuard` and update logic for role checks ([a1da238](https://github.com/AuthApex/authapex-react/commit/a1da238500940b34bed23796ce211f99bc9ba1d2))

### 0.1.0 (2025-08-22)

### Features
* Initialize project
