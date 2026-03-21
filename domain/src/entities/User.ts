export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export function createUser(props: UserProps): UserProps {
  if (!props.id) throw new Error("El id no puede estar vacío");
  if (!props.name) throw new Error("El nombre no puede estar vacío");
  if (!props.email) throw new Error("El email no puede estar vacío");
  if (!props.password) throw new Error("La contraseña no puede estar vacía");
  if (!props.email.includes("@")) throw new Error("El email no es válido");

  return props;
}
