import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { v4 as uuid } from "uuid";
import { CategoriesRepository } from './categories.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { runInThisContext } from 'vm';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(CategoriesRepository)
        private categoriesRepository: CategoriesRepository
    ) {}
    
    async getAllCategories(): Promise<Category[]> {

        return await this.categoriesRepository.getAllCategories();

    }

    async getCategoryById(id: number): Promise<Category> {

        const found = await this.categoriesRepository.findOne(id);

        if (!found) {
            throw new NotFoundException("ID não encontrado.")
        }

        return found;

    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {

        return await this.categoriesRepository.createCategory(createCategoryDto);

    }

    async deleteCategory(id: number): Promise<void> {

        const result = await this.categoriesRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException("ID não encontrado.");
        }

    }

    /*
    private categories: Category[] = [];

    getAllCategories(): Category[] {

        return this.categories;

    }

    getCategoryById(id: string): Category {

        const found = this.categories.find((category) => category.id === id);

        if (!found) {
            throw new NotFoundException("ID não encontrado.")
        }

        return found;

    }

    createCategory(createCategoryDto: CreateCategoryDto) {

        const { name } = createCategoryDto;

        const newCategory: Category = {
            id: uuid(),
            name
        }

        this.categories.push(newCategory);

        return newCategory;

    }

    deleteCategory(id: string): void {

        const found = this.getCategoryById(id);

        this.categories = this.categories.filter((category) => category.id !== found.id);

    }
    */

}
