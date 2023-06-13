import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudService } from './crud/crud.service';
import { CrudController } from './crud/crud.controller';
import { CrudModule } from './crud/crud.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "sql@2002",
      "database": "TestDatabase",
      "synchronize": true,
      "logging": true,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "migrations": ["dist/migrations/*{.ts,.js}"],
  }),
    CrudModule,
    AuthModule,
    ProfileModule
  ],
  // controllers: [CrudController, AuthController],
})
export class AppModule {}
