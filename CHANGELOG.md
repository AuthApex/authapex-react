# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.5](https://github.com/AuthApex/authapex-react/compare/v0.1.4...v0.1.5) (2025-10-03)


### Bug Fixes

* update typings in `AuthProvider`, `AuthGuard`, and `PermissionGuard` to use `ReactElement` and `ReactNode` ([f090ab3](https://github.com/AuthApex/authapex-react/commit/f090ab39f355581b1ba3a40afa3d3aec33304050))

### [0.1.4](https://github.com/AuthApex/authapex-react/compare/v0.1.3...v0.1.4) (2025-10-03)


### Bug Fixes

* refactor `useAuth` to improve typings, standardize state handling, and enhance callback memoization ([dd29d4f](https://github.com/AuthApex/authapex-react/commit/dd29d4fe4db480c4931d2dc00e3bc6ed67b3e1fe))
* refactor `useForcedAuth` to improve typings and ensure memoized state handling ([6af80fa](https://github.com/AuthApex/authapex-react/commit/6af80fae95b7ca1da3bc2803f01e0896bf091b1c))
* update dependencies for React v18 and v19 compatibility, upgrade axios to v1.12.0 ([6dbaa8d](https://github.com/AuthApex/authapex-react/commit/6dbaa8d5ed636b786b33bb63cc9f0b2ae34c3647))

### [0.1.3](https://github.com/AuthApex/authapex-react/compare/v0.1.2...v0.1.3) (2025-09-30)


### Bug Fixes

* rename `displayMessages` to `displayStates` in `AuthGuard` and `PermissionGuard`, use `translations.errors` for error messages ([75b863d](https://github.com/AuthApex/authapex-react/commit/75b863d246edb368d0bf1f98c492570cc1ed2158))
* update `AuthContextTranslations` to integrate `ErrorTranslations`, make `loadingMessage` optional ([635dbd3](https://github.com/AuthApex/authapex-react/commit/635dbd3403878aaa559bc52345fd0853eaf8fc52))
* upgrade `gtomy-lib` to v2.3.2 in dependencies ([94bd0db](https://github.com/AuthApex/authapex-react/commit/94bd0dbb29b341a6f6107afbfdc92e929d73e565))

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
