import { Test, TestingModule } from '@nestjs/testing';
import { GestionHistoriqueService } from './gestion-historique.service';

describe('GestionHistoriqueService', () => {
  let service: GestionHistoriqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionHistoriqueService],
    }).compile();

    service = module.get<GestionHistoriqueService>(GestionHistoriqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
