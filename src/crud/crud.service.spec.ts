import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrudService } from './crud.service';
import { Repository } from 'typeorm';
import { Crud } from './entity/crud.entity';
import { CreateCrudDto } from './dto/create.dto';
import { UpdateCrudDto } from './dto/update.dto';

describe('CrudService', () => {
  let service: CrudService;
  let repository: Repository<Crud>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrudService,
        {
          provide: getRepositoryToken(Crud),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CrudService>(CrudService);
    repository = module.get<Repository<Crud>>(getRepositoryToken(Crud));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return all crud items', async () => {
      const expectedResult: Crud[] = [{ id: expect.any(Number), firstName:expect.any(String), lastName:expect.any(String), email:expect.any(String),password:expect.any(String) }];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(expectedResult);

      const result = await service.get();

      expect(result).toEqual(expectedResult);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new crud item', async () => {
      const createDto: CreateCrudDto = { id:2 ,firstName: 'John', lastName: 'Doe', email: 'john@example.com',password:'john123' };
      const expectedResult: Crud = { id: 2, ...createDto };

      jest.spyOn(repository, 'create').mockReturnValueOnce(expectedResult);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);
    });
  });

  

  describe('delete', () => {
    it('should delete a crud item', async () => {
      const id = 1;

      jest.spyOn(repository, 'delete').mockResolvedValueOnce(undefined);

      const result = await service.delete(id);

      expect(result).toBe('Deleted!');
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('findByEmail', () => {
    it('should find a crud item by email', async () => {
      const email = 'anand200king@gmail.com';
      const expectedResult: Crud = { id: 1, firstName: expect.any(String), lastName: expect.any(String), email: email, password: expect.any(String) };
  
      const queryBuilderMock = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(expectedResult),
      };
  
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue(queryBuilderMock as any);
  
      const result = await service.findByEmail(email);
  
      expect(result).toEqual(expectedResult);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('crud');
      expect(queryBuilderMock.where).toHaveBeenCalledWith('crud.email = :email', { email });
      expect(queryBuilderMock.getOne).toHaveBeenCalled();
    });
  });
  
  
});
