import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { LoginDto } from '../../application/dto/login.dto';
export declare class AuthController {
    private readonly loginUseCase;
    constructor(loginUseCase: LoginUseCase);
    login(dto: LoginDto): Promise<import("../../application/dto/user.response.dto").UserResponseDto>;
}
