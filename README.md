[<img src="https://ik.imagekit.io/iutsav/fork_l0RKONb5l.svg" height="30" />](https://githubbox.com/utsavdotpro/starter-ionic-capacitor-tailwind-ts)

# PoC: Offline-first Ionic + Capacitor app with PouchDB & CouchDB

PoC for building a offline-first app using PouchDB & CouchDB in Ionic + Capacitor

Starter with a template for Ionic + Capacitor with Tailwind in TypeScript with an opinionated [modular project structure](#project-structure).

### Technologies

[![](https://img.shields.io/badge/Ionic-v7-176bff?style=for-the-badge&logo=ionic)](https://ionicframework.com/)
[![](https://img.shields.io/badge/Capacitor-v6-119eff?style=for-the-badge&logo=capacitor)](https://capacitorjs.com/)
[![](https://img.shields.io/badge/PouchDB-v9-6CCB99?style=for-the-badge&logo=)](https://vitejs.dev/)
[![](https://img.shields.io/badge/CouchDB-v3-E42528?style=for-the-badge&logo=apachecouchdb)](https://vitejs.dev/)
[![](https://img.shields.io/badge/React-v18-149eca?style=for-the-badge&logo=react)](https://react.dev/)
[![](https://img.shields.io/badge/Tailwind-v3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![](https://img.shields.io/badge/TypeScript-v5-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![](https://img.shields.io/badge/Vite-v5-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## Sample

<img src="sample/screenshot1.jpeg" width="400" alt="Sample Screenshot" />

## Getting started

Prepare development environment

```bash
pnpm install # install node dependencies & sync the assets with native projects
```

### Setting up the Databases

- [Download](https://couchdb.apache.org/#download), install & run a CouchDB instance
- Update the `src/lib/db/pouchDB.ts` with your `REMOTE_DB_URL`

### Working with Web

```bash
pnpm start # start the development server
pnpm build # generate the production build
```

### Working with iOS

```bash
pnpm ios # start the project in simulator
pnpm build:ios # generate the production build & open in Xcode
```

### Working with Android

```bash
pnpm android # start the project in emulator
pnpm build:android # generate the production build & open in Android Studio
```

## Project Structure

```
|-- android                   ℹ️ generated android project
|-- ios                       ℹ️ generated ios project
|-- public                    ℹ️ keep your static resource files
|-- src
|   |-- common
|   |   |-- components
|   |   |   |-- elements      ℹ️ keep your state-less components
|   |   |   |                 ℹ️ keep your state-full components
|   |   |-- hoc
|   |   |-- hooks
|   |   |-- layouts
|   |   |-- sections          ℹ️ keep your common sections
|   |-- core
|   |   |-- config            ℹ️ keep your configuration files
|   |   |-- constants
|   |   |-- types
|   |   |-- utils
|   |-- lib
|   |-- pages                 ℹ️ pages & their components
|   |-- theme
```

## How to's

### Update App Logo

> https://github.com/ionic-team/capacitor-assets#usage

- Create following three variants of the logo in the `resources/`
  - icon-foreground.png
  - icon-background.png
  - icon-only.png - actual logo with background
- Run the following command:
  ```bash
  npx @capacitor/assets generate
  ```
