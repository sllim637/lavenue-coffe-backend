import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { GestionProduitModule } from './gestion-produit/gestion-produit.module';
import { Category } from './gestion-produit/entities/category.entity';
import { Product } from './gestion-produit/entities/product.entity';
import { GestionHistoriqueModule } from './gestion-historique/gestion-historique.module';
import { Historique } from './gestion-historique/entities/historique.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '28360788',
      database: 'caffe-database',
      entities: [User,Category,Product,Historique],
      synchronize: true,
      autoLoadEntities:true,
    }),

    UserModule,
    GestionProduitModule,
    GestionHistoriqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
