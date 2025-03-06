import { Command, Console } from 'nestjs-console';
import { DataSeederService } from './data.seeder.service';

@Console()
export class DataSeederConsole {
  constructor(private readonly dataSeederService: DataSeederService) {}

  @Command({
    command: 'seed-data',
    description: 'Seed the database with initial data',
  })
  async seedData() {
    await this.dataSeederService.seedData();
  }

  @Command({
    command: 'clear-data',
    description: 'Clear all data from the database',
  })
  async clearData() {
    await this.dataSeederService.clearData();
  }
}