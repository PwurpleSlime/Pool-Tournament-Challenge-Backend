import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SupabaseClient } from '@supabase/supabase-js';
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
  constructor (
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient
  ) {}
  private players: Player[] = [];


  async create(inputData: Omit<Player, 'id' | 'w_l'>) {
    const { data, error } = await this.supabase 
      .from('Player')
      .insert({
        id: uuid(),
        disName: inputData.displayName,
        tournamentId: inputData.tournamentId,
        wins: inputData.wins,
        losses: inputData.losses,
        "w-l": (inputData.wins + inputData.losses) === 0 ? '0%' : `${Math.round((inputData.wins / (inputData.wins + inputData.losses)) * 100)}%`,
        logo: "https://example.com/logo.png"
      })
      .select('*')
      .single()

    return data
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('Player')
      .select('*')
    if (error) {
      throw new InternalServerErrorException(error.message)
    }
    return data
  }

  async findByTournament(id: string) {
    const { data, error } = await this.supabase
      .from('Player')
      .select('*')
      .eq('tournamentId', id)
    if (error) {
      throw new InternalServerErrorException(error.message)
    }
    return data
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('Player')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new InternalServerErrorException(error.message)
    }
    return data
  }

  async updateRecord(id: string, wins: number, losses: number) {
    const { data, error } = await this.supabase
      .from('Player')
      .update({
        wins: wins,
        losses: losses,
        "w-l": (wins + losses) === 0 ? '0%' : `${Math.round((wins / (wins + losses)) * 100)}%`
      })
      .eq('id', id)
      .select('*')
      .single()
    if (error) {
      throw new InternalServerErrorException(error.message)
    }
    return data
  }


  // Add update/delete routes -- @SPARE_TIME
  async deletePlayer(id: string) {
    const { data, error } = await this.supabase
    .from('Player')
    .delete()
    .eq('id', id)
    .select('*')
    .single()
  }
}
