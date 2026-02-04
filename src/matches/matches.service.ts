import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
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
  constructor (
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient
  ) {}
  private matches: Match[] = [];

  async create(inputData: Omit<Match, 'id' | 'playerWin'>) {
    const newMatchUUID = uuid()
    const { data, error } = await this.supabase
      .from('Match')
      .insert({
        id: newMatchUUID,
        playerWin: null,
        timeStart: inputData.timeStart,
        timeEnd: inputData.timeEnd,
        roundNum: inputData.roundNum,
      })
      .select('*')
      .single()
      if(error) {
        throw new InternalServerErrorException(error.message)
      }
    for (let i = 0; i < inputData.playerIds.length; i++) {
      const { data, error } = await this.supabase
        .from('Match_Player')
        .insert({
          id: uuid(),
          playerId: inputData.playerIds[i],
          matchId: newMatchUUID
        })   
        .select('*')
        .single()
        if (error){
          throw new InternalServerErrorException(error.message)
        }
    }

    return data
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('Match')
      .select('*')
    if (error) {
      throw new InternalServerErrorException(error.message)
    }

    return data;
  }

  async findMatchPlayer(id: string) {
    const { data, error } = await this.supabase
      .from('Match_Player')
      .select('*')
      .eq('matchId', id)
      if (error) {
        throw new InternalServerErrorException(error.message)
      }
      return data
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
