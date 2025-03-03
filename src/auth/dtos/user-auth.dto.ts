import { ReturnRoleDto } from 'src/role/dto/return-role.dto';

export interface UserAuth {
  userId: number;
  email: string;
  role: ReturnRoleDto;
}
