import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LambdaService {
  constructor(private readonly httpService: HttpService) {}

  async processSalesReport(): Promise<any> {
    const url = 'http://localhost:3000/sales/report'; 
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error calling Lambda:', error.message);
      throw new Error('Failed to process sales report');
    }
  }

  async sendNotification(orderId: string): Promise<any> {
    const url = 'http://localhost:3000/notifications/send';
    const payload = { orderId };
    try {
      const response = await firstValueFrom(this.httpService.post(url, payload));
      return response.data;
    } catch (error) {
      console.error('Error calling Lambda:', error.message);
      throw new Error('Failed to send notification');
    }
  }
}