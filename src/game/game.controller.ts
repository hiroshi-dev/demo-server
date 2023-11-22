import { Body, Controller, Get, Post } from '@nestjs/common';
import { KafkaProducerService, KafkaTopics } from '../kafka';
import { SmashProto } from '../proto/smash.proto';
import { SmashFlyRequest } from './dto/smash.dto';
import { SmashRepository } from 'src/db';

@Controller('/api/game')
export class GameController {
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly smashRepository: SmashRepository,
  ) {}

  @Get('score')
  async getTotalSmashed() {
    const count = await this.smashRepository.count();
    return count;
  }

  @Post('smash-fly')
  async smashFly(@Body() body: SmashFlyRequest) {
    console.log('Handling smash fly request');

    const proto: SmashProto = {
      metadata: {
        createdAt: new Date().valueOf(),
      },

      flyId: body.flyId,
    };

    console.info('Publishing smash event', { proto });
    await this.kafkaProducerService.produceOne({
      topic: KafkaTopics.SMASH,
      message: { key: body.flyId, value: proto },
    });
    console.log('Smash event published');
  }
}
