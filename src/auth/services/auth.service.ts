import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { CreateUsuarioInputDto } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt';
import { LoginInputDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly repository: AuthRepository,
                private readonly jwtService: JwtService
    ) {}

        async createUsuario(dto: CreateUsuarioInputDto) {
            const hashedPassword = await bcrypt.hash(dto.senha, 10);
            const nomeUpper = dto.nome.toUpperCase();
            const emailUpper = dto.email.toUpperCase();

            const usuarioToSave = {
                ...dto,
                nome: nomeUpper,
                email: emailUpper,
                senha: hashedPassword,
            };
            

            try {
                return await this.repository.createUsuario(usuarioToSave);
            } catch (error: any) {
                if(error.code === '23505') {
                    throw new InternalServerErrorException('Email já cadastrado.');
                }
                throw new InternalServerErrorException('Erro ao cadastrar usuário, tente novamente.')
            }
    }

    async login (dto: LoginInputDto) {
        try {
            const user = await this.repository.findByEmail(dto.email.toUpperCase());

            if(!user) {
                throw new BadRequestException('Email do usuário não cadastrado no sistema!');
            }

            const isPasswordValid = await bcrypt.compare(dto.senha,user.senha);
            
            if(!isPasswordValid) {
                throw new BadRequestException('Senha incorreta'); 
            }
            
            const payload = {sub: user.id, email: user.email, role: user.role}

            return {
                acess_token: this.jwtService.sign(payload)
            };

        } catch {
            throw new InternalServerErrorException('Erro interno no servidor')
        }
    }

    

}