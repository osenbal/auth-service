import User from "@domain/entities/user";
import { UserDataSource } from "@data/interfaces/data-sources/user-data-source";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
  userDataSources: UserDataSource;

  constructor(userDataSources: UserDataSource) {
    this.userDataSources = userDataSources;
  }

  async register(user: User): Promise<boolean> {
    return await this.userDataSources.register(user);
  }

  async isEmailExist(email: string): Promise<boolean> {
    return await this.userDataSources.isEmailExist(email);
  }
}
