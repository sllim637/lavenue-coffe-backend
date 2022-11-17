import { MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @ManyToOne(() => Category, (category) => category.products)
    category : Category
    
}