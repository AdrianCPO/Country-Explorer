import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar (tester, utan timers)", () => {
  it("visar felmeddelande vid för kort inmatning", () => {
    render(<SearchBar query="" onQueryChange={() => {}} debounceMs={0} />);

    const input = screen.getByRole("textbox", { name: /sök land/i });
    fireEvent.change(input, { target: { value: "s" } });

    expect(screen.getByText(/minst 2 tecken/i)).toBeInTheDocument();
  });

  it("anropar onQueryChange direkt när inmatningen är giltig", () => {
    const handleChange = vi.fn();
    render(<SearchBar query="" onQueryChange={handleChange} debounceMs={0} />);

    const input = screen.getByRole("textbox", { name: /sök land/i });
    fireEvent.change(input, { target: { value: "Sweden" } });

    expect(handleChange).toHaveBeenCalledWith("Sweden");
  });

  it("anropar inte onQueryChange när inmatningen är ogiltig", () => {
    const handleChange = vi.fn();
    render(<SearchBar query="" onQueryChange={handleChange} debounceMs={0} />);

    const input = screen.getByRole("textbox", { name: /sök land/i });
    fireEvent.change(input, { target: { value: "1!" } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
