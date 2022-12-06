import { Module } from '@nestjs/common';
import { GestionHistoriqueService } from './gestion-historique.service';
import { GestionHistoriqueController } from './gestion-historique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historique } from './entities/historique.entity';
import { Product } from 'src/gestion-produit/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Historique,Product
  ])],
  controllers: [GestionHistoriqueController],
  providers: [GestionHistoriqueService],
  
})
export class GestionHistoriqueModule { }
