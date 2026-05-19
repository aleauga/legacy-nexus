import { IEmailService } from '../../domain/interfaces/email.service.interface';
export declare class EmailService implements IEmailService {
    send(to: number, subject: string, body: string): Promise<boolean>;
}
