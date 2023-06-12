import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudService } from './crud/crud.service';
import { CrudController } from './crud/crud.controller';
import { CrudModule } from './crud/crud.module';

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
    CrudModule
  ],
  controllers: [CrudController],
})
export class AppModule {}
