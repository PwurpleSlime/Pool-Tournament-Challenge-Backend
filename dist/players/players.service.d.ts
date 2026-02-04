import { SupabaseClient } from '@supabase/supabase-js';
export interface Player {
    id: string;
    tournamentId: string;
    displayName: string;
    wins: number;
    losses: number;
    w_l: string;
    logo: string;
}
export declare class PlayersService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private players;
    create(inputData: Omit<Player, 'id' | 'wins' | 'losses' | 'w_l'>): Promise<any>;
    findAll(): Promise<any[]>;
    findByTournament(id: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    updateRecord(id: string, wins: number, losses: number): Promise<any>;
}
