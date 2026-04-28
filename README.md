# Typescript Vite Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Typescript Vite Boilerplate** is a starting point for building Single Page Applications with **Vanilla TypeScript** and **Vite**, without frameworks or runtime dependencies.

**The problem it solves:** every time you start a vanilla TypeScript SPA from scratch you end up making the same decisions — how to handle routing, how to manage state, how to structure components, how to wire up linting, formatting, and tests. This boilerplate makes those decisions once so you can clone it and go straight to writing product logic.

**What it includes:**

- **Hash-based router** with dynamic segments (`:id`), automatic page cleanup on navigation, and configurable 404 handling via environment variables
- **Observer-pattern store** — a generic abstract `Store<T>` class you extend to define your own state and reducers; subscriptions are per-key and granular, listeners only fire when the specific value they watch actually changes
- **Factory function component model** — components and pages are plain TypeScript functions that return a configured `HTMLElement`, accept typed props, and expose an optional `cleanup()` method; no virtual DOM, no JSX
- **Strict TypeScript config** — `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitReturns`, zero `any`
- **ESLint + Prettier** wired together, enforced on every commit via Husky + lint-staged
- **Jest 30 + ts-jest + jsdom + Testing Library** fully configured with path aliases, CSS mocks, and a 70% coverage threshold enforced across branches, functions, lines, and statements
- **Typed environment variables** accessed through a constants layer so `import.meta.env` is never scattered across the codebase
- **Path aliases** (`@/*` → `src/*`, `@tests/*` → `__tests__/*`) configured in TypeScript, Vite, and Jest

**How to use it:** clone the repository, rename the project in `package.json`, delete the template pages and components you don't need (`StorePage`, `UsersPage`, etc.), replace `templateStore` with your own stores, and add your routes to the router. The infrastructure — routing, state, testing, linting — stays untouched.

## Technologies Used

1. TypeScript
2. Vite
3. HTML5
4. CSS3

## Libraries Used

### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

### DevDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Available Scripts

| Command                 | Description                   |
| ----------------------- | ----------------------------- |
| `npm run dev`           | Start development server      |
| `npm run build`         | Build for production          |
| `npm run preview`       | Preview production build      |
| `npm run test`          | Run tests                     |
| `npm run test:watch`    | Run tests in watch mode       |
| `npm run test:coverage` | Run tests with coverage       |
| `npm run lint`          | Check for linting errors      |
| `npm run lint:fix`      | Fix linting errors            |
| `npm run lint:all`      | Fix linting all (src - tests) |
| `npm run format`        | Format code with Prettier     |
| `npm run format:check`  | Check code formatting         |
| `npm run format:all`    | Format Prettier (src - tests) |
| `npm run type-check`    | Run TypeScript type checking  |

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/typescript-vite-boilerplate`](https://www.diegolibonati.com.ar/#/project/typescript-vite-boilerplate)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Env Keys

| Key                                 | Description                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `VITE_REDIRECT_IF_ROUTE_NOT_EXISTS` | If `true`, redirects to home when route doesn't exist. If `false`, shows 404 page. |
| `VITE_TEMPLATE_API_URL`             | Users API URL.                                                                     |

```bash
VITE_REDIRECT_IF_ROUTE_NOT_EXISTS=false
VITE_TEMPLATE_API_URL=https://jsonplaceholder.typicode.com
```

## Project Structure

```
typescript-vite-boilerplate/
├── __tests__/
│   ├── __mocks__/
│   │   ├── file.mock.ts
│   │   └── style.mock.ts
│   ├── components/
│   │   ├── Action.test.ts
│   │   └── Link.test.ts
│   ├── helpers/
│   │   └── getLocalStorage.test.ts
│   ├── pages/
│   │   ├── AboutPage.test.ts
│   │   ├── HomePage.test.ts
│   │   ├── NotFoundPage.test.ts
│   │   ├── ProductPage.test.ts
│   │   └── StorePage.test.ts
│   ├── router/
│   │   └── appRouter.test.ts
│   ├── stores/
│   │   └── templateStore.test.ts
│   ├── jest.constants.ts
│   └── jest.setup.ts
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── index.ts
│   ├── components/
│   │   ├── Action/
│   │   │   ├── Action.ts
│   │   │   └── Action.css
│   │   └── Link/
│   │       ├── Link.ts
│   │       └── Link.css
│   ├── constants/
│   │   ├── envs.ts
│   │   └── vars.ts
│   ├── core/
│   │   └── store.ts
│   ├── helpers/
│   │   └── getLocalStorage.ts
│   ├── pages/
│   │   ├── AboutPage/
│   │   ├── HomePage/
│   │   ├── NotFoundPage/
│   │   ├── ProductPage/
│   │   └── StorePage/
│   ├── router/
│   │   └── appRouter.ts
│   ├── stores/
│   │   └── templateStore.ts
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   ├── envs.ts
│   │   ├── pages.ts
│   │   ├── props.ts
│   │   ├── router.ts
│   │   ├── states.ts
│   │   └── store.ts
│   ├── index.css
│   └── index.ts
├── .husky/
│   └── pre-commit
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── .env
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── jest.config.js
├── package.json
├── tsconfig.app.json
├── tsconfig.base.json
├── tsconfig.json
├── tsconfig.test.json
├── vite.config.js
└── README.md
```

### Folder Descriptions

| Folder                 | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `__tests__/`           | Contains all test files organized by feature          |
| `__tests__/__mocks__/` | Mock files for static assets (CSS, images)            |
| `src/assets/`          | Static resources like images and fonts                |
| `src/components/`      | Reusable UI components with their styles              |
| `src/constants/`       | Static configuration values and environment variables |
| `src/core/`            | Core abstractions (Store base class)                  |
| `src/helpers/`         | Utility functions not tied to UI                      |
| `src/pages/`           | Page components, each with its own folder             |
| `src/router/`          | Hash-based routing system                             |
| `src/stores/`          | State management implementations                      |
| `src/styles/`          | Global CSS and design tokens                          |
| `src/types/`           | TypeScript types and interfaces                       |

## Architecture & Design Patterns

### Component Architecture

This project follows a **component-based architecture** for the frontend, where each UI element is self-contained with its own logic and styles.

```
┌─────────────────────────────────────────────────────────────┐
│                         PAGES                               │
│                  (HomePage, AboutPage, etc.)                │
│              Compose components and manage state            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       COMPONENTS                            │
│                    (Action, Link, etc.)                     │
│              Reusable UI elements with props                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         STORE                               │
│                   (Reactive State Management)               │
│              Observable pattern with subscriptions          │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

#### 1. Observer Pattern (Store)

**Purpose**: Allows components to subscribe to state changes and react automatically.

**Location**: `src/core/store.ts`

```typescript
export abstract class Store<T extends Record<string, unknown>> {
  protected state: T;
  protected listeners: { [K in keyof T]: Listener<T[K]>[] };

  public subscribe<K extends keyof T>(
    key: K,
    listener: Listener<T[K]>
  ): () => void {
    this.listeners[key].push(listener);
    return () => {
      // Unsubscribe logic
    };
  }

  public setState(newState: Partial<T>): void {
    // Notify listeners when state changes
  }
}
```

**Usage**:

```typescript
const unsubscribe = templateStore.subscribe("counter", (value) => {
  console.log("Counter changed:", value);
});
```

**Benefit**: Decouples state management from UI components.

#### 2. Factory Pattern (Components)

**Purpose**: Creates UI elements through functions instead of classes.

**Location**: `src/components/Action/Action.ts`

```typescript
const Action = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ActionProps): ActionComponent => {
  const action = document.createElement("button") as ActionComponent;
  action.id = id;
  // ... configure element
  return action;
};

export default Action;
```

**Benefit**: Simple, functional approach to creating DOM elements with consistent configuration.

#### 3. Hash-based Router

**Purpose**: Enables SPA navigation without server configuration.

**Location**: `src/router/appRouter.ts`

```typescript
const routes: Route[] = [
  { path: "/home", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/products/:id", component: ProductPage },
];

export const initRouter = (): void => {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
};
```

**Features**:

- Dynamic route parameters (`:id`)
- Automatic cleanup on navigation
- 404 handling

#### 4. Cleanup Pattern

**Purpose**: Prevents memory leaks by cleaning up event listeners and subscriptions.

**Location**: `src/pages/StorePage/StorePage.ts`

```typescript
const StorePage = (): HTMLElement => {
  const unsubscribe = templateStore.subscribe("counter", renderCounter);

  main.cleanup = (): void => {
    unsubscribe();
    actionSubtract.cleanup();
    actionPlus.cleanup();
  };

  return main;
};

export default StorePage;
```

**Benefit**: Each page/component manages its own cleanup, preventing memory leaks.

## Code Quality Tools

### ESLint

Configured with TypeScript strict rules:

- Explicit return types required
- No `any` type allowed
- Consistent type imports
- No unused variables

### Prettier

Automatic code formatting:

- 2 spaces indentation
- Semicolons required
- Double quotes
- Trailing commas (ES5)

### Husky + lint-staged

Pre-commit hooks that automatically:

- Run ESLint + Prettier on staged `.ts` and `.js` files
- Run Prettier on staged `.json`, `.css`, `.md`, and `.html` files
- Block commits with linting errors

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
