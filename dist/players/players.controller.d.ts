import { PlayersService } from './players.service';
export declare class PlayersController {
    private readonly service;
    constructor(service: PlayersService);
    create(body: any): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findTournamentPlayers(id: string): Promise<any[]>;
    updateRecord(id: string, body: {
        wins: number;
        losses: number;
    }): Promise<any>;
}
