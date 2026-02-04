import { MatchesService } from './matches.service';
export declare class MatchesController {
    private readonly service;
    constructor(service: MatchesService);
    create(body: any): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): import("./matches.service").Match;
    findMatchPlayer(id: string): Promise<any[]>;
    setWinner(id: string, body: {
        playerWin: string;
    }): import("./matches.service").Match;
}
