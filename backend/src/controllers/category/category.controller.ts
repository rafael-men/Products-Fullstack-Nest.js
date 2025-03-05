import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { CategoryService } from 'src/services/category/category.service';

@Controller('category')
export class CategoryController {
    constructor (private readonly categoryService:CategoryService) {}

    @Post('new')
    create(@Body() createCategoryDto : CreateCategoryDto ) {
        return this.categoryService.saveCategory(createCategoryDto);
    }

    @Get()
    getAllCategories(@Body() createCategoryDto:CreateCategoryDto) {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id:string) {
        return this.categoryService.findById(id);
    }

    @Put('atualizar/:id')
    updateById(@Param('id') id:string, @Body() updateCategoryDto:CreateCategoryDto) {
        try {
            return this.categoryService.updateById(id,updateCategoryDto);
        }
        catch(error) {
            throw new BadRequestException('Erro inesperado, tente novamente');
        }
    }


    @Delete('deletar/:id')
    deleteCategory(@Param('id') id:string) {
        try {
            return this.categoryService.deleteCategory(id);
        }
        catch(error) {
            throw new BadRequestException('Erro inesperado, tente novamente.')
        }
    }
}
