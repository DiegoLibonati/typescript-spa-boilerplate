import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ActionProps } from "@/types/props";
import type { ActionComponent } from "@/types/components";

import Action from "@/components/Action/Action";

const mockOnClick = jest.fn();

const defaultProps: ActionProps = {
  id: "action-btn",
  ariaLabel: "Click me",
  children: "Click",
  className: "primary",
  onClick: mockOnClick,
};

const renderComponent = (props: Partial<ActionProps> = {}): ActionComponent => {
  const element = Action({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Action", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "action-btn");
    });

    it("should set the aria-label attribute", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Click me" })
      ).toBeInTheDocument();
    });

    it("should render the children as text content", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveTextContent("Click");
    });

    it("should include the base action class and the provided className", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("action", "primary");
    });

    it("should use only the action class when no className is provided", () => {
      renderComponent({ className: undefined });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("action");
      expect(button.className).toBe("action");
    });

    it("should render with empty content when children is not provided", () => {
      renderComponent({ children: undefined });
      expect(screen.getByRole("button")).toHaveTextContent("");
    });
  });

  describe("behavior", () => {
    it("should call onClick with the event and id when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "action-btn"
      );
    });

    it("should pass the correct id regardless of other props", async () => {
      const user = userEvent.setup();
      renderComponent({ id: "custom-id" });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "custom-id"
      );
    });
  });

  describe("cleanup", () => {
    it("should remove the click listener so onClick is no longer called", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup?.();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
