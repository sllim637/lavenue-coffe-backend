import { MaxLength, maxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()

export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number
    @Column()
    @MaxLength(20)
    categoryName: string
    @Column()
    categoryImage: string
    @OneToMany(() => Product, (product) => product.category)
    products : Product[]
}
