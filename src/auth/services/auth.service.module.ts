import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { AuthRepository } from "./auth.repository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/strategy.jwt";
import { JwtAuthGuard } from "./jwt/jwt.auth.guard";
import { AuthController } from "../controller/auth.controller";


@Module({
    imports: [DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET_KEY'), 
                signOptions: { expiresIn: '60m' }, 
            }),
            inject: [ConfigService],
        })
    ],
    exports: [AuthService], 
    providers: [AuthRepository, AuthService, AuthRepository, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
})

export class AuthServiceModule {}