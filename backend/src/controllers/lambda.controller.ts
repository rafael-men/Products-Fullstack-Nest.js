import { Controller, Get, Post, Body } from '@nestjs/common';
import { LambdaService } from '../services/lambda.service';

@Controller('lambda')
export class LambdaController {
  constructor(private readonly lambdaService: LambdaService) {}

  @Get('sales-report')
  async getSalesReport() {
    return this.lambdaService.processSalesReport();
  }

  @Post('send-notification')
  async sendNotification(@Body('orderId') orderId: string) {
    return this.lambdaService.sendNotification(orderId);
  }
}