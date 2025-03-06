import { IsArray, IsDate, IsNumber, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsDate()
    @IsNotEmpty()
    date:Date;

    @IsArray()
    @IsNotEmpty()
    productIds:string[];

    @IsNumber()
    @IsNotEmpty()
    total:number;
};