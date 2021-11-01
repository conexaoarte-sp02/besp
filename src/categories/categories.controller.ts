import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCategory(@Body() newCategory: CreateCategoryDto): Promise<Category> {

        return await this.categoriesService.createCategory(newCategory);

    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteCategory(@Param("id") id: number): Promise<void> {

        return await this.categoriesService.deleteCategory(id);

    }

}
