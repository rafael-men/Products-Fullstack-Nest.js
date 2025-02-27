import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/Product/product.schema';
import { ProductService } from 'src/services/product/product.service';
import { ProductController } from 'src/controllers/product/product.controller';


@Module({
    imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}])],
    controllers:[ProductController],
    providers:[ProductService],
})
export class ProductModule {}
