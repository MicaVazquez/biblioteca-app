import { describe, it, expect } from "vitest";
import { addBook } from "./addBook";
import { BookRepository } from "../repositories/BookRepository";
import { BookProps } from "../entities/Book";
class InMemoryBookRepository implements BookRepository {
  public books: BookProps[] = [];
  async save(book: BookProps) {
    this.books.push(book);
  }
  async findById(id: string) {
    return this.books.find((book) => book.id === id) || null;
  }
}

describe("addBook use case", () => {
  it("should add a new book to the repository", async () => {
    const repo = new InMemoryBookRepository();
    const book = await addBook(
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Fiction",
      },
      repo,
    );
    expect(repo.books).toHaveLength(1);
    expect(repo.books[0].title).toBe("The Great Gatsby");
    expect(book.id).toBeDefined();
    expect(book.isAvailable).toBe(true);
  });
  it("should throw if the title is empty", async () => {
    const repo = new InMemoryBookRepository();

    await expect(
      addBook({ title: "", author: "X", isbn: "123", genre: "Y" }, repo),
    ).rejects.toThrow("El título no puede estar vacío");
  });
});
