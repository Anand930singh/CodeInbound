import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CrudService } from './crud.service';
import { Crud } from './entity/crud.entity';
import { UpdateCrudDto } from './dto/update.dto';
import { CreateCrudDto } from './dto/create.dto';

@Controller('crud')
export class CrudController {

    constructor(private crudService: CrudService) {}

    // Retrieve all Crud items
    @Get()
    get(): Promise<Crud[]> {
        return this.crudService.get();
    }

    // Create a new Crud item
    @Post()
    create(@Body() data: CreateCrudDto): Promise<Crud> {
        return this.crudService.create(data);
    }

    // Update a Crud item by ID
    // Passing id b parameter
    @Put(':id')
    update(@Param('id') id: number, @Body() updateCrudDto: UpdateCrudDto): Promise<Crud> {
        return this.crudService.update(id, updateCrudDto);
    }

    // Delete a Crud item by ID
    // Passing id b parameter
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<string> {
        await this.crudService.delete(id);
        return 'Deleted!';
    }
    
}
