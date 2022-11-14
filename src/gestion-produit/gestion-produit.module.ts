import { Module } from '@nestjs/common';
import { GestionProduitService } from './gestion-produit.service';
import { GestionProduitController } from './gestion-produit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports : [ TypeOrmModule.forFeature([Product ,Category]),
                MulterModule.register(
                  {
                    dest :"src/uploads"
                  }
                )
  ],
  controllers: [GestionProduitController],
  providers: [GestionProduitService]
})
export class GestionProduitModule {}
