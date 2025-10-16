import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { CreateUsuarioInputDto } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly repository: AuthRepository) {}

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

}