import { PlayersService } from './players.service';
export declare class PlayersController {
    private readonly service;
    constructor(service: PlayersService);
    create(body: any): import("./players.service").Player;
    findAll(): import("./players.service").Player[];
    findOne(id: string): import("./players.service").Player;
    updateRecord(id: string, body: {
        wins: number;
        losses: number;
    }): import("./players.service").Player;
}
