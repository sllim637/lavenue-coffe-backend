import { Module } from '@nestjs/common';
import { GestionHistoriqueService } from './gestion-historique.service';
import { GestionHistoriqueController } from './gestion-historique.controller';

@Module({
  controllers: [GestionHistoriqueController],
  providers: [GestionHistoriqueService]
})
export class GestionHistoriqueModule {}
