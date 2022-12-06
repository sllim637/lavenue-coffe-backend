import { Controller } from '@nestjs/common';
import { GestionHistoriqueService } from './gestion-historique.service';

@Controller('gestion-historique')
export class GestionHistoriqueController {
  constructor(private readonly gestionHistoriqueService: GestionHistoriqueService) {}
}
