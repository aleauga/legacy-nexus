import { SendNotificationUseCase } from './send-notification.use-case';
export declare class BroadcastNotificationUseCase {
    private readonly sendNotificationUseCase;
    constructor(sendNotificationUseCase: SendNotificationUseCase);
    execute(subject: string, message: string, userIds?: number[]): Promise<void>;
}
