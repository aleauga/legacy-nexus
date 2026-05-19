import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  private serveLoginFile(res: Response) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.sendFile(join(process.cwd(), '../frontend/static', 'login.html'));
  }

  @Get()
  serveRoot(@Res() res: Response) {
    return this.serveLoginFile(res);
  }

  @Get('login')
  serveLogin(@Res() res: Response) {
    return this.serveLoginFile(res);
  }
}
