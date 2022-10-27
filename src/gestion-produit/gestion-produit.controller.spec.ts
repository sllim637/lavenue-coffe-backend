import { Test, TestingModule } from '@nestjs/testing';
import { GestionProduitController } from './gestion-produit.controller';
import { GestionProduitService } from './gestion-produit.service';

describe('GestionProduitController', () => {
  let controller: GestionProduitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionProduitController],
      providers: [GestionProduitService],
    }).compile();

    controller = module.get<GestionProduitController>(GestionProduitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
