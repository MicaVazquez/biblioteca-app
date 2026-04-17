import { BookProps, createBook } from "../entities/Book";
import { BookRepository } from "../repositories/BookRepository";

export async function addBook(
  data: Omit<BookProps, "id" | "isAvailable">,
  repository: BookRepository,
) {
  const book = createBook({
    ...data,
    id: crypto.randomUUID(),
    isAvailable: true,
  });
  await repository.save(book);
  return book;
}
