import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { DataSeederModule } from './data/data.seeder.module';
import { ConsoleModule } from 'nestjs-console';
import { LambdaModule } from './modules/lambda.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://root:rootpassword@mongo:27017/test_hub_xp?authSource=admin'),
    ProductModule,CategoryModule,OrderModule,ConsoleModule,DataSeederModule,LambdaModule
  ],
})
export class AppModule {}
