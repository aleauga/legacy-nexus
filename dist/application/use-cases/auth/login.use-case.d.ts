import { LoginDto } from '../../dto/login.dto';
import { UserResponseDto } from '../../dto/user.response.dto';
import { IUserRepository } from '../../../domain/interfaces/user.repository.interface';
export declare class LoginUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(dto: LoginDto): Promise<UserResponseDto | null>;
}
