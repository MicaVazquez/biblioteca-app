import { describe, it, expect } from "vitest";
import { registerUser } from "./registerUser";
import { UserRepository } from "../repositories/UserRepository";
import { UserProps } from "../entities/User";

// Repositorio falso para tests
const mockUserRepository: UserRepository = {
  findByEmail: async (email: string) => null, // simula que no existe
  save: async (user: UserProps) => {},
};

describe("registerUser", () => {
  it("should register a new user", async () => {
    const user = await registerUser(
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
      },
      mockUserRepository,
    );

    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
  });
});
