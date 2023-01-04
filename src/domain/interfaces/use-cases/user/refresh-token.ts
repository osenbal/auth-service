export interface RefreshTokenUseCase {
  execute(userId: string): Promise<any>;
}
