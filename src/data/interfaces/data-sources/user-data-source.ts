import User from "../../../domain/entities/user";

export interface UserDataSource {
  register(user: User): Promise<boolean>;
}
