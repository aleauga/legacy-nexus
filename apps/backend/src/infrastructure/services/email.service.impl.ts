import { Injectable } from '@nestjs/common';
import { IEmailService } from '../../domain/interfaces/email.service.interface';

@Injectable()
export class EmailService implements IEmailService {
  async send(to: number, subject: string, body: string): Promise<boolean> {
    // TODO: integrar provider real cuando haya presupuesto
    console.log(`[EMAIL STUB] to=${to} subject=${subject} body=${body}`);
    return true;
  }
}
