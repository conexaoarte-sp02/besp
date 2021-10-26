import { Body, Controller, Get, Post } from '@nestjs/common';
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

    // POST http://localhost:3000/places - Criar um novo lugar
    @Post()
    createPlace(
        @Body("name") name: string,
        @Body("site") site: string,
        @Body("address") address: string,
        @Body("image") image: string,
        @Body("ticket") ticket: string,
        @Body("description") description: string,
    ): Place {

        return this.placesService.createPlace(
            name,
            site,
            address,
            image,
            ticket,
            description,
        );

    }

    // PATCH

    // DELETE

}
