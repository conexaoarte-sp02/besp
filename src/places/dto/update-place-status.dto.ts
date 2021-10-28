import { IsEnum } from "class-validator";
import { PlaceStatus } from "../place.model";

export class UpdatePlaceStatusDto {
    @IsEnum(PlaceStatus)
    status: PlaceStatus;
}