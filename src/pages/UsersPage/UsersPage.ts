import type { Page } from "@/types/pages";

import Link from "@/components/Link/Link";
import UserCard from "@/components/UserCard/UserCard";

import userService from "@/services/userService";

import "@/pages/UsersPage/UsersPage.css";

const UsersPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "users-page";

  main.innerHTML = `
    <h1 class="title">Users Page</h1>

    <p class="loading">Loading users...</p>

    <ul class="users-list" aria-label="User list"></ul>

    <nav aria-label="Page navigation">
      <ul class="links">
        <li class="link-item-1"></li>
      </ul>
    </nav>
  `;

  const usersList = main.querySelector<HTMLDivElement>(".users-list")!;
  const linkItem1 = main.querySelector<HTMLLIElement>(".link-item-1")!;

  const linkHome = Link({
    id: "link-home",
    ariaLabel: "Navigate to Home page",
    href: "/",
    children: "Go to Home Page",
    target: "_self",
  });

  linkItem1.appendChild(linkHome);

  const loadUsers = async (): Promise<void> => {
    try {
      const users = await userService.getAll();

      usersList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.append(
          UserCard({
            company: user.company,
            email: user.email,
            name: user.name,
            phone: user.phone,
            username: user.username,
            website: user.website,
          })
        );
        usersList.appendChild(li);

        const loading =
          document.querySelector<HTMLParagraphElement>(".loading");
        loading?.remove();
      });
    } catch {
      const nav = document.querySelector<HTMLElement>("nav");
      const paragraphError = document.createElement("p");
      paragraphError.textContent = "Error loading users. Please try again.";
      paragraphError.role = "alert";
      paragraphError.className = "error";
      nav?.before(paragraphError);
    }
  };

  void loadUsers();

  main.cleanup = (): void => {
    // No event listeners to clean up
  };

  return main;
};

export default UsersPage;
