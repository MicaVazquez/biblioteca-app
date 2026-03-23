import { LoanProps } from "../entities/Loan";

export interface LoanRepository {
  findById(id: string): Promise<LoanProps | null>;
  save(loan: LoanProps): Promise<void>;
}
