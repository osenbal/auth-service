import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";
import morgan from "morgan";
import AuthRouter from "./presentation/routers/auth-router";
import { MongoClient } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/NoSQL-database-wrapper";
import { MongoDBUserDataSource } from "./data/data-sources/mongodb/mongodb-user-data-source";
import { RegisterUser } from "./domain/use-cases/user/register-user";
import { LoginUser } from "./domain/use-cases/user/login-user";
import { RefreshToken } from "./domain/use-cases/user/refresh-token";
import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import HttpExceptionMiddleware from "./domain/middlewares/HttpExeption-middleware";
import { logger, stream } from "./utils/logger";

async function getMongoDS() {
  const client: MongoClient = await MongoClient.connect(
    "mongodb://admin:alumni010@localhost:27017/users",
    {
      authSource: "admin",
    }
  );

  await client.connect();
  const db = client.db("USER_DB");

  const userDatabase: NoSQLDatabaseWrapper = {
    insertOne: (doc: any) => db.collection("users").insertOne(doc),
    findOne: (query: object) => db.collection("users").findOne(query),
    find: function (query: object): Promise<any[]> {
      throw new Error("Function not implemented.");
    },
    deleteOne: function (id: String): void {
      throw new Error("Function not implemented.");
    },
    updateOne: function (id: String, data: object): void {
      throw new Error("Function not implemented.");
    },
  };

  return new MongoDBUserDataSource(userDatabase);
}

(async () => {
  const dataSource = await getMongoDS();

  const userMiddleware = AuthRouter(
    new RegisterUser(new UserRepositoryImpl(dataSource)),
    new LoginUser(new UserRepositoryImpl(dataSource)),
    new RefreshToken()
  );

  // middlewares
  server.use(morgan("combined", { stream }));

  // routes
  server.use("/auth", userMiddleware);

  server.use(HttpExceptionMiddleware);

  server.listen(process.env.PORT, () =>
    logger.info(`Server running on port ${process.env.PORT}`)
  );
})();
