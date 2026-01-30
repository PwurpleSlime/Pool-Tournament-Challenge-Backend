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
    private players;
    create(data: Omit<Player, 'id' | 'wins' | 'losses' | 'w_l'>): Player;
    findAll(): Player[];
    findOne(id: string): Player;
    updateRecord(id: string, wins: number, losses: number): Player;
}
