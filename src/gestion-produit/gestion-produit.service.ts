import { ConflictException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { GetCategoryDTO } from './dto/get-category.dto';
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


    async createCategory(createCategoryDto: any, imageUploaded): Promise<Category> {
        let newCreateCategoryDTO: CreateCategoryDTO = new CreateCategoryDTO()
        newCreateCategoryDTO.categoryName = createCategoryDto.product
        newCreateCategoryDTO.categoryImage = imageUploaded.filename
        const newCategory = this.categoryRepository.create({ ...newCreateCategoryDTO })
        try {
            this.categoryRepository.save(newCategory);
        } catch (e) {
            throw new ConflictException("probleme lors de l'insertion du category", e)
        }
        return await newCategory;
    }

    async getAllCategory(): Promise<GetCategoryDTO[]> {
        let allCategoryToSend: GetCategoryDTO[] = []
        let allCategory = await this.categoryRepository.find()

        for (let i = 0; i < allCategory.length; i++) {
            let newGetCategoryDTO = new GetCategoryDTO(
                allCategory[i].categoryId,
                allCategory[i].categoryName
            )
            const file = createReadStream(join(process.cwd(), 'files/' + allCategory[i].categoryImage));
            newGetCategoryDTO.categoryImage = await new StreamableFile(file)
            allCategoryToSend.push(newGetCategoryDTO)
        }

        return allCategoryToSend
    }
    async deleteCategory(id: number) {
        let categoryExisted = await this.categoryRepository.find({ where: { categoryId: id } })
        if (categoryExisted.length == 0) {
            throw new NotFoundException("the category with this id is not found !")
        } else {
            this.categoryRepository.delete(id)
        }
    }
    async getCategoryById(id: number): Promise<GetCategoryDTO> {
        let category = await this.categoryRepository.findOne({ where: { categoryId: id } })
        if (!category) {
            new NotFoundException("the category with this id does not exist")
        } else {
            let getCategoryDTO = new GetCategoryDTO(category.categoryId, category.categoryName)
            const file = createReadStream(join(process.cwd(), 'files/' + category.categoryImage))
            getCategoryDTO.categoryImage = await new StreamableFile(file)
            return getCategoryDTO
        }
    }
    async updateCategory(id: number, createCategoryDto: any, imageUploaded): Promise<UpdateResult> {
        let newCreateCategoryDTO: CreateCategoryDTO = new CreateCategoryDTO()
        newCreateCategoryDTO.categoryName = createCategoryDto.product
        newCreateCategoryDTO.categoryImage = imageUploaded.filename
        const newCategory = this.categoryRepository.create({ ...newCreateCategoryDTO })
        return await this.categoryRepository.update(id, newCategory)
    }

}
