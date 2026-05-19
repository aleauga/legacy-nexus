import { Repository } from 'typeorm';
import { NotificationOrmEntity } from '../database/entities/notification.orm-entity';
import { Notification } from '../../domain/entities/notification.entity';
import { INotificationRepository } from '../../domain/interfaces/notification.repository.interface';
export declare class NotificationTypeOrmRepository implements INotificationRepository {
    private readonly repository;
    constructor(repository: Repository<NotificationOrmEntity>);
    findById(id: number): Promise<Notification | null>;
    findAll(): Promise<Notification[]>;
    findByUserId(userId: number): Promise<Notification[]>;
    updateStatus(id: number, status: string): Promise<void>;
    delete(id: number): Promise<void>;
    create(userId: number, message: string, kind: string, status: string): Promise<Notification>;
}
