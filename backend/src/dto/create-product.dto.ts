import {IsString,IsNumber,IsArray,IsOptional} from 'class-validator'

export class CreateProductDto {

  @IsString()
  name:string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

