import { Injectable } from '@nestjs/common';
import { SendNotificationUseCase } from './send-notification.use-case';

@Injectable()
export class BroadcastNotificationUseCase {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(subject: string, message: string, userIds?: number[]): Promise<void> {
    // If userIds provided, broadcast to specific users
    // Otherwise, broadcast to all users (would need user repository)
    if (userIds && userIds.length > 0) {
      for (const userId of userIds) {
        await this.sendNotificationUseCase.execute(userId, subject, message);
      }
    }
  }
}
