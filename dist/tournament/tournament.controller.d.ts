import { TournamentService, Tournament } from './tournament.service';
export declare class TournamentController {
    private readonly service;
    constructor(service: TournamentService);
    create(body: Omit<Tournament, 'id'>): Tournament;
    findAll(): Tournament[];
    findOne(id: string): Tournament;
}
