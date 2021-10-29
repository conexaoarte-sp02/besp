import { EntityRepository, Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {

    async getAllCategories(): Promise<Category[]> {

        const query = this.createQueryBuilder("categories");

        return await query.getMany();

    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {

        const { name } = createCategoryDto;

        const category = this.create({
            name
        });

        await this.save(category);

        return category;

    }

}