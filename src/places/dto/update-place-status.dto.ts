import { IsEnum } from "class-validator";
import { PlaceStatus } from "../place-status.enum";

export class UpdatePlaceStatusDto {
    @IsEnum(PlaceStatus)
    status: PlaceStatus;
}