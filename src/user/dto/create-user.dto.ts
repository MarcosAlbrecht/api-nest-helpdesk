export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  admin: number;
  assistant: number;
  canSeeReports: number;
  locale: string;
  token: string;
}
