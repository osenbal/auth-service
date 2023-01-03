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

  async login(email: string, password: string): Promise<User> {
    const result = await this.db.findOne({ email, password });
    return result;
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const result = await this.db.findOne({ email });
    if (result.password !== password) {
      return false;
    }
    return true;
  }
}
