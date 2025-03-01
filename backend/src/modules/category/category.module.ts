import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/Category/category.schema';
import { CategoryService } from 'src/services/category/category.service';
import { CategoryController } from 'src/controllers/category/category.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
