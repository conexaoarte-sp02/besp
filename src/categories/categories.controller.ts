import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}
    
    @Get()
    async getAllCategories(): Promise<Category[]> {

        return await this.categoriesService.getAllCategories()

    }

    @Get(":id")
    async getCategoryById(@Param("id") id: number): Promise<Category> {

        return await this.categoriesService.getCategoryById(id);

    }

    @Post()
    async createCategory(@Body() newCategory: CreateCategoryDto): Promise<Category> {

        return await this.categoriesService.createCategory(newCategory);

    }

    @Delete(":id")
    async deleteCategory(@Param("id") id: number): Promise<void> {

        return await this.categoriesService.deleteCategory(id);

    }

}
