import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface Tournament {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  lengthOfBreak: number;
  numberOfRounds: number;
}

@Injectable()
export class TournamentService {
  private tournaments: Tournament[] = [];

  create(data: Omit<Tournament, 'id'>): Tournament {
    const tournament: Tournament = {
      id: uuid(),
      ...data,
    };

    this.tournaments.push(tournament);
    return tournament;
  }

  findAll(): Tournament[] {
    return this.tournaments;
  }


    findOne(id: string): Tournament {
    const tournament = this.tournaments.find(t => t.id === id);
    if (!tournament) {
        throw new NotFoundException('Tournament not found');
    }
    return tournament;
    }


  update(): never {
    throw new ForbiddenException('Tournament data is immutable once created');
  }

  remove(): never {
    throw new ForbiddenException('Tournament data cannot be deleted');
  }
}
