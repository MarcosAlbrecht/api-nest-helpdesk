import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  locale: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'int' })
  admin: number;

  @Column({ type: 'int' })
  assistant: number;

  @Column({ name: 'remember_token', type: 'varchar', length: 255 })
  rememberToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'can_see_reports', type: 'int' })
  canSeeReports: number;

  @Column({ type: 'varchar', length: 255 })
  token?: string;

  @OneToOne(() => RoleEntity, (role) => role.user)
  @JoinColumn()
  role?: RoleEntity;
}
