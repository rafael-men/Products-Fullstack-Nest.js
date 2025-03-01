import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/Product/product.schema';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { error } from 'console';

type Result<T> = { success: true; data: T } | { success: false; error: string };

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Result<Product>> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      const savedProduct = await createdProduct.save();
      return { success: true, data: savedProduct };
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
      return { success: false, error: `Produto com ID ${id} não encontrado` }; // Verifica se o produto existe
    }
    return { success: true, data: product };
  };

  async deleteById(id: string): Promise<Product> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();

    if(!deleted) {
      throw new error('Produto não cadastrado.');
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
