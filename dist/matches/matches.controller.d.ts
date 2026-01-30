import { MatchesService } from './matches.service';
export declare class MatchesController {
    private readonly service;
    constructor(service: MatchesService);
    create(body: any): import("./matches.service").Match;
    findAll(): import("./matches.service").Match[];
    findOne(id: string): import("./matches.service").Match;
    setWinner(id: string, body: {
        playerWin: string;
    }): import("./matches.service").Match;
}
