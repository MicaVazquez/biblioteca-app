import { createUser, UserProps } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export async function registerUser(
  data: Omit<UserProps, "id">,
  repository: UserRepository,
) {
  const existing = await repository.findByEmail(data.email);
  if (existing) throw new Error("El email ya está registrado");

  const user = createUser({ ...data, id: crypto.randomUUID() });
  await repository.save(user);
  return user;
}
