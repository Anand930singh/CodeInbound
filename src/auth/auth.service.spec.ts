import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CrudService } from '../crud/crud.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-access-token'),
          },
        },
        {
          provide: CrudService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({
              email: 'anand2002king@gmail.com',
              userId: 1,
              password: 'test123',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginDto = { email: 'anand2002king@gmail.com', password: 'test123' };

      const expectedToken = 'mocked-access-token';
      jest.spyOn(authService, 'login').mockResolvedValueOnce({ access_token: expectedToken });

      const result = await controller.login(loginDto);
      expect(result.access_token).toBeDefined();
      expect(result.access_token).toEqual(expectedToken);
    });
  });
});
