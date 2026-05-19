import { SendNotificationUseCase } from '../../application/use-cases/notifications/send-notification.use-case';
import { GetNotificationsByUserUseCase } from '../../application/use-cases/notifications/get-notifications-by-user.use-case';
import { MarkNotificationAsReadUseCase } from '../../application/use-cases/notifications/mark-notification-as-read.use-case';
import { DeleteNotificationUseCase } from '../../application/use-cases/notifications/delete-notification.use-case';
import { BroadcastNotificationUseCase } from '../../application/use-cases/notifications/broadcast-notification.use-case';
import { SendNotificationDto } from '../../application/dto/send-notification.dto';
export declare class NotificationsController {
    private readonly sendNotificationUseCase;
    private readonly getNotificationsByUserUseCase;
    private readonly markNotificationAsReadUseCase;
    private readonly deleteNotificationUseCase;
    private readonly broadcastNotificationUseCase;
    constructor(sendNotificationUseCase: SendNotificationUseCase, getNotificationsByUserUseCase: GetNotificationsByUserUseCase, markNotificationAsReadUseCase: MarkNotificationAsReadUseCase, deleteNotificationUseCase: DeleteNotificationUseCase, broadcastNotificationUseCase: BroadcastNotificationUseCase);
    getNotificationsByUser(userId: string): Promise<Record<string, unknown>[]>;
    sendNotification(dto: SendNotificationDto): Promise<{
        id: number;
    }>;
    markAsRead(id: string): Promise<{
        message: string;
    }>;
    deleteNotification(id: string): Promise<{
        message: string;
    }>;
    broadcastNotification(body: {
        subject: string;
        message: string;
        userIds?: number[];
    }): Promise<{
        message: string;
    }>;
}
