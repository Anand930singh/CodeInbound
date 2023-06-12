import { Injectable } from '@nestjs/common';
import { Crud } from './entity/crud.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCrudDto } from './dto/update.dto';
import { CreateCrudDto } from './dto/create.dto';

@Injectable()
export class CrudService {

    constructor(
        @InjectRepository(Crud)
        private crudRepo: Repository<Crud>,
    ) {}

    // Get all crud item
    async get(): Promise<Crud[]> {
        return this.crudRepo.find();
    }

    //Create a crud item
    async create(data: CreateCrudDto): Promise<Crud> {
        const newCrudItem = this.crudRepo.create(data);
        return this.crudRepo.save(newCrudItem);
    }

    //Update any particular crud item by using id
    async update(id: number, UpdateCurdDto: UpdateCrudDto): Promise<Crud> {
        const { firstName, lastName, email } = UpdateCurdDto;

        const updateData: Partial<Crud> = {}; 

        if (firstName) {
            updateData.firstName = firstName;
        }
        if (lastName) {
            updateData.lastName = lastName;
        }
        if (email) {
            updateData.email = email;
        }

        await this.crudRepo.update(id, updateData);
        return this.crudRepo.findOne({ where: { id } });
    }

    //Delete any Crud item by using id
    async delete(id: number): Promise<string> {
        await this.crudRepo.delete(id);
        return 'Deleted!';
    }
      


}
