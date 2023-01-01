import User from "../../entities/user";

export interface UserRepository {
  register(user: User): Promise<boolean>;
}
