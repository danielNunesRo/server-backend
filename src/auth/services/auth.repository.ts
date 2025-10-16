import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUsuarioInputDto } from "./dto/createUser.dto";
import { LoginInputDto } from "./dto/login.dto";
import { User } from "./entities/user.entity";
import { LoginOutputDto } from "./dto/login.output.dto";


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

  async findByEmail(email: string) {
      const sql = `
        SELECT id, nome, email, role, senha 
        FROM users
        WHERE EMAIL = $1
      `;

      const result = await this.db.query<LoginOutputDto>(sql, [email]);

      return result[0] ?? null;
  }

}