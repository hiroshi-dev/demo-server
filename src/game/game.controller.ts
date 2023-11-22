import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/game')
export class GameController {
  private count = 0;

  @Get('score')
  getTotalSmashed() {
    return this.count;
  }

  @Post('smash-fly')
  smashFly() {
    this.count++;
    console.log('Fly smashed');
  }
}
