import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class GestionProduitService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {
    }


    async createCategory(createCategoryDto: CreateCategoryDTO): Promise<Category> {
        const newCategory = this.categoryRepository.create({ ...createCategoryDto })
        if (!newCategory.categoryImage) {
            console.log("pas d'image pour ce produit !")
        }
        try {
            this.categoryRepository.save(newCategory);
        } catch (e) {
            throw new ConflictException("probleme lors de l'insertion du category", e)
        }
        return await newCategory;
    }
}
