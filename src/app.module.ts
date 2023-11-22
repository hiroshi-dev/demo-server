import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { KafkaModule } from './kafka';
import { DatabaseModule } from './db';
import { initTypeOrm } from './db/typeorm/init';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [
    BaseConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
    initTypeOrm(),
    DatabaseModule,
    KafkaModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
