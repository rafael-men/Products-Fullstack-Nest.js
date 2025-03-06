import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../models/Product/product.schema';
import { Category,CategorySchema } from '../models/Category/category.schema';
import { Order,OrderSchema } from '../models/Order/order.schema';
import { DataSeederService } from './data.seeder.service';
import { DataSeederConsole } from './data.seeder.console';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [DataSeederService, DataSeederConsole],
})
export class DataSeederModule {}