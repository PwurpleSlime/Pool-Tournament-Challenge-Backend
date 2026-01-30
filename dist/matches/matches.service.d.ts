export interface Match {
    id: string;
    timeStart: Date;
    timeEnd: Date;
    roundNum: number;
    playerWin: string | null;
    playerIds: string[];
}
export declare class MatchesService {
    private matches;
    create(data: Omit<Match, 'id' | 'playerWin'>): Match;
    findAll(): Match[];
    findOne(id: string): Match;
    setWinner(matchId: string, playerId: string): Match;
}
