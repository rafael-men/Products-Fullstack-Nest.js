import { Controller, Post , Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductService } from 'src/services/product/product.service';

@Controller('products')
export class ProductController {

    constructor(private readonly productService : ProductService) {}

    @Post('new')
    createProduct(@Body() createProductDto : CreateProductDto) {
        return this.productService.create(createProductDto);
    };

    @Get()
    findAllProducts() {
        return this.productService.findAll();
    };

    @Get(':id')
    findProductById(@Param('id') id: string) {
        return this.productService.findById(id);
    };

    @Delete('deletar/:id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteById(id);
    }

    @Put('atualizarProduto/:id')
    updateProduct(@Param('id') id:string,@Body() updateProductDto : CreateProductDto) {
        return this.productService.updateById(id,updateProductDto);
    }
}
