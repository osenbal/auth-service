import { UserDataSource } from "../../../src/data/interfaces/data-sources/user-data-source";
import { UserRepositoryImpl } from "../../../src/domain/repositories/user-repository";
import User from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/interfaces/repositories/user-repository";

class MockUserDataSource implements UserDataSource {
  getUserById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  isEmailExist(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  register(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("User Repository=", () => {
  let mockUserDataSource: MockUserDataSource;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
    userRepository = new UserRepositoryImpl(mockUserDataSource);
  });

  describe("register user", () => {
    test("should return true when user is registered", async () => {
      const InputData = {
        _id: "1",
        firstName: "John",
        surname: "Doe",
        email: "iqbal@gmail.com",
        password: "iqbal1234",
      };

      jest.spyOn(mockUserDataSource, "isEmailExist").mockImplementation(() => {
        return Promise.resolve(false);
      });

      jest
        .spyOn(mockUserDataSource, "register")
        .mockImplementation(() => Promise.resolve(true));

      const result = await userRepository.register(InputData);
      expect(result).toBe(true);
    });

    test("should return false when user is not registered", async () => {
      const InputData = {
        _id: "1",
        firstName: "John",
        surname: "Doe",
        email: "iqbal@gmail.com",
        password: "iqbal1234",
      };

      jest.spyOn(mockUserDataSource, "isEmailExist").mockImplementation(() => {
        return Promise.resolve(false);
      });

      jest
        .spyOn(mockUserDataSource, "register")
        .mockImplementation(() => Promise.resolve(false));

      const result = await userRepository.register(InputData);
      expect(result).toBe(false);
    });

    test("if email is already taken, should return true", async () => {
      const InputData = {
        _id: "1",
        firstName: "John",
        surname: "Doe",
        email: "iqbal@gmail.com",
        password: "iqbal1234",
      };

      jest
        .spyOn(mockUserDataSource, "isEmailExist")
        .mockImplementation(() => Promise.resolve(true));

      const result = await userRepository.isEmailExist(InputData.email);

      expect(result).toBe(true);
    });
  });

  describe("isEmailExist", () => {
    test("should return true when email is exist", async () => {
      const InputData = {
        email: "iqbal@gmail.com",
        password: "alumni010",
      };

      jest.spyOn(mockUserDataSource, "getUserByEmail").mockImplementation(() =>
        Promise.resolve({
          firstName: "iqbal",
          surname: "maulan",
          email: "iqbal123@gmail.com",
          password:
            "$2b$10$VcLT0J6Ik5MqfaOB/3OmWu6Lthav3JXL1lZWVT7U3bUQqSOQe69Ru",
        })
      );

      const result = await userRepository.getUserByEmail(InputData.email);
      expect(result).toStrictEqual({
        firstName: "iqbal",
        surname: "maulan",
        email: "iqbal123@gmail.com",
        password:
          "$2b$10$VcLT0J6Ik5MqfaOB/3OmWu6Lthav3JXL1lZWVT7U3bUQqSOQe69Ru",
      });
    });
  });

  describe("getUserByEmail", () => {
    test("should return true when email is exist", async () => {
      const InputData = {
        email: "iqbal@gmail.com",
        password: "alumni010",
      };

      jest
        .spyOn(mockUserDataSource, "getUserByEmail")
        .mockImplementation(() => {
          return Promise.resolve({
            firstName: "iqbal",
            surname: "maulan",
            email: "iqbal@gmail.com",
            password: "alumni010",
          });
        });

      const result = await userRepository.getUserByEmail(InputData.email);

      expect(result).toStrictEqual({
        firstName: "iqbal",
        surname: "maulan",
        email: "iqbal@gmail.com",
        password: "alumni010",
      });

      expect(mockUserDataSource.getUserByEmail).toBeCalledWith(InputData.email);

      expect(mockUserDataSource.getUserByEmail).toBeCalledTimes(1);
    });
  });

  describe("getUserById", () => {
    test("should return user when id is exist", async () => {
      const InputData = {
        _id: "1",
        firstName: "iqbal",
        surname: "maulan",
        email: "iqbal@gmail.com",
        password: "alumni010",
      };

      jest.spyOn(mockUserDataSource, "getUserById").mockImplementation(() => {
        return Promise.resolve({
          _id: "1",
          firstName: "iqbal",
          surname: "maulan",
          email: "iqbal@gmail.com",
          password: "alumni010",
        });
      });

      const result = await userRepository.getUserById(InputData._id);

      expect(result).toStrictEqual({
        _id: "1",
        firstName: "iqbal",
        surname: "maulan",
        email: "iqbal@gmail.com",
        password: "alumni010",
      });

      expect(mockUserDataSource.getUserById).toBeCalledWith(InputData._id);

      expect(mockUserDataSource.getUserById).toBeCalledTimes(1);
    });
  });
});
