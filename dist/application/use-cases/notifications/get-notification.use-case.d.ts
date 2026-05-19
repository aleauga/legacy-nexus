import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
import { Notification } from '../../../domain/entities/notification.entity';
export declare class GetNotificationUseCase {
    private readonly notificationRepository;
    constructor(notificationRepository: INotificationRepository);
    execute(id: number): Promise<Notification | null>;
}
