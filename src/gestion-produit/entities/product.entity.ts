import { MaxLength } from "class-validator";
import { Historique } from "src/gestion-historique/entities/historique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId: number
    @Column()
    @MaxLength(20)
    productName: string
    @Column()
    productImage: string
    @Column()
    productPrice: number
    @Column()
    devise: string
    @ManyToOne(() => Category, (category) => category.products , {eager : true})
    category : Category
    @OneToMany(() => Historique, (historique) => historique.product , { onDelete: 'CASCADE' })
    historiques : Historique[]
    
}