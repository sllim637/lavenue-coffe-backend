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


    async createCategory(createCategoryDto: any,imageUploaded): Promise<Category> {
        let newCreateCategoryDTO : CreateCategoryDTO = new CreateCategoryDTO()
        newCreateCategoryDTO.categoryName = createCategoryDto.product
        newCreateCategoryDTO.categoryImage = imageUploaded.filename
        console.log("the dto is :" , newCreateCategoryDTO)
        const newCategory = this.categoryRepository.create({ ...newCreateCategoryDTO })
        console.log("the final object is :" ,newCategory )
        /*if (!newCategory.categoryImage) {
            console.log("the image is not uploaded");  
        }*/
        try {
            
            this.categoryRepository.save(newCategory);
        } catch (e) {
            throw new ConflictException("probleme lors de l'insertion du category", e)
        }
        return await newCategory;
    }
}
