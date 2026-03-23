import { describe, it, expect } from "vitest";
import { createLoan } from "./Loan";

describe("createLoan", () => {
  it("should be created with valid properties", () => {
    const loan = createLoan({
      id: "1",
      userId: "user1",
      bookId: "book1",
      loanDate: new Date(),
      returnDate: null,
      status: "active",
    });

    expect(loan.id).toBe("1");
    expect(loan.status).toBe("active");
    expect(loan.dueDate).toBeInstanceOf(Date);
  });
});

it("should set dueDate 14 days after loanDate", () => {
  const loanDate = new Date("2024-01-01");

  const loan = createLoan({
    id: "1",
    userId: "user1",
    bookId: "book1",
    loanDate,
    returnDate: null,
    status: "active",
  });

  const expectedDueDate = new Date("2024-01-15");
  expect(loan.dueDate).toEqual(expectedDueDate);
});
