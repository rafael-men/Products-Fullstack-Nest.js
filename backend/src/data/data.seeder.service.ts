import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../models/Product/product.schema';
import { Category } from '../models/Category/category.schema';
import { Order } from '../models/Order/order.schema';

@Injectable()
export class DataSeederService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async seedData() {
    await this.clearData();

    const categories = await this.categoryModel.insertMany([
      { name: 'Eletrônicos' },
      { name: 'Roupas' },
    ]);

    const products = await this.productModel.insertMany([
      {
        name: 'Iphone XS',
        description: 'Um celular de nova geração',
        price: 4500.99,
        categoryIds: [categories[0]._id], 
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_bbQld6weW92dE5eD10ZxSKMX_A4nNV9Dog&s',
      },
      {
        name: 'Laptop Lenovo LOQ',
        description: 'Um computador poderoso com rtx 4050',
        price: 5099.99,
        categoryIds: [categories[0]._id], 
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHJM9LcxFFq_j29qPQTWJcDVNdme8D0OjfBQ&s',
      },
    ]);

    await this.orderModel.insertMany([
      {
        date: new Date(),
        productIds: [products[0]._id, products[1]._id], 
        total: 9600.98,
      },
    ]);

    console.log('Data seeding completed');
  }

  async clearData() {
    await this.orderModel.deleteMany({}).exec();
    await this.productModel.deleteMany({}).exec();
    await this.categoryModel.deleteMany({}).exec();
    console.log('Data cleared successfully');
  }
}