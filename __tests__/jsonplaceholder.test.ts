import { getPosts } from "@/lib/fetchPosts";
import { getUsers } from "@/lib/fetchUsers";

describe("JSONPlaceholder API", () => {
  it("deve retornar uma lista de usuários", async () => {
    const users = await getUsers();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
  });

  it("deve retornar uma lista de posts", async () => {
    const posts = await getPosts();

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty("id");
    expect(posts[0]).toHaveProperty("title");
    expect(posts[0]).toHaveProperty("body");
  });
});
