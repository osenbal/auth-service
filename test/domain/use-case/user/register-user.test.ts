import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repository";
import User from "../../../../src/domain/entities/user";
import { RegisterUser } from "../../../../src/domain/use-cases/user/register-user";

describe("Register User", () => {
  class MockUserRepository implements UserRepository {
    getUserByEmail(email: string): Promise<User> {
      throw new Error("Method not implemented.");
    }
    isEmailExist(email: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    register(user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<User> {
      throw new Error("Method not implemented.");
    }
  }

  let mockUserRepositories: MockUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepositories = new MockUserRepository();
  });

  test("should return true", async () => {
    const InputData = {
      _id: "1",
      firstName: "John",
      surname: "Doe",
      email: "jhon@gmail.com",
      password: "iqbal1234",
    };

    jest
      .spyOn(mockUserRepositories, "isEmailExist")
      .mockImplementation(() => Promise.resolve(false));

    jest
      .spyOn(mockUserRepositories, "register")
      .mockImplementation(() => Promise.resolve(true));

    const registerUserUseCase = new RegisterUser(mockUserRepositories);
    const result = await registerUserUseCase.execute(InputData);
    expect(result).toBe(true);
  });

  test("if email is already taken, should throw error", async () => {
    const InputData = {
      _id: "1",
      firstName: "John",
      surname: "Doe",
      email: "iqbal@gmail.com",
      password: "iqbal1234",
    };

    jest
      .spyOn(mockUserRepositories, "isEmailExist")
      .mockImplementation(() => Promise.resolve(true));

    const registerUserUseCase = new RegisterUser(mockUserRepositories);

    await expect(registerUserUseCase.execute(InputData)).rejects.toThrowError(
      "Email is already taken"
    );

    expect(mockUserRepositories.isEmailExist).toBeCalledWith(InputData.email);
  });
});
