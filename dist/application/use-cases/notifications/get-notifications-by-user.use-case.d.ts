import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
import { Notification } from '../../../domain/entities/notification.entity';
export declare class GetNotificationsByUserUseCase {
    private readonly notificationRepository;
    constructor(notificationRepository: INotificationRepository);
    execute(userId: number): Promise<Notification[]>;
}
