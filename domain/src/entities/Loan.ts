export type LoanProps = {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate: Date | null;
  status: "active" | "returned";
};

export function createLoan(props: Omit<LoanProps, "dueDate">): LoanProps {
  if (!props.id) throw new Error("El id no puede estar vacío");
  if (!props.userId) throw new Error("El userId no puede estar vacío");
  if (!props.bookId) throw new Error("El bookId no puede estar vacío");

  const dueDate = new Date(props.loanDate);
  dueDate.setDate(dueDate.getDate() + 14);

  return {
    ...props,
    dueDate,
    status: props.status ?? "active",
  };
}
