import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',  // Permite apenas a origem do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization',  // Cabeçalhos permitidos
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('------------N-E-S-T-J-S--------')
  console.log('-------------------------------')
  console.log('Back-End Rodando na Porta 3000');
  console.log('-------------------------------')
}
bootstrap();
