import User from "@domain/entities/user";

export interface UserRepository {
  register(user: User): Promise<boolean>;
  login(email: string, password: string): Promise<User>;
  isEmailExist(email: string): Promise<boolean>;
  validatePassword(email: string, password: string): Promise<boolean>;
}
