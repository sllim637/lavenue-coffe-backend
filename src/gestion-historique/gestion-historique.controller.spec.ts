import { Test, TestingModule } from '@nestjs/testing';
import { GestionHistoriqueController } from './gestion-historique.controller';
import { GestionHistoriqueService } from './gestion-historique.service';

describe('GestionHistoriqueController', () => {
  let controller: GestionHistoriqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionHistoriqueController],
      providers: [GestionHistoriqueService],
    }).compile();

    controller = module.get<GestionHistoriqueController>(GestionHistoriqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
