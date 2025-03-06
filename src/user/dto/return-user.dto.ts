import { Role, User } from '@prisma/client';
import { ReturnRoleDto } from 'src/role/dto/return-role.dto';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  admin: number;
  assistant: number;
  canSeeReports: number;
  role?: ReturnRoleDto;

  constructor(user: User & { role?: Role }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.admin = user.admin;
    this.assistant = user.assistant;
    this.canSeeReports = user.canSeeReports;
    this.role = user.role ? new ReturnRoleDto(user.role) : null;
  }
}
