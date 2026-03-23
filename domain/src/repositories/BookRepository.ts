import { BookProps } from "../entities/Book";

export interface BookRepository {
  findById(id: string): Promise<BookProps | null>;
  findActiveByUserId(userId: string): Promise<BookProps[]>;
  save(book: BookProps): Promise<void>;
}
