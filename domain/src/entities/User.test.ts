import { describe, it, expect } from "vitest";
import { createUser } from "./User";

describe("createUser", () => {
  it("should create a user with valid properties", () => {
    const user = createUser({
      id: "1",
      name: "John Doe",
      email: "hola@example.com",
      password: "password123",
      role: "user",
    });

    expect(user.name).toBe("John Doe");
  });

  it("should not allow empty id", () => {
    expect(() =>
      createUser({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "user",
      }),
    ).toThrow("El id no puede estar vacío");
  });

  it("should not allow invalid email", () => {
    expect(() =>
      createUser({
        id: "1",
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
        role: "user",
      }),
    ).toThrow("El email no es válido");
  });
});
