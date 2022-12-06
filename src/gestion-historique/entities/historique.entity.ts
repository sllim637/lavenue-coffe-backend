import { Transform } from "class-transformer";
import { Product } from "src/gestion-produit/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
    historiqueId: number
    @ManyToOne(() => Product, (product) => product.historiques , {eager : true})
    product : Product
    @Column()
    dateOfCommand : string
    @Column()
    quantity : number
    //this column is created to know who is created the command
    @Column()
    userId : number

}