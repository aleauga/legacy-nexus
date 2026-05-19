import { User } from '../entities/user.entity';
export interface IUserRepository {
    findByUsername(username: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
}
