import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crud } from './entity/crud.entity';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    controllers:[CrudController],
    providers:[CrudService],
    exports:[CrudService],
    imports:[TypeOrmModule.forFeature([Crud])]
})
export class CrudModule {}
