import { EntityRepository, Repository } from "typeorm";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { PlaceStatus } from "./place-status.enum";
import { Place } from "./place.entity";

@EntityRepository(Place)
export class PlacesRepository extends Repository<Place> {

    async getPlaces(): Promise<Place[]> {

        const query = this.createQueryBuilder("place");

        return await query.getMany();

    }
    
    async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {

        const { name, site, address, image, ticket, description, categoryId } = createPlaceDto;

        const newPlace = this.create({
            name,
            site,
            address,
            image,
            ticket,
            description,
            status: PlaceStatus.ACTIVE,
            categoryId
        });

        await this.save(newPlace);

        return newPlace;

    }

}