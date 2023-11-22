import { Global, Module } from '@nestjs/common';
import { KafkaStrategyService } from './strategy.service';
import { KafkaProducerService } from './producer.service';
import { KafkaConfigService } from './config/kafka.config';

@Global()
@Module({
  providers: [KafkaConfigService, KafkaStrategyService, KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
