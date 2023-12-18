import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateCatDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    image: string
}
