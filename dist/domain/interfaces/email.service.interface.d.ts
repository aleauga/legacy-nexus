export interface IEmailService {
    send(to: number, subject: string, body: string): Promise<boolean>;
}
