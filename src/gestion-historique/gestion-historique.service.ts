import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
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

    async addHistory(createHistoriqueDTO: CreateHistoriqueDTO, user: User) {
        for (let i = 0; i < createHistoriqueDTO.commands.length; i++) {
            let historique = new Historique()
            historique.dateOfCommand = new Date(createHistoriqueDTO.date).toLocaleDateString('en-GB')
            historique.userId = user.userId,
                historique.quantity = createHistoriqueDTO.commands[i].quanity
            historique.product = await this.productRepository.findOne({ where: { productId: createHistoriqueDTO.commands[i].productId } })
            let fetchedHistory = await this.historiqueRepository.findOne({
                where: {
                    dateOfCommand: new Date (createHistoriqueDTO.date).toLocaleDateString('en-GB'),
                    userId: user.userId,
                    product: historique.product
                }
            })
            if (!fetchedHistory) {
                console.log('I am here no historique and the new object is ',historique )
            } else {
                console.log("I am updating the object " , fetchedHistory)
            }
        }
    }
}
