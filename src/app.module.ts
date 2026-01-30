import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { TournamentModule } from './tournament/tournament.module';
import { MatchesModule } from './matches/matches.module';
import { SocketModule } from './socket/socket.module';
import { ConfigModule} from '@nestjs/config'
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), 
    PlayersModule, TournamentModule, MatchesModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
