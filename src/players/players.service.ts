import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface Player {
  id: string;
  tournamentId: string;
  displayName: string;
  wins: number;
  losses: number;
  w_l: string; // "XX%"
  logo: string; // image URL
}

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  create(data: Omit<Player, 'id' | 'wins' | 'losses' | 'w_l'>): Player {
    if (!data.logo.startsWith('http')) {
      throw new BadRequestException('Logo must be an image URL');
    }

    const player: Player = {
      id: uuid(),
      wins: 0,
      losses: 0,
      w_l: '0%',
      ...data,
    };

    this.players.push(player);
    return player;
  }

  findAll(): Player[] {
    return this.players;
  }


    findOne(id: string): Player {
    const player = this.players.find(p => p.id === id);
    if (!player) {
        throw new NotFoundException('Player not found');
    }
    return player;
    }

    updateRecord(id: string, wins: number, losses: number): Player {
    const player = this.findOne(id);

    const total = wins + losses;
    player.wins = wins;
    player.losses = losses;
    player.w_l = total === 0 ? '0%' : `${Math.round((wins / total) * 100)}%`;

    return player;
    }

}
