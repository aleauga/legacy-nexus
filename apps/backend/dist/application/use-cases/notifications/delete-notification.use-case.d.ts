import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
export declare class DeleteNotificationUseCase {
    private readonly notificationRepository;
    constructor(notificationRepository: INotificationRepository);
    execute(id: number): Promise<void>;
}
