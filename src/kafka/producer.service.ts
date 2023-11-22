import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaStrategyService } from './strategy.service';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor(private readonly kafkaStrategyService: KafkaStrategyService) {
    this.kafka = this.kafkaStrategyService.get();
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    console.info('Starting Kafka producer...');
    await this.producer?.connect();
    console.info('Kafka producer started');
  }

  async produceOne(params: ProduceParams) {
    await this.producer.send({
      topic: params.topic,
      messages: [encodeMessage(params.message)],
    });
  }
}

function encodeMessage(message: Message): Message {
  return {
    ...message,
    value: JSON.stringify(message.value),
  };
}

export interface ProduceParams {
  topic: string;
  message: Message;
}

export interface Message {
  key?: string;
  partition?: number;
  value: any;
}
