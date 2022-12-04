import { ConflictException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { json } from 'stream/consumers';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CreateProductDTO } from './dto/createProduct.dto';
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
    async getCategoryById(id: number): Promise<Category> {
        let category = await this.categoryRepository.findOne({ where: { categoryId: id } })
        if (!category) {
            new NotFoundException("the category with this id does not exist")
        }else{
            return category
        }
    }
    async updateCategory(id: number, createCategoryDto: any, imageUploaded): Promise<UpdateResult> {
        let newCreateCategoryDTO: CreateCategoryDTO = new CreateCategoryDTO()
        newCreateCategoryDTO.categoryName = createCategoryDto.product
        newCreateCategoryDTO.categoryImage = imageUploaded.filename
        const newCategory = this.categoryRepository.create({ ...newCreateCategoryDTO })
        return await this.categoryRepository.update(id, newCategory)
    }

    /******************************************************************************/

    async createProduct(createProductDTO: CreateProductDTO, imageUploaded): Promise<Product> {

        const newProduct: CreateProductDTO = new CreateProductDTO()
        newProduct.productName = createProductDTO.productName
        newProduct.productPrice = createProductDTO.productPrice
        newProduct.productImage = imageUploaded.filename
        newProduct.devise = createProductDTO.devise
        let category = await this.categoryRepository.findOne({ where: { categoryId: createProductDTO.categoryId } })
        let product = new Product()
        product = await this.productRepository.create({ ...newProduct })
        if (category) {
            product.category = category
        } else {
            throw new NotFoundException("the category of the product does not exist !")
        }

        try {
            this.productRepository.save(product);
        } catch (e) {
            throw new ConflictException("probleme lors de l'insertion du produit", e)
        }
        return await product;
    }

    async getProductsByCategory(categoryId : number): Promise<Product[]> {
        let products :Promise<Product[]>
        let category = await this.categoryRepository.findOne({where : {categoryId : categoryId}})
        if(category){
            products = this.productRepository.find({where : {category  : category}})
        }else{
            throw new NotFoundException("the category with this id does not exist !")
        }
        return  await products
    }
    async updateProduct(id: number, createProductDTO: any, imageUploaded): Promise<UpdateResult> {
        let newCreateProductDTO : CreateProductDTO = JSON.parse(createProductDTO.product)
        console.log(imageUploaded)
        if(imageUploaded){
            console.log("I am here !")
            newCreateProductDTO.productImage = imageUploaded.filename
            console.log("after putting the image :" , newCreateProductDTO)
        }
        const updateProduct : Product = await this.productRepository.create({...newCreateProductDTO })
        console.log(updateProduct)
        return this.productRepository.update(id,updateProduct)
    }
}
