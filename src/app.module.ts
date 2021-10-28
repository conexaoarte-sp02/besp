import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [PlacesModule, CategoriesModule],
})
export class AppModule {}
