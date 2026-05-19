import { Injectable, Inject } from '@nestjs/common';
import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
