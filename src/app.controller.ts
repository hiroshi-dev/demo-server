import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MigrationsService } from './db';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly migrationService: MigrationsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/migrations')
  async runMigrations() {
    console.log('Running migrations...');
    await this.migrationService.runMigrations();
    console.log('Finished running migrations.');
  }
}
