import type { Page } from "@/types/pages";
import type { MatchRoute, Route } from "@/types/router";

import HomePage from "@/pages/HomePage/HomePage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import ProductPage from "@/pages/ProductPage/ProductPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import StorePage from "@/pages/StorePage/StorePage";
import UsersPage from "@/pages/UsersPage/UsersPage";

import envs from "@/constants/envs";

const PRINCIPAL_ROUTE = "/";
const ERROR_ROUTE = "/error";
const REDIRECT_IF_ROUTE_NOT_EXISTS = envs.redirectIfRouteNotExists;

const routes: Route[] = [
  { path: PRINCIPAL_ROUTE, component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/store", component: StorePage },
  { path: "/users", component: UsersPage },
  { path: "/products/:id", component: ProductPage },
  { path: ERROR_ROUTE, component: NotFoundPage },
];

const matchRoute = (pathname: string): MatchRoute => {
  for (const route of routes) {
    const paramNames: string[] = [];
    const regexPath = route.path.replace(/:([^/]+)/g, (_, key: string) => {
      paramNames.push(key);
      return "([^/]+)";
    });

    const regex = new RegExp(`^${regexPath}$`);
    const match = pathname.match(regex);

    if (match) {
      const params = paramNames.reduce<Record<string, string>>(
        (acc, key, i) => {
          acc[key] = match[i + 1] ?? "";
          return acc;
        },
        {}
      );
      return { component: route.component, params };
    }
  }

  return null;
};

export const renderRoute = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const current = app.firstElementChild as Page | null;

  current?.cleanup?.();

  const hash = window.location.hash;

  if (!hash) {
    window.location.href = `/#${PRINCIPAL_ROUTE}`;
    return;
  }

  const path = hash.replace("#", "");
  const matched = matchRoute(path);

  app.innerHTML = "";

  if (!matched) {
    window.location.href = !REDIRECT_IF_ROUTE_NOT_EXISTS
      ? `/#${ERROR_ROUTE}`
      : `/#${PRINCIPAL_ROUTE}`;
    return;
  }

  const element = matched.component(matched.params);
  app.appendChild(element);
};

export const initRouter = (): void => {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
};
