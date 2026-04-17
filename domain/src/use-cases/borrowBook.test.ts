import { describe, it, expect } from "vitest";
import { borrowBook } from "./borrowBook";
import { BookRepository } from "../repositories/BookRepository";
import { LoanRepository } from "../repositories/LoanRepository";
import { BookProps } from "../entities/Book";
import { LoanProps } from "../entities/Loan";

class InMemoryBookRepository implements BookRepository {
  constructor(private books: BookProps[] = []) {}
  async findById(id: string) {
    return this.books.find((b) => b.id === id) ?? null;
  }
  async findActiveByUserId(_userId: string) {
    return [];
  }
  async save(book: BookProps) {
    const i = this.books.findIndex((b) => b.id === book.id);
    if (i >= 0) this.books[i] = book;
    else this.books.push(book);
  }
}

class InMemoryLoanRepository implements LoanRepository {
  public loans: LoanProps[] = [];
  async findById(id: string) {
    return this.loans.find((l) => l.id === id) ?? null;
  }
  async save(loan: LoanProps) {
    const i = this.loans.findIndex((l) => l.id === loan.id);
    if (i >= 0) this.loans[i] = loan;
    else this.loans.push(loan);
  }
}

describe("borrowBook", () => {
  it("should allow borrowing a book if it's available", async () => {
    const book: BookProps = {
      id: "book-1",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      isbn: "9780134494166",
      genre: "Software",
      isAvailable: true,
    };
    const bookRepo = new InMemoryBookRepository([book]);
    const loanRepo = new InMemoryLoanRepository();

    const loan = await borrowBook(
      { userId: "user-1", bookId: "book-1" },
      bookRepo,
      loanRepo,
    );

    expect(loan.userId).toBe("user-1");
    expect(loan.bookId).toBe("book-1");
    expect(loan.status).toBe("active");
    expect(loan.returnDate).toBeNull();
    expect(loanRepo.loans).toHaveLength(1);

    const updatedBook = await bookRepo.findById("book-1");
    expect(updatedBook?.isAvailable).toBe(false);
  });
});
