import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginInputDto {

    @ApiProperty({description: 'email do usuario cadastrado', example: 'daniel@gmail.com'})
    @IsString()
    email: string;

    @ApiProperty({description: 'senha do usuario cadastrado'})
    senha: string;
}