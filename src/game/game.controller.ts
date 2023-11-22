import { Body, Controller, Get, Post } from '@nestjs/common';
import { KafkaProducerService, KafkaTopics } from '../kafka';
import { SmashProto } from '../proto/smash.proto';
import { SmashFlyRequest } from './dto/smash.dto';

@Controller('/api/game')
export class GameController {
  private count = 0;

  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @Get('score')
  getTotalSmashed() {
    return this.count;
  }

  @Post('smash-fly')
  async smashFly(@Body() body: SmashFlyRequest) {
    console.log('Handling smash fly request');

    this.count++;

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
