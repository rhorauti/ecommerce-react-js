import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badge from "./Badge";

describe("Badge Component", () => {
  const baseClasses = ["absolute", "-top-1", "-right-3", "bg-red-600", "text-xs", "rounded-full", "px-1", "text-white"];

  test("it should render badge count with correct styles when count > 0", () => {
    const customCount = 5;
    render(
      <Badge count={customCount}>
        <p>Badge</p>
      </Badge>
    );
    const badge = screen.getByText("5");
    baseClasses.forEach((cls) => {
      expect(badge.parentElement).toHaveClass(cls);
    });
  });

  test("it should screen number > 0", () => {
    const customCount = 2;
    render(<Badge count={customCount}>Badge</Badge>);
    expect(screen.getByText(customCount.toString())).toBeInTheDocument();
  });

  test("it should not screen number == 0", () => {
    const customCount = 0;
    render(<Badge count={customCount}>Badge</Badge>);
    expect(screen.getByText(String(customCount))).not.toBeInTheDocument();
  });
});
