import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Pool, PoolClient, QueryConfig, QueryResult } from 'pg';

export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;
    private client: PoolClient;

    async onModuleInit() {
        try {
            this.pool = new Pool({
                ssl: 
                {
                    rejectUnauthorized: false
                },
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: parseInt(process.env.POSTGRES_PORT || '5432'),
            });

            this.client = await this.pool.connect();

            console.log("Conectado ao PostgreSQL");
        } catch (error) {
            console.error("Erro ao se conectar ao PostgreSQL: ", error);
            throw error;
        }
    }

    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        try {
            console.log("Executando consulta SQL:", sql);
            console.log("Parâmetros:", params);

            const result: QueryResult<T> = await this.client.query(sql, params);

            console.log(result.rows);

            return result.rows;
        } catch (error) {
            console.error("Erro ao executar a query: ", error);
            throw error;
        }
    }

    async onModuleDestroy() {
        try {
            await this.client.release();
            await this.pool.end();
            console.log('Conexão ao PostgreSQL fechada');
        } catch (error) {
            console.error('Erro ao fechar conexão com PostgreSQL', error);
        }
    }
}