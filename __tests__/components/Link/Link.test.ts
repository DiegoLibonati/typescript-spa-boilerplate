import { screen } from "@testing-library/dom";

import type { LinkProps } from "@/types/props";
import type { LinkComponent } from "@/types/components";

import Link from "@/components/Link/Link";

const defaultProps: LinkProps = {
  id: "link-test",
  href: "/about",
  ariaLabel: "Go to about page",
  children: "About",
  target: "_self",
};

const renderComponent = (props: Partial<LinkProps> = {}): LinkComponent => {
  const element = Link({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Link", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render an anchor element", () => {
      renderComponent();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveAttribute("id", "link-test");
    });

    it("should set the aria-label attribute", () => {
      renderComponent();
      expect(
        screen.getByRole("link", { name: "Go to about page" })
      ).toBeInTheDocument();
    });

    it("should render the children as text content", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveTextContent("About");
    });

    it("should include the base link class and the provided className", () => {
      renderComponent({ className: "nav-link" });
      expect(screen.getByRole("link")).toHaveClass("link", "nav-link");
    });

    it("should render with empty content when children is not provided", () => {
      renderComponent({ children: undefined });
      expect(screen.getByRole("link")).toHaveTextContent("");
    });
  });

  describe("href transformation", () => {
    it("should prefix with # when href starts with /", () => {
      renderComponent({ href: "/about" });
      expect(screen.getByRole("link")).toHaveAttribute("href", "#/about");
    });

    it("should not transform href that already starts with /#", () => {
      renderComponent({ href: "/#/about" });
      expect(screen.getByRole("link")).toHaveAttribute("href", "/#/about");
    });

    it("should not transform external https hrefs", () => {
      renderComponent({ href: "https://example.com" });
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://example.com"
      );
    });

    it("should not transform mailto hrefs", () => {
      renderComponent({ href: "mailto:user@example.com" });
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "mailto:user@example.com"
      );
    });
  });

  describe("target and rel", () => {
    it("should default target to _blank when not provided", () => {
      renderComponent({ target: undefined });
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("should set rel to noopener noreferrer when target is _blank", () => {
      renderComponent({ target: "_blank" });
      expect(screen.getByRole("link")).toHaveAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

    it("should set an empty rel when target is _self", () => {
      renderComponent({ target: "_self" });
      expect(screen.getByRole("link")).toHaveAttribute("rel", "");
    });

    it("should set the provided target attribute", () => {
      renderComponent({ target: "_self" });
      expect(screen.getByRole("link")).toHaveAttribute("target", "_self");
    });
  });
});
