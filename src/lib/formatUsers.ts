import { User } from "./fetchUsers";

export type FormatedUsers = Pick<User, "id" | "name" | "email">;

export function formatUsers(users: User[]): FormatedUsers[] {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
}
