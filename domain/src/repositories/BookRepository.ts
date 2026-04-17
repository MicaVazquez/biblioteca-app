import { BookProps } from "../entities/Book";

export interface BookRepository {
  findById(id: string): Promise<BookProps | null>;
  save(book: BookProps): Promise<void>;
}
