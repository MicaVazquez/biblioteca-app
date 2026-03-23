import { describe, it, expect } from "vitest";
import { registerUser } from "./registerUser";
import { UserRepository } from "../repositories/UserRepository";
import { UserProps } from "../entities/User";

it("should not allow duplicate email", async () => {
  const existingUser: UserProps = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  };

  // Este repositorio simula que ya existe el usuario
  const repositoryWithUser: UserRepository = {
    findByEmail: async () => existingUser,
    save: async () => {},
  };

  await expect(() =>
    registerUser(
      {
        name: "Otra persona",
        email: "john@example.com",
        password: "password123",
        role: "user",
      },
      repositoryWithUser,
    ),
  ).rejects.toThrow("El email ya está registrado");
});
