import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../models/Product/product.schema';
import { CreateProductDto } from '../../dto/create-product.dto';
import { error } from 'console';
import { Order } from '../../models/Order/order.schema';
import { Category } from '../../models/Category/category.schema';

type Result<T> = { success: true; data: T } | { success: false; error: string };

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>, @InjectModel(Order.name) private readonly orderModel: Model<Order>,@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async create(createProductDto: CreateProductDto): Promise<Result<Product>> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      const savedProduct = createdProduct.save();
      const categoryId = createProductDto.categoryIds;
      const categoryExists = await this.categoryModel.findById(categoryId);
      if (!categoryExists) {
        throw new BadRequestException('Categoria não encontrado. Verifique o ID do produto.');
      } 
      return { success: true, data: (await savedProduct).toObject() as Product };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Erro de validação: ${error.message}`);
      }
      throw new InternalServerErrorException(`Erro ao criar o produto: ${error.message}`);
    }
  };

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('categoryIds').exec();
  };

  async findById(id: string): Promise<Result<Product>> {
    const product = await this.productModel.findById(id).populate('categoryIds').exec();
    
    if (!product) {
      return { success: false, error: `Produto com ID ${id} não encontrado` }; 
    }
    return { success: true, data: product };
  };

  async deleteById(id: string): Promise<Product> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    const check = await this.orderModel.find({productIds:id}).exec();

    if(!deleted) {
      throw new error('Produto não cadastrado.');
    }
    if(check.length > 0) {
      throw new BadRequestException('Impossível deletar produto com pedido associado.');
    }
    return deleted;
  };

  async updateById(id: string,updateProductDto : CreateProductDto): Promise<Product> {
    try {
      const update = await this.productModel.findByIdAndUpdate(id,updateProductDto,{new:true}).exec();

      if(!update) {
        throw new error('Produto não cadastrado');
      }

      return update;
    } catch(err) {
      throw new error('Erro inesperado, tente novamente.')
    }
  }

}
