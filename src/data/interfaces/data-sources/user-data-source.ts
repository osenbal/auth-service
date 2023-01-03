import User from "@domain/entities/user";

export interface UserDataSource {
  register(user: User): Promise<boolean>;
  isEmailExist(email: string): Promise<boolean>;
}
