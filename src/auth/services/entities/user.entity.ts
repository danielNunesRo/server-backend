import { Role } from "../role/role.enum";

export interface User {
    ID: number;
    NOME: string;
    EMAIL: string;
    SENHA: string;
    ROLE: Role;
    ATIVO: number;
    DATA_CRIACAO: Date;
}