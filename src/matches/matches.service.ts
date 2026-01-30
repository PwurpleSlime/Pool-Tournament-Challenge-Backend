import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface Match {
  id: string;
  timeStart: Date;
  timeEnd: Date;
  roundNum: number;
  playerWin: string | null;
  playerIds: string[]; // MANY:MANY
}

@Injectable()
export class MatchesService {
  private matches: Match[] = [];

  create(data: Omit<Match, 'id' | 'playerWin'>): Match {
    const match: Match = {
      id: uuid(),
      playerWin: null,
      ...data,
    };

    this.matches.push(match);
    return match;
  }

  findAll(): Match[] {
    return this.matches;
  }


    findOne(id: string): Match {
    const match = this.matches.find(m => m.id === id);
    if (!match) {
        throw new NotFoundException('Match not found');
    }
    return match;
    }

    setWinner(matchId: string, playerId: string): Match {
    const match = this.findOne(matchId);
    match.playerWin = playerId;
    return match;
    }

}
