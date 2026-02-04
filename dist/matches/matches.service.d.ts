import { SupabaseClient } from '@supabase/supabase-js';
export interface Match {
    id: string;
    timeStart: Date;
    timeEnd: Date;
    roundNum: number;
    playerWin: string | null;
    playerIds: string[];
}
export declare class MatchesService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private matches;
    create(inputData: Omit<Match, 'id' | 'playerWin'>): Promise<any>;
    findAll(): Promise<any[]>;
    findMatchPlayer(id: string): Promise<any[]>;
    findOne(id: string): Match;
    setWinner(matchId: string, playerId: string): Match;
}
