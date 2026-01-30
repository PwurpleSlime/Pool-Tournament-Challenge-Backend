import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TournamentService, Tournament } from './tournament.service';

@ApiTags('tournament')
@Controller('tournament')
export class TournamentController {
  constructor(private readonly service: TournamentService) {}

  @Post()
  @ApiOperation({ summary: 'Create tournament (immutable)' })
  @ApiResponse({ status: 201 })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['dateStart', 'dateEnd', 'location', 'lengthOfBreak', 'numberOfRounds'],
      properties: {
        dateStart: { type: 'string', format: 'date-time', example: '2026-02-01T10:00:00Z' },
        dateEnd: { type: 'string', format: 'date-time', example: '2026-02-01T18:00:00Z' },
        location: { type: 'string', example: 'Main Hall A' },
        lengthOfBreak: { type: 'number', example: 10 },
        numberOfRounds: { type: 'number', example: 5 },
      },
    },
  })
  create(@Body() body: Omit<Tournament, 'id'>) {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tournaments' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tournament by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
