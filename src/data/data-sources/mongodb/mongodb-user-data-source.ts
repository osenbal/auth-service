import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/NoSQL-database-wrapper";
import { UserDataSource } from "../../interfaces/data-sources/user-data-source";
import User from "../../../domain/entities/user";

export class MongoDBUserDataSource implements UserDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }

  async register(user: User): Promise<boolean> {
    const result = await this.db.insertOne(user);
    return result !== null;
  }
}
