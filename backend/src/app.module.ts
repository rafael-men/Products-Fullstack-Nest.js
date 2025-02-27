import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/teste_hub_xp'),
    ProductModule
  ]
})
export class AppModule {}
