import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/teste_hub_xp'),
    ProductModule,CategoryModule
  ]
})
export class AppModule {}
