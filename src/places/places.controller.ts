import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceStatusDto } from './dto/update-place-status.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';

// http://localhost:3000/places
@Controller('places')
export class PlacesController {

    constructor(private placesService: PlacesService) {}

    // Novo código
    // GET http://localhost:3000/places - Ver uma lista de lugares
    @Get()
    async getPlaces(): Promise<Place[]> {
       return await this.placesService.getAllPlaces(); 
    }

    // GET http://localhost:3000/places/a27250e9-8f89 - Ver as informações de um único lugar, baseando-se no ID
    @Get(":id")
    async getPlaceById(@Param("id") id: string): Promise<Place> {

        return await this.placesService.getPlaceById(id);

    }

    // POST http://localhost:3000/places - Criar um novo lugar
    @UseGuards(JwtAuthGuard)
    @Post()
    async createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {

        return await this.placesService.createPlace(createPlaceDto);

    }

    // PATCH http://localhost:3000/places/dc6d06c8-a0f7-4a88/status
    @UseGuards(JwtAuthGuard)
    @Patch(":id/status")
    async updatePlaceStatus(
        @Param("id") id: string,
        @Body() newStatus: UpdatePlaceStatusDto,
    ): Promise<Place> {

        const { status } = newStatus;

        return await this.placesService.updatePlaceStatus(id, status);

    }

    // PATCH http://localhost:3000/places/dc6d06c8-a0f7-4a88
    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updatePlace(
        @Param("id") id: string,
        @Body() newPlace: UpdatePlaceDto
    ): Promise<Place> {

        return await this.placesService.updatePlace(id, newPlace);

    }

    // DELETE http://localhost:3000/places/dc6d06c8-a0f7-4a88 - Excluir o lugar que possua o ID informado
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deletePlace(@Param("id") id: string): Promise<void> {

        return await this.placesService.deletePlace(id);

    }

    // Código antigo
    /*    
    // GET http://localhost:3000/places - Ver uma lista de lugares
    @Get()
    getPlaces(): Place[] {
       return this.placesService.getAllPlaces(); 
    }

    // GET http://localhost:3000/places/a27250e9-8f89 - Ver as informações de um único lugar, baseando-se no ID
    @Get(":id")
    getPlaceById(@Param("id") id: string): Place {

        return this.placesService.getPlaceById(id);

    }

    // POST http://localhost:3000/places - Criar um novo lugar
    @Post()
    createPlace(@Body() createPlaceDto: CreatePlaceDto): Place {

        return this.placesService.createPlace(createPlaceDto);

    }

    // PATCH http://localhost:3000/places/dc6d06c8-a0f7-4a88/status
    @Patch(":id/status")
    updatePlaceStatus(
        @Param("id") id: string,
        @Body() newStatus: UpdatePlaceStatusDto,
    ): Place {

        const { status } = newStatus;

        return this.placesService.updatePlaceStatus(id, status);

    }

    // PATCH http://localhost:3000/places/dc6d06c8-a0f7-4a88
    @Patch(":id")
    updatePlace(
        @Param("id") id: string,
        @Body() newPlace: UpdatePlaceDto
    ): Place {

        return this.placesService.updatePlace(id, newPlace);

    }

    // DELETE http://localhost:3000/places/dc6d06c8-a0f7-4a88 - Excluir o lugar que possua o ID informado
    @Delete(":id")
    deletePlace(@Param("id") id: string): void {

        return this.placesService.deletePlace(id);

    }

    // EXERCÍCIO.
    // OBJETIVOS:
    // 1) Treinar a criação dos métodos dos controllers e dos services.
    // 2) Treinar a comunicação entre um controller e um service

    // Criar o método de DELETE no Controller, usando o decorator apropriado
    // Criar o método de DELETE no Service
    // Criar apenas a estrutura inicial desses métodos

    */

}
