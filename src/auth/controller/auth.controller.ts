import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUsuarioInputDto } from "../services/dto/createUser.dto";
import { AuthService } from "../services/auth.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Registrar um novo usuário' }) 
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
    @ApiInternalServerErrorResponse({ description: 'Erro ao criar usuário' })
    async createUser(@Body() dto: CreateUsuarioInputDto) {
        return this.authService.createUsuario(dto);
    }

}