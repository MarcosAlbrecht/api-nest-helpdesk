export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  admin: number;
  rememberToken: boolean;
}
