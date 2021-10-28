import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceStatusDto } from './dto/update-place-status.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './place.model';
import { PlacesService } from './places.service';

// http://localhost:3000/places
@Controller('places')
export class PlacesController {

    constructor(private placesService: PlacesService) {}
    
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

}
