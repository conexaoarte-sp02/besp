import { IsOptional, IsString } from "class-validator";

export class UpdatePlaceDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    site: string;
    
    @IsOptional()
    @IsString()
    address: string;
    
    @IsOptional()
    @IsString()
    image: string;
    
    @IsOptional()
    @IsString()
    ticket: string;
    
    @IsOptional()
    @IsString()
    description: string;
}