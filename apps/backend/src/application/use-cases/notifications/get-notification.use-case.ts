import { Inject, Injectable } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class GetNotificationUseCase {
  constructor(@Inject('INotificationRepository') private readonly notificationRepository: INotificationRepository) {}

  async execute(id: number): Promise<Notification | null> {
    return this.notificationRepository.findById(id);
  }
}
