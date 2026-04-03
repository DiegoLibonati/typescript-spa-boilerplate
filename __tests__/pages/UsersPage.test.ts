import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import UsersPage from "@/pages/UsersPage/UsersPage";

import { userService } from "@/services/userService";

import { mockUsers } from "@tests/__mocks__/users.mock";

const mockedUserService = userService as jest.Mocked<typeof userService>;

jest.mock("@/services/userService");

const renderPage = (): Page => {
  const container = UsersPage();
  document.body.appendChild(container);
  return container;
};

describe("UsersPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should render the page with correct structure", () => {
    mockedUserService.getAll.mockResolvedValue(mockUsers);

    renderPage();

    const main = document.querySelector<HTMLElement>(".users-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should show loading message initially", () => {
    mockedUserService.getAll.mockResolvedValue(mockUsers);

    renderPage();

    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("should render user cards after loading", async () => {
    mockedUserService.getAll.mockResolvedValue(mockUsers);

    renderPage();

    await screen.findByText("John Doe");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("Loading users...")).not.toBeInTheDocument();
  });

  it("should show error message when loading fails", async () => {
    mockedUserService.getAll.mockRejectedValue(new Error("Network error"));

    renderPage();

    await screen.findByText("Error loading users. Please try again.");

    expect(
      screen.getByText("Error loading users. Please try again.")
    ).toBeInTheDocument();
  });

  it("should render link to home page", () => {
    mockedUserService.getAll.mockResolvedValue(mockUsers);

    renderPage();

    const linkHome = screen.getByRole("link", {
      name: "Navigate to Home page",
    });
    expect(linkHome).toHaveAttribute("href", "#/home");
  });
});
