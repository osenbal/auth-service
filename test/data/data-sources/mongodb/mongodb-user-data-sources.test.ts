import { MongoDBUserDataSource } from "../../../../src/data/data-sources/mongodb/mongodb-user-data-source";
import { NoSQLDatabaseWrapper } from "../../../../src/data/interfaces/data-sources/NoSQL-database-wrapper";

describe("MongoDB Datasource", () => {
  let mockDatabase: NoSQLDatabaseWrapper;

  beforeAll(() => {
    mockDatabase = {
      insertOne: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      deleteOne: jest.fn(),
      updateOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register", async () => {
    const ds = new MongoDBUserDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve({ insertedId: "123" }));
    const result = await ds.register({
      firstName: "John",
      surname: "Doe",
      email: "iqbal@gmail.com",
      password: "iqbal1234",
    });
    expect(mockDatabase.insertOne).toHaveBeenCalledWith({
      firstName: "John",
      surname: "Doe",
      email: "iqbal@gmail.com",
      password: "iqbal1234",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    });
    expect(result).toStrictEqual(true);
  });

  test("isEmailExist", async () => {
    const ds = new MongoDBUserDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "findOne")
      .mockImplementation(() => Promise.resolve({ email: "iqbal@gmail.com" }));

    const result = await ds.isEmailExist("iqbal@gmail.com");

    expect(mockDatabase.findOne).toHaveBeenCalledWith({
      email: "iqbal@gmail.com",
    });

    expect(result).toStrictEqual(true);
  });

  test("getUserByEmail", async () => {
    const ds = new MongoDBUserDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, "findOne")
      .mockImplementation(() => Promise.resolve({ email: "iqbal@gmail.com" }));

    const result = await ds.getUserByEmail("iqbal@gmail.com");

    expect(mockDatabase.findOne).toHaveBeenCalledWith({
      email: "iqbal@gmail.com",
    });

    expect(result).toStrictEqual({ email: "iqbal@gmail.com" });
  });

  test("getUserById", async () => {
    const ds = new MongoDBUserDataSource(mockDatabase);
    jest.spyOn(mockDatabase, "findOne").mockImplementation(() =>
      Promise.resolve({
        _id: "123",
      })
    );

    const result = await ds.getUserById("123");

    expect(mockDatabase.findOne).toHaveBeenCalledWith({
      _id: "123",
    });

    expect(result).toStrictEqual({
      _id: "123",
    });
  });
});
