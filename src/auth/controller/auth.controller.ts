import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUsuarioInputDto } from "../services/dto/createUser.dto";
import { AuthService } from "../services/auth.service";
import { LoginInputDto } from "../services/dto/login.dto";

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

    @ApiOperation({ summary: 'Logar com o usuario ja existente' }) 
    @Post('/login')
    @ApiCreatedResponse({description: 'token'})
    @ApiInternalServerErrorResponse({description: 'Erro interno no servidor'})
    @ApiBadRequestResponse({description: 'Email do usuário não cadastrado no sistema!'})
    async login(@Body() dto: LoginInputDto) {
        return this.authService.login(dto);
    }

}