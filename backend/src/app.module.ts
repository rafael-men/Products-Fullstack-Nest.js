import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { DataSeederModule } from './data/data.seeder.module';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/teste_hub_xp'),
    ProductModule,CategoryModule,OrderModule,ConsoleModule,DataSeederModule
  ],
})
export class AppModule {}
