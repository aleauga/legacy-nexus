import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { UserTypeOrmRepository } from '../../infrastructure/repositories/user.typeorm.repository';
import { UserOrmEntity } from '../../infrastructure/database/entities/user.orm-entity';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
    LoginUseCase,
  ],
})
export class AuthModule {}
