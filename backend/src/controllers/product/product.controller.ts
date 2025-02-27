import { Controller, Post , Body, Get } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductService } from 'src/services/product/product.service';

@Controller('products')
export class ProductController {

    constructor(private readonly productService : ProductService) {}

    @Post()
    createProduct(@Body() createProductDto : CreateProductDto) {
        return this.productService.create(createProductDto);
    };

    @Get()
    findAllProducts() {
        return this.productService.findAll();
    };
}
