import { userService, UserService } from '../users/service';

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signIn(email: string) {}

  async signUp(
    email: string,
    username: string,
    firebaseUid: string,
    roleId: number,
    iconUrl: string,
    displayName: string,
    isPublic: boolean,
  ) {
    return await this.userService.registerUser(
      email,
      username,
      firebaseUid,
      roleId,
      iconUrl,
      displayName,
      isPublic,
    );
  }
}

export const authService = new AuthService(userService);
