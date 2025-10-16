import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { Role } from "../role/role.enum";

export class LoginOutputDto {

    @ApiProperty({description: 'id do usuário', example: 15})
    @IsInt()
    id: number;
    
    @ApiProperty({description: 'email do usuario cadastrado', example: 'daniel@gmail.com'})
    @IsString()
    email: string;

    @ApiProperty({description: 'Nome do Usuario'})
    nome: string;

    @ApiProperty({description: 'Role do Usuario', example: 'ADMINISTRADOR'})
    role: Role

    @ApiProperty({description: 'Senha do Usuario'})
    senha: string
}