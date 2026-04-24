import { screen } from "@testing-library/dom";

import type { UserCardProps } from "@/types/props";
import type { UserCardComponent } from "@/types/components";

import UserCard from "@/components/UserCard/UserCard";

const defaultProps: UserCardProps = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123-456-7890",
  website: "johndoe.com",
  company: { name: "Doe Inc" },
};

const renderComponent = (
  props: Partial<UserCardProps> = {}
): UserCardComponent => {
  const element = UserCard({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("UserCard", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render an article element with the user-card class", () => {
      renderComponent();
      expect(screen.getByRole("article")).toHaveClass("user-card");
    });

    it("should render the user name as a heading", () => {
      renderComponent();
      expect(
        screen.getByRole("heading", { name: "John Doe" })
      ).toBeInTheDocument();
    });

    it("should render the username with an @ prefix", () => {
      renderComponent();
      expect(screen.getByText("@johndoe")).toBeInTheDocument();
    });

    it("should render a mailto link for the email", () => {
      renderComponent();
      const emailLink = screen.getByRole("link", { name: "john@example.com" });
      expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");
    });

    it("should render a tel link for the phone", () => {
      renderComponent();
      const phoneLink = screen.getByRole("link", { name: "123-456-7890" });
      expect(phoneLink).toHaveAttribute("href", "tel:123-456-7890");
    });

    it("should render a link for the website with the https protocol", () => {
      renderComponent();
      const websiteLink = screen.getByRole("link", { name: "johndoe.com" });
      expect(websiteLink).toHaveAttribute("href", "https://johndoe.com");
    });

    it("should open the website link in a new tab", () => {
      renderComponent();
      const websiteLink = screen.getByRole("link", { name: "johndoe.com" });
      expect(websiteLink).toHaveAttribute("target", "_blank");
      expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render the company name", () => {
      renderComponent();
      expect(screen.getByText(/Doe Inc/)).toBeInTheDocument();
    });
  });
});
