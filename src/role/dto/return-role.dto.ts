import { Role } from '@prisma/client';

export class ReturnRoleDto {
  id: number;
  type: string;

  constructor(role: Role) {
    this.id = role.id;
    this.type = role.type;
  }
}
