import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { Category } from 'src/models/Category/category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async saveCategory(createCategoryDto:CreateCategoryDto):Promise<Category> {
        try {
            const categoryCreated = new this.categoryModel(createCategoryDto);
            return categoryCreated.save();
        }
        catch(err) {
            throw new error('Erro ao salvar a categoria.', err);
        }
    }

    async findAll(): Promise<Category[]> {
        try {
            return this.categoryModel.find().exec();
        }
        catch(err) {
            throw new error('Erro ao buscar as categorias.',err)
        }
    }

    async findById(id: string): Promise<Category> {
        try {
            const category = await this.categoryModel.findById(id).exec();
            if(!category) {
                throw new NotFoundException('Categoria não encontrada.');
            }
            return category;
        }
        catch(err) {
            throw new error('Erro ao buscar a categoria.',err);
        }
    }

    async updateById(id:string,updateCategoryDto:CreateCategoryDto): Promise<Category> {
        try {
            const updated = await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto,{new:true}).exec();
            if(!updated) {
                throw new NotFoundException('Categoria não encontrada, não foi possível atualizar.')
            }
            return updated;
        }
        catch(err) {
            throw new error('Não foi possível atualizar a categoria, erro inesperado.',err);
        }
    }

    async deleteCategory(id:string):Promise<Category> {
        try {
            const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
            if(!deleted) {
                throw new NotFoundException('Categoria não encontrada.');
            }
            return deleted;
        }
        catch(err) {
            throw new error('Erro ao buscar a categoria.',err);
        }
    }
 }
