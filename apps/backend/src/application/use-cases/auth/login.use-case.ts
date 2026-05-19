import { Injectable, Inject } from '@nestjs/common';
import { LoginDto } from '../../dto/login.dto';
import { UserResponseDto } from '../../dto/user.response.dto';
import { IUserRepository } from '../../../domain/interfaces/user.repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(dto: LoginDto): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findByUsername(dto.username);

    if (!user || user.password !== dto.password) {
      return null;
    }

    return {
      user_id: user.id,
      username: user.username,
      is_admin: user.isAdmin,
    };
  }
}
