import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [
    PlacesModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "user_besp",
      password: "user_besp",
      database: "besp",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
