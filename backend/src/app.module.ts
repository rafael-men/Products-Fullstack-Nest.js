import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { DataSeederModule } from './data/data.seeder.module';
import { ConsoleModule } from 'nestjs-console';
import { LambdaModule } from './modules/lambda.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://mongo:qWfUxFeMrtQxRtpHakAkVIWMxNsVGpLc@shinkansen.proxy.rlwy.net:52381'),
    ProductModule,CategoryModule,OrderModule,ConsoleModule,DataSeederModule,LambdaModule
  ],
})
export class AppModule {}
