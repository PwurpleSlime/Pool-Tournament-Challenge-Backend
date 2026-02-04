import { TournamentService, Tournament } from './tournament.service';
export declare class TournamentController {
    private readonly service;
    constructor(service: TournamentService);
    create(body: Omit<Tournament, 'id'>): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
}
