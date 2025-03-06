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
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Home & Kitchen' },
    ]);

    const products = await this.productModel.insertMany([
      {
        name: 'Smartphone',
        description: 'A high-end smartphone',
        price: 999.99,
        categoryIds: [categories[0]._id], 
        imageUrl: 'https://example.com/smartphone.jpg',
      },
      {
        name: 'Laptop',
        description: 'A powerful laptop',
        price: 1499.99,
        categoryIds: [categories[0]._id], 
        imageUrl: 'https://example.com/laptop.jpg',
      },
      {
        name: 'T-Shirt',
        description: 'A comfortable cotton t-shirt',
        price: 19.99,
        categoryIds: [categories[1]._id], 
        imageUrl: 'https://example.com/tshirt.jpg',
      },
    ]);

    await this.orderModel.insertMany([
      {
        date: new Date(),
        productIds: [products[0]._id, products[1]._id], 
        total: 2499.98,
      },
      {
        date: new Date(),
        productIds: [products[2]._id], 
        total: 19.99,
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