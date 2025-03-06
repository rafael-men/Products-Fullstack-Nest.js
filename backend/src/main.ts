import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log('------------N-E-S-T-J-S--------')
  console.log('-------------------------------')
  console.log('Back-End Rodando na Porta 3000');
  console.log('-------------------------------')
}
bootstrap();
