import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { CreateHistoriqueDTO } from './dto/create-historique.dto';
import { Historique } from './entities/historique.entity';
import { Product } from 'src/gestion-produit/entities/product.entity';
@Injectable()
export class GestionHistoriqueService {
    constructor(
        @InjectRepository(Historique)
        private historiqueRepository: Repository<Historique>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async add_update_History(createHistoriqueDTO: CreateHistoriqueDTO, user: User) {
        for (let i = 0; i < createHistoriqueDTO.commands.length; i++) {
            let historique = new Historique()
            historique.dateOfCommand = createHistoriqueDTO.date
            historique.userId = user.userId,
                historique.quantity = createHistoriqueDTO.commands[i].quantity
            historique.product = await this.productRepository.findOne({ where: { productId: createHistoriqueDTO.commands[i].productId } })
            let fetchedHistory = await this.historiqueRepository.findOne({
                where: {
                    dateOfCommand: createHistoriqueDTO.date,
                    userId: user.userId,
                    product: historique.product
                }
            })
            if (!fetchedHistory) {
                await this.historiqueRepository.save(historique)
            } else {
                fetchedHistory.quantity += Number(historique.quantity)
                await this.historiqueRepository.update(fetchedHistory.historiqueId, fetchedHistory)
            }
        } 
    }

    async getHistoriqueByDates(dateOfStart: Date, dateOfEnd: Date) {
        console.log("the dates are :" , dateOfEnd , dateOfStart);
        let historiques = await this.historiqueRepository.find({where : {
            dateOfCommand : Between(dateOfStart,dateOfEnd)
        }})
        console.log('nous attendons : ' , 6 , " et nous avons "  , historiques.length)
        console.log("the fetched data is :" , historiques)
    }

}
