import { Test, TestingModule } from '@nestjs/testing';
import { GestionProduitService } from './gestion-produit.service';

describe('GestionProduitService', () => {
  let service: GestionProduitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionProduitService],
    }).compile();

    service = module.get<GestionProduitService>(GestionProduitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
