import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

afterEach(() => {
  cleanup();
});

describe("SearchBar (tester, utan timers)", () => {
  it("visar felmeddelande vid för kort inmatning", () => {
    render(<SearchBar query="" onQueryChange={() => {}} debounceMs={0} />);

    const input = screen.getByRole("textbox", { name: /sök land/i });
    fireEvent.change(input, { target: { value: "s" } });

    expect(screen.getByText(/minst 2 tecken/i)).toBeInTheDocument();
  });

  it("anropar onQueryChange direkt när inmatningen är giltig", async () => {
    const handleChange = vi.fn();
    render(<SearchBar query="" onQueryChange={handleChange} debounceMs={0} />);

    const input = screen.getByRole("textbox", { name: /sök land/i });
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, "Sweden");

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("Sweden");
    });
  });

  it("anropar inte onQueryChange när inmatningen är ogiltig", () => {
    const handleChange = vi.fn();
    render(<SearchBar query="" onQueryChange={handleChange} debounceMs={0} />);

    const input = screen.getByRole("textbox", { name: /sök land/i });
    fireEvent.change(input, { target: { value: "1!" } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
