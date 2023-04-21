Sure, here's an updated version of the README with that information added:

![reactjs-vite-windicss-boilerplate](https://user-images.githubusercontent.com/16243531/217138979-b854309c-4742-4275-a705-f9fec5158217.jpg)

# React WindiCSS Boilerplate build with Vite

This is a boilerplate build with Vite, React 18, TypeScript, Vitest, Testing Library, WindiCSS, Eslint and Prettier. It also uses the AWS Cloudscape Design System for styling.

## What is inside?

This project uses many tools like:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [WindiCSS](TODO)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [AWS Cloudscape Design System](https://aws.github.io/cloudscape/)

## Getting Started

| :exclamation: Make sure the values are the same between `Frontend/.env_example` and `Infrastructure/.env_example` |
| ----------------------------------------------------------------------------------------------------------------- |

1. Copy `.env_example` to `.env`
2. Set the Cognito user pool and web client in the .env you created.

```
  VITE_USER_POOL_ID=us-east-asdfasdf
  VITE_WEB_CLIENT_ID=5jdhp59miciioagsdsdhb8t023l
```

### Install

Install dependencies.

```bash
npm install
```

Serve with hot reload at <http://localhost:5173>.

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

View and interact with your tests via UI.

```bash
npm run test:ui
```

## License

This project is licensed under the MIT License.
