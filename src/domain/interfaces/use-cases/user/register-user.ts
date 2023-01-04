import User from "@domain/entities/user";

export interface RegisterUserUseCase {
  execute(user: User): Promise<boolean>;
}
