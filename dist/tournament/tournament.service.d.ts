import { SupabaseClient } from '@supabase/supabase-js';
export interface Tournament {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    location: string;
    lengthOfBreak: number;
    numberOfRounds: number;
}
export declare class TournamentService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private tournaments;
    create(inputData: Omit<Tournament, 'id'>): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(): never;
    remove(): never;
}
