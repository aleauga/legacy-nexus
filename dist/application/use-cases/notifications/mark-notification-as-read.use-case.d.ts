import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
export declare class MarkNotificationAsReadUseCase {
    private readonly notificationRepository;
    constructor(notificationRepository: INotificationRepository);
    execute(id: number): Promise<void>;
}
