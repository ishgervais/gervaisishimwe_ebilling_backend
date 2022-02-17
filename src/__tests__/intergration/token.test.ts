import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";
const { serverURL } = createTestServer();

const Token = {
  id: expect.any(Number),
  token: expect.any(String),
  meter: expect.any(String),
  amount: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  expiresAt: expect.any(String),
  status: expect.any(Boolean),
};

describe("Token api", () => {
  describe("GET /api/tokens", () => {
    it("should return all meter tokens", async () => {
      const { statusCode, body, headers } = await request(
        `${serverURL}/api/tokens`
      );

      const parsedBody = await body.json();

      expect(statusCode).toBe(200);
      expect(headers["content-type"]).toMatch(/application\/json/);

      for (const token of parsedBody) {
        expect(token).toMatchObject(Token);
      }
    });
  });

  describe("GET /api/tokens/:id", () => {
    it.skip("should find meter token by id", async () => {});
  });

  describe("POST /api/tokens", () => {
    it("should create meter token and return that token", async () => {
      const { statusCode, body } = await request(`${serverURL}/api/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meter: "111114128233",
          amount: "2000",
        }),
      });
      const response = await body.json();
      expect(statusCode).toBe(201);
      expect(response).toMatchObject(Token);
    });
  });
});
