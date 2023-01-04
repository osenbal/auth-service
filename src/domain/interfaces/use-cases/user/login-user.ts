import User from "@/domain/entities/user";

export interface LoginUserUseCase {
  execute(user: User): Promise<any>;
}
