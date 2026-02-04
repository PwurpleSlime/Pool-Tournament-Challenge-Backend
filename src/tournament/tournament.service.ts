import { Injectable, ForbiddenException, NotFoundException, Inject, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
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
  constructor (
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient
  ) {}
  private tournaments: Tournament[] = [];

  async create(inputData: Omit<Tournament, 'id'>) {
    const { data, error } = await this.supabase
      .from('Tournament') 
      .insert({
        id: uuid(),
        dateStart: inputData.dateStart,
        dateEnd: inputData.dateEnd,
        location: inputData.location,
        lengthOfBreak: inputData.lengthOfBreak,
        numberOfRounds: inputData.numberOfRounds
      })
      .select('*')
      .single()
    if (error) {
      throw new InternalServerErrorException(error.message)
    }
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase
    .from('Tournament')
    .select('*')
    if (error) {
      throw new InternalServerErrorException(error.message)
    }

    return data
  }


  async findOne(id: string) {
  const { data, error } = await this.supabase
  .from('Tournament')
  .select('*')
  .eq('id', id)
  .single()

  if (error) {
    throw new InternalServerErrorException(error.message)
  }
  return data
  }


  // Why are you there then, @SPARE_TIME
  update(): never {
    throw new ForbiddenException('Tournament data is immutable once created');
  }

  remove(): never {
    throw new ForbiddenException('Tournament data cannot be deleted');
  }
}
