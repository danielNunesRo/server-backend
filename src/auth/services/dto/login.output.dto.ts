import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, IsString } from "class-validator";
import { Role } from "../role/role.enum";
import { Roles } from "../decorator/roles.decorator";

export class LoginOutputDto {

    @ApiProperty({description: 'id do usuário', example: 15})
    @IsInt()
    id: number;
    
    @ApiProperty({description: 'email do usuario cadastrado', example: 'daniel@gmail.com'})
    @IsString()
    email: string;

    @ApiProperty({description: 'Nome do Usuario'})
    nome: string;

    @IsEnum(Role)
    @ApiProperty({description: 'Role do Usuario', example: Role})
    role: Role

    @ApiProperty({description: 'Senha do Usuario'})
    senha: string
    
    @IsBoolean()
    @ApiProperty({description: 'O usuário é verificado', example: true})
    isverified: boolean
}