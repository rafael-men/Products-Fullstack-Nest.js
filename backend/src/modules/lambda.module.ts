import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LambdaService } from '../services/lambda.service';
import { LambdaController } from '../controllers/lambda.controller';

@Module({
  imports: [HttpModule],
  controllers: [LambdaController],
  providers: [LambdaService],
})
export class LambdaModule {}