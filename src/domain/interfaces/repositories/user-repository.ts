import User from "@domain/entities/user";

export interface UserRepository {
  register(user: User): Promise<boolean>;
  isEmailExist(email: string): Promise<boolean>;
}
