import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PlayersService } from './players.service';

@ApiTags('players')
@Controller(['player','players'])
export class PlayersController {
  constructor(private readonly service: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Create player' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['tournamentId', 'displayName', 'logo'],
      properties: {
        tournamentId: { type: 'string', example: 'uuid-of-tournament' },
        displayName: { type: 'string', example: 'Player One' },
        logo: {
          type: 'string',
          format: 'uri',
          example: 'https://example.com/logo.png',
        },
      },
    },
  })
  create(@Body() body) {
    return this.service.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Get all players' })
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get player by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Player By Id' })
  deletePlayer(@Param('id') id: string) {
    return this.service.deletePlayer(id);
  }
  @Get(':id/tournament')
  @ApiOperation({ summary: 'Get player by id' })
  findTournamentPlayers(@Param('id') id: string) {
    return this.service.findByTournament(id);
  }
  @Patch(':id/record')
  @ApiOperation({ summary: 'Update wins/losses only' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['wins', 'losses'],
      properties: {
        wins: { type: 'number', example: 3 },
        losses: { type: 'number', example: 1 },
      },
    },
  })
  updateRecord(
    @Param('id') id: string,
    @Body() body: { wins: number; losses: number },
  ) {
    return this.service.updateRecord(id, body.wins, body.losses);
  }
}
