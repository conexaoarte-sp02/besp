import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}
    
    @Get()
    getAllCategories(): Category[] {

        return this.categoriesService.getAllCategories();

    }

    @Get(":id")
    getCategoryById(@Param("id") id: string): Category {

        return this.categoriesService.getCategoryById(id);

    }

    @Post()
    createCategory(@Body() newCategory: CreateCategoryDto): Category {

        return this.categoriesService.createCategory(newCategory);

    }

    @Delete(":id")
    deleteCategory(@Param("id") id: string): void {

        return this.categoriesService.deleteCategory(id);

    }

}
