export interface Tournament {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    location: string;
    lengthOfBreak: number;
    numberOfRounds: number;
}
export declare class TournamentService {
    private tournaments;
    create(data: Omit<Tournament, 'id'>): Tournament;
    findAll(): Tournament[];
    findOne(id: string): Tournament;
    update(): never;
    remove(): never;
}
