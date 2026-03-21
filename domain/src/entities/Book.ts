export type BookProps = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  isAvailable?: boolean;
};

export function createBook(props: BookProps): BookProps {
  if (!props.id) throw new Error("El id no puede estar vacío");
  if (!props.title) throw new Error("El título no puede estar vacío");
  if (!props.author) throw new Error("El autor no puede estar vacío");
  if (!props.isbn) throw new Error("El ISBN no puede estar vacío");

  return {
    ...props,
    isAvailable: props.isAvailable ?? true,
  };
}
