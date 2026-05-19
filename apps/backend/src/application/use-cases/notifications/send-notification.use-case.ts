import { Injectable, Inject } from '@nestjs/common';
import { IEmailService } from '../../../domain/interfaces/email.service.interface';
import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    @Inject('IEmailService')
    private readonly emailService: IEmailService,
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async execute(userId: number, subject: string, message: string, kind?: string): Promise<{ id: number }> {
    await this.emailService.send(userId, subject, message);
    const notification = await this.notificationRepository.create(
      userId,
      message,
      kind || 'info',
      'unread',
    );
    return { id: notification.id };
  }
}
