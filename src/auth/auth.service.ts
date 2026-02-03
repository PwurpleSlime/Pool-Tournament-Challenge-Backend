import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt'

export async function hashString(value: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(value, saltRounds)
}
class Account {
    username: string
    password: string
}
@Injectable()
export class AuthService {
    authAccounts: Account[]
    constructor() {
        this.authAccounts = []
    }
    async onModuleInit() {
        this.authAccounts.push({
            username: 'username',
            password: await bcrypt.hash('password', 10)
        })
    }
    async addAccount(username: string, password: string) {
        this.authAccounts.push({username: username, password: await hashString(password)})
        return "Success"
    }
    
    getAccounts(){
        return this.authAccounts
    }
    async checkPassword(username: string, password: string){
        for (let i = 0; i < this.authAccounts.length; i++) {
            if (username == this.authAccounts[i].username){
                return bcrypt.compare(password, this.authAccounts[i].password);
            }
        }
        return false
    }
}
