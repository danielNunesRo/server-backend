import { Module } from "@nestjs/common";
import { AuthServiceModule } from "./services/auth.service.module";
import { AuthController } from "./controller/auth.controller";


@Module({
    imports: [AuthServiceModule],
    exports: [AuthServiceModule],
})

export class AuthModule {}