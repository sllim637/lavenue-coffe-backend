import { Module } from '@nestjs/common';
import { GestionProduitService } from './gestion-produit.service';
import { GestionProduitController } from './gestion-produit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([Product ,Category])],
  controllers: [GestionProduitController],
  providers: [GestionProduitService]
})
export class GestionProduitModule {}
