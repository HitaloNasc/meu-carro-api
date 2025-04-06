import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, Reflector } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/filters/global-exception.filter';
import { JwtAuthMiddleware } from './common/middlewares/jwt-auth.middleware';
import { env } from './config/env.config';
import { excludedRoutes } from './config/protected-routes.config';
import { AuthModule } from './features/auth/auth.module';
import { RolesGuard } from './features/auth/guards/roles.guard';
import { ImagesModule } from './features/images/images.module';
import { InstitutionModule } from './features/institutions/institution.module';
import { UserModule } from './features/users/user.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    AuthModule,
    InstitutionModule,
    UserModule,
    DatabaseModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [
    Reflector,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(...excludedRoutes)
      .forRoutes('*');
  }
}
