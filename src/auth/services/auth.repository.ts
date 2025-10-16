import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUsuarioInputDto } from "./dto/createUser.dto";


@Injectable()
export class AuthRepository {

     constructor(private readonly db: DatabaseService) {}

    async createUsuario(dto: CreateUsuarioInputDto) {


    const sql = `
      INSERT INTO users (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING nome, email
    `;

    const params = [dto.nome, dto.email, dto.senha];

    const result = await this.db.query<{nome: string; email: string }>(sql, params);

    return result[0];
  }

}