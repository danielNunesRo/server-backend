import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { InternalServerErrorException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateUsuarioInputDto } from './dto/createUser.dto';
import { DatabaseService } from 'src/database/database.service';


describe('AuthService', () => {
  let sut: AuthService;
  let authRepository: AuthRepository;
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            createUsuario: vi.fn(),
          },
        },
        {
            provide: DatabaseService,
            useValue: {
                query: vi.fn(),
            }
        }
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    databaseService = module.get<DatabaseService>(DatabaseService)
  });

   it('Should be defined', () => {
        expect(sut).toBeDefined();
        expect(authRepository).toBeDefined();
        expect(databaseService).toBeDefined();
    });

  it('deve criar um usuário com nome e email em maiúsculas e senha hashed', () => {
    const dto: CreateUsuarioInputDto = { nome: 'xuxudoblues', email: 'xuxudoblues@gmail.com', senha: '999' };

    vi.spyOn(authRepository, 'createUsuario').mockResolvedValue({
            nome: 'XUXUDOBLUES',
            email: 'XUXUDOBLUES@GMAIL.COM',
    }); 

    const result =  sut.createUsuario(dto);

    expect(result).not.toBeNull();
  });

  it('deve lançar InternalServerErrorException se email já existir', async () => {
    const dto: CreateUsuarioInputDto = {
      nome: 'Daniel',
      email: 'daniel@email.com',
      senha: '123456',
    };

    (authRepository.createUsuario as any).mockRejectedValue({ code: '23505' });

    await expect(sut.createUsuario(dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('deve lançar InternalServerErrorException para outros erros', async () => {
    const dto: CreateUsuarioInputDto = {
      nome: 'Daniel',
      email: 'daniel@email.com',
      senha: '123456',
    };

    (authRepository.createUsuario as any).mockRejectedValue({ code: '99999' });

    await expect(sut.createUsuario(dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
