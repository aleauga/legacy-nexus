import { IEmailService } from '../../../domain/interfaces/email.service.interface';
import { INotificationRepository } from '../../../domain/interfaces/notification.repository.interface';
export declare class SendNotificationUseCase {
    private readonly emailService;
    private readonly notificationRepository;
    constructor(emailService: IEmailService, notificationRepository: INotificationRepository);
    execute(userId: number, subject: string, message: string, kind?: string): Promise<{
        id: number;
    }>;
}
