export declare function hashString(value: string): Promise<string>;
declare class Account {
    username: string;
    password: string;
}
export declare class AuthService {
    authAccounts: Account[];
    constructor();
    onModuleInit(): Promise<void>;
    addAccount(username: string, password: string): Promise<string>;
    getAccounts(): Account[];
    checkPassword(username: string, password: string): Promise<any>;
}
export {};
