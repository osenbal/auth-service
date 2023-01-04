import request from "supertest";
import User from "../../../src/domain/entities/user";
import { RegisterUserUseCase } from "../../../src/domain/interfaces/use-cases/user/register-user";
import { LoginUserUseCase } from "../../../src/domain/interfaces/use-cases/user/login-user";
import { RefreshTokenUseCase } from "../../../src/domain/interfaces/use-cases/user/refresh-token";
import AuthRouter from "../../../src/presentation/routers/auth-router";
import server from "../../../src/server";

class MockRegisterUserUseCase implements RegisterUserUseCase {
  execute(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockLoginUserUseCase implements LoginUserUseCase {
  execute(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

class MockRefreshTokenUseCase implements RefreshTokenUseCase {
  execute(userId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

describe("Auth Router", () => {
  let mockRegisterUserUseCase: MockRegisterUserUseCase;
  let mockLoginUserUseCase: MockLoginUserUseCase;
  let mockRefreshTokenUseCase: MockRefreshTokenUseCase;

  beforeAll(() => {
    mockRegisterUserUseCase = new MockRegisterUserUseCase();
    mockLoginUserUseCase = new MockLoginUserUseCase();
    mockRefreshTokenUseCase = new MockRefreshTokenUseCase();
    server.use(
      "/auth",
      AuthRouter(
        mockRegisterUserUseCase,
        mockLoginUserUseCase,
        mockRefreshTokenUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/register - Register TEST", () => {
    test("Should return 201 when user is registered successfully", async () => {
      const InputData = {
        _id: "1",
        firstName: "John",
        surname: "Doe",
        email: "iqbal@gmail.com",
        password: "iqbal1234",
      };
      jest
        .spyOn(mockRegisterUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));
      const response = await request(server)
        .post("/auth/register")
        .send(InputData);
      expect(response.status).toBe(201);
    });

    test("Should return 500 when user is not registered successfully", async () => {
      const InputData = {
        _id: "1",
        firstName: "John",
        surname: "Doe",
        email: "iqbal@gmail.com",
        password: "iqbal1234",
      };
      jest
        .spyOn(mockRegisterUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server)
        .post("/auth/register")
        .send(InputData);
      expect(response.status).toBe(500);
    });
  });
});
