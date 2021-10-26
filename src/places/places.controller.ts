import { Controller, Get } from '@nestjs/common';

// http://localhost:3000/places
@Controller('places')
export class PlacesController {

    // GET http://localhost:3000/places
    @Get()
    hello() {
        return "Olá Projeto Conexão Arte!!!!"
    }

    // GET http://localhost:3000/places/hcode
    @Get("hcode")
    hcode() {
        return "Sejam bem-vindos!!!!";
    }

}
