import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SendNotificationUseCase } from '../../application/use-cases/notifications/send-notification.use-case';
import { GetNotificationsByUserUseCase } from '../../application/use-cases/notifications/get-notifications-by-user.use-case';
import { MarkNotificationAsReadUseCase } from '../../application/use-cases/notifications/mark-notification-as-read.use-case';
import { DeleteNotificationUseCase } from '../../application/use-cases/notifications/delete-notification.use-case';
import { BroadcastNotificationUseCase } from '../../application/use-cases/notifications/broadcast-notification.use-case';
import { SendNotificationDto } from '../../application/dto/send-notification.dto';

@Controller('api')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly getNotificationsByUserUseCase: GetNotificationsByUserUseCase,
    private readonly markNotificationAsReadUseCase: MarkNotificationAsReadUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
    private readonly broadcastNotificationUseCase: BroadcastNotificationUseCase,
  ) {}

  @Get('notifications/:userId')
  async getNotificationsByUser(@Param('userId') userId: string) {
    const notifications = await this.getNotificationsByUserUseCase.execute(parseInt(userId));
    return notifications.map(n => n.toDict());
  }

  @Post('notifications')
  async sendNotification(@Body() dto: SendNotificationDto) {
    const subject = dto.subject || 'Notificación';
    return this.sendNotificationUseCase.execute(dto.user_id, subject, dto.message, dto.kind);
  }

  @Post('notifications/:id/read')
  async markAsRead(@Param('id') id: string) {
    await this.markNotificationAsReadUseCase.execute(parseInt(id));
    return { message: 'Notification marked as read' };
  }

  @Delete('notifications/:id')
  async deleteNotification(@Param('id') id: string) {
    await this.deleteNotificationUseCase.execute(parseInt(id));
    return { message: 'Notification deleted' };
  }

  @Post('notifications/broadcast')
  async broadcastNotification(@Body() body: { subject: string; message: string; userIds?: number[] }) {
    await this.broadcastNotificationUseCase.execute(body.subject, body.message, body.userIds);
    return { message: 'Notification broadcasted' };
  }
}
