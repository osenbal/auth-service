import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";
import AuthRouter from "./presentation/routers/auth-router";
import { RegisterUser } from "./domain/use-cases/user/register-user";
import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import { MongoClient } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/NoSQL-database-wrapper";
import { MongoDBUserDataSource } from "./data/data-sources/mongodb/mongodb-user-data-source";

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
    new RegisterUser(new UserRepositoryImpl(dataSource))
  );

  server.use("/auth", userMiddleware);
  server.listen(process.env.PORT, () =>
    console.log(
      `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
    )
  );
})();
