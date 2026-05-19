import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationOrmEntity } from '../database/entities/notification.orm-entity';
import { Notification } from '../../domain/entities/notification.entity';
import { INotificationRepository } from '../../domain/interfaces/notification.repository.interface';

@Injectable()
export class NotificationTypeOrmRepository implements INotificationRepository {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly repository: Repository<NotificationOrmEntity>,
  ) {}

  async findById(id: number): Promise<Notification | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });

    if (!ormEntity) {
      return null;
    }

    return new Notification(
      ormEntity.id,
      ormEntity.user_id,
      ormEntity.message,
      ormEntity.kind,
      ormEntity.status,
      ormEntity.created_at,
    );
  }

  async findAll(): Promise<Notification[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(
      (entity: NotificationOrmEntity) =>
        new Notification(
          entity.id,
          entity.user_id,
          entity.message,
          entity.kind,
          entity.status,
          entity.created_at,
        ),
    );
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    const ormEntities = await this.repository.find({
      where: { user_id: userId },
    });
    return ormEntities.map(
      (entity: NotificationOrmEntity) =>
        new Notification(
          entity.id,
          entity.user_id,
          entity.message,
          entity.kind,
          entity.status,
          entity.created_at,
        ),
    );
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.repository.update(id, { status });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async create(userId: number, message: string, kind: string, status: string): Promise<Notification> {
    const now = new Date().toISOString();
    const ormEntity = this.repository.create({
      user_id: userId,
      message: message,
      kind: kind,
      status: status,
      created_at: now,
    });
    const savedEntity = await this.repository.save(ormEntity);
    return new Notification(
      savedEntity.id,
      savedEntity.user_id,
      savedEntity.message,
      savedEntity.kind,
      savedEntity.status,
      savedEntity.created_at,
    );
  }
}
