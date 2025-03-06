import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../models/Order/order.schema';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { Product } from '../../models/Product/product.schema';


@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,@InjectModel(Product.name) private productModel: Model<Product>) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        for (const productId of createOrderDto.productIds) {
          const productExists = await this.productModel.findById(productId);
          if (!productExists) {
            throw new BadRequestException(`Produto com ID ${productId} não encontrado.`);
          }
        }
        const createdOrder = new this.orderModel({
          date: createOrderDto.date,
          productIds: createOrderDto.productIds,
          total: createOrderDto.total,
        });
        return createdOrder.save();
    };

    async getAllOrders():Promise<Order[]> {
        return this.orderModel.find().populate('productIds', '_id').lean().exec();
    };

    async findById(id: string): Promise<Order> {
            const order = await this.orderModel.findById(id).populate('productIds', '_id').lean().exec();
            if(!order) {
                throw new BadRequestException('Pedido não Cadastrado');
            }
            return order;
    };

    async updateOrder(id:string, updateOrderDto:CreateOrderDto):Promise<Order> {
            const updated = await this.orderModel.findByIdAndUpdate(id,updateOrderDto,{new:true}).populate('productIds','_id').lean().exec();
            if(!updated) {
                throw new NotFoundException('Pedido não Cadastrado.');
            }
            return updated;
    }

    async deleteOrder(id: string): Promise<Order> {
        const deleted = await this.orderModel.findByIdAndDelete(id).exec();
        const check = await this.orderModel.findById(id).exec();

        if(!deleted) {
            throw new NotFoundException('Pedido não Cadastrado.');
        }

        if(check?.productIds && check?.productIds.length > 0 ) {
            throw new BadRequestException('Impossível deletar pedido com produto associado');
        }

        return deleted;
    }
}
