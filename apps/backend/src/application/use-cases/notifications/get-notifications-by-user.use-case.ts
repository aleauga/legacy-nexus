import { Inject, Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class GetNotificationsByUserUseCase {
  constructor(@Inject('INotificationRepository') private readonly notificationRepository: INotificationRepository) {}

  async execute(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(userId);
  }
}
