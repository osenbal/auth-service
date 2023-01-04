export interface RefreshTokenUseCase {
  execute(token: string): Promise<any>;
}
