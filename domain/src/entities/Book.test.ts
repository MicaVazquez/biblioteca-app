import { describe, it, expect } from "vitest";
import { createBook } from "./Book";

describe("createBook", () => {
  it("should create a book with valid properties", () => {
    const book = createBook({
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      genre: "Fiction",
    });

    expect(book.title).toBe("The Great Gatsby");
    expect(book.isAvailable).toBe(true);
  });

  it("should not allow empty title", () => {
    expect(() =>
      createBook({
        id: "1",
        title: "",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        genre: "Fiction",
      }),
    ).toThrow("El título no puede estar vacío");
  });
});
