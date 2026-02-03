import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAccounts(): {
        username: string;
        password: string;
    }[];
    addAccount(username: string, password: string): Promise<string>;
    checkPassword(username: string, password: string): Promise<any>;
}
