import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../database/entities/user.orm-entity';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const ormEntity = await this.repository.findOne({
      where: { username },
    });

    if (!ormEntity) {
      return null;
    }

    return new User(ormEntity.id, ormEntity.username, ormEntity.password, ormEntity.is_admin);
  }

  async findById(id: number): Promise<User | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });

    if (!ormEntity) {
      return null;
    }

    return new User(ormEntity.id, ormEntity.username, ormEntity.password, ormEntity.is_admin);
  }

  async findAll(): Promise<User[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(
      (entity: UserOrmEntity) => new User(entity.id, entity.username, entity.password, entity.is_admin),
    );
  }
}
