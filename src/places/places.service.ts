import { Injectable, NotFoundException } from '@nestjs/common';
import { Place, PlaceStatus } from './place.model';
import { v4 as uuid } from "uuid";
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {

    private places: Place[] = [];

    getAllPlaces(): Place[] {

        return this.places;

    }

    getPlaceById(id: string): Place {

        const found = this.places.find((place) => place.id === id);

        if (!found) {
            throw new NotFoundException("ID não encontrado.");
        }

        return found;

    }

    createPlace(createPlaceDto: CreatePlaceDto): Place {

        const { name, site, address, image, ticket, description } = createPlaceDto;

        const newPlace: Place = {
            id: uuid(),
            name,
            site,
            address,
            image,
            ticket,
            description,
            status: PlaceStatus.ACTIVE,
        };

        this.places.push(newPlace);

        return newPlace;

    }

    updatePlaceStatus(id: string, status: PlaceStatus): Place {

        // 1 - Encontrar o lugar. Preciso do ID
        const place = this.getPlaceById(id);

        // 2 - Atualizar o status
        place.status = status;

        return place;

    }

    updatePlace(id: string, updatePlaceDto: UpdatePlaceDto): Place {

        const { name, site, address, image, ticket, description } = updatePlaceDto;
        
        const place = this.getPlaceById(id);

        if (name) {
            place.name = name;
        }
        
        if (site) {
            place.site = site;
        }

        if (address) {
            place.address = address;
        }
        
        if (image) {
            place.image = image;            
        }

        if (ticket) {
            place.ticket = ticket;
        }

        if (description) {
            place.description = description;
        }

        return place;

    }

    deletePlace(id: string): void {

        const found = this.getPlaceById(id);

        // Definir que todos os itens que não possuam o ID informado continuem no array de lugares
        // !== -> Usado quando queremos verificar se uma variável é diferente de outra
        this.places = this.places.filter((place) => place.id !== found.id);

        // ==  -> Compara o valor das variáveis.          Ex.: "5" == 5 -> Verdadeiro (True)
        // === -> Compara o valor e o tipo das variáveis. Ex.: "5" === 5 -> Falso (False)
        // Usado para verificar uma igualdade

        // !=  -> Compara o valor das variáveis.
        // !== -> Compara o valor e o tipo das variáveis.
        // Usado para verificar uma diferença

    }

}
