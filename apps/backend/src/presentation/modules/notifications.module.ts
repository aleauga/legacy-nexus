import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendNotificationUseCase } from '../../application/use-cases/notifications/send-notification.use-case';
import { GetNotificationsByUserUseCase } from '../../application/use-cases/notifications/get-notifications-by-user.use-case';
import { MarkNotificationAsReadUseCase } from '../../application/use-cases/notifications/mark-notification-as-read.use-case';
import { DeleteNotificationUseCase } from '../../application/use-cases/notifications/delete-notification.use-case';
import { BroadcastNotificationUseCase } from '../../application/use-cases/notifications/broadcast-notification.use-case';
import { EmailService } from '../../infrastructure/services/email.service.impl';
import { NotificationTypeOrmRepository } from '../../infrastructure/repositories/notification.typeorm.repository';
import { NotificationOrmEntity } from '../../infrastructure/database/entities/notification.orm-entity';
import { NotificationsController } from '../controllers/notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationOrmEntity])],
  controllers: [NotificationsController],
  providers: [
    {
      provide: 'IEmailService',
      useClass: EmailService,
    },
    {
      provide: 'INotificationRepository',
      useClass: NotificationTypeOrmRepository,
    },
    SendNotificationUseCase,
    GetNotificationsByUserUseCase,
    MarkNotificationAsReadUseCase,
    DeleteNotificationUseCase,
    BroadcastNotificationUseCase,
  ],
})
export class NotificationsModule {}
