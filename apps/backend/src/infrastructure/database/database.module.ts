import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_PATH') || 'data/legacy.db',
        entities: [join(__dirname, '../../**/*.orm-entity{.ts,.js}')],
        synchronize: false,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
