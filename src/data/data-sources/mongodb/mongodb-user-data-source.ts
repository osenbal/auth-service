import { NoSQLDatabaseWrapper } from "@data/interfaces/data-sources/NoSQL-database-wrapper";
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import User from "@domain/entities/user";

export class MongoDBUserDataSource implements UserDataSource {
  private db: NoSQLDatabaseWrapper;

  constructor(db: NoSQLDatabaseWrapper) {
    this.db = db;
  }

  async register(user: User): Promise<boolean> {
    const result = await this.db.insertOne(user);
    return result !== null;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const result = await this.db.findOne({ email });
    return result !== null;
  }

  async getUserByEmail(email: string): Promise<User> {
    const result = await this.db.findOne({ email });
    return result;
  }
}
