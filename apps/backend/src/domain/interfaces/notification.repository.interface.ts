import { Notification } from '../entities/notification.entity';

export interface INotificationRepository {
  findById(id: number): Promise<Notification | null>;
  findAll(): Promise<Notification[]>;
  findByUserId(userId: number): Promise<Notification[]>;
  updateStatus(id: number, status: string): Promise<void>;
  delete(id: number): Promise<void>;
  create(userId: number, message: string, kind: string, status: string): Promise<Notification>;
}
