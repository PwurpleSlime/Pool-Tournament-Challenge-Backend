import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { MatchesService } from './matches.service';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly service: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create match' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['timeStart', 'timeEnd', 'roundNum', 'playerIds'],
      properties: {
        timeStart: { type: 'string', format: 'date-time', example: '2026-02-01T11:00:00Z' },
        timeEnd: { type: 'string', format: 'date-time', example: '2026-02-01T11:45:00Z' },
        roundNum: { type: 'number', example: 1 },
        playerIds: {
          type: 'array',
          items: { type: 'string' },
          example: ['player-uuid-1', 'player-uuid-2'],
        },
      },
    },
  })
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get match by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/winner')
  @ApiOperation({ summary: 'Set match winner (only mutable field)' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['playerWin'],
      properties: {
        playerWin: { type: 'string', example: 'player-uuid-1' },
      },
    },
  })
  setWinner(
    @Param('id') id: string,
    @Body() body: { playerWin: string },
  ) {
    return this.service.setWinner(id, body.playerWin);
  }
}
