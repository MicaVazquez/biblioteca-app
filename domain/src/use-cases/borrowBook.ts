import { createLoan, LoanProps } from "../entities/Loan";
import { BookRepository } from "../repositories/BookRepository";
import { LoanRepository } from "../repositories/LoanRepository";

export async function borrowBook(
  data: { userId: string; bookId: string },
  bookRepo: BookRepository,
  loanRepo: LoanRepository,
): Promise<LoanProps> {
  const book = await bookRepo.findById(data.bookId);
  if (!book) throw new Error("El libro no existe");

  const loan = createLoan({
    id: crypto.randomUUID(),
    userId: data.userId,
    bookId: data.bookId,
    loanDate: new Date(),
    returnDate: null,
    status: "active",
  });

  await loanRepo.save(loan);
  await bookRepo.save({ ...book, isAvailable: false });

  return loan;
}
