import { Repository } from 'typeorm';
import { UserOrmEntity } from '../database/entities/user.orm-entity';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
export declare class UserTypeOrmRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: Repository<UserOrmEntity>);
    findByUsername(username: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
}
