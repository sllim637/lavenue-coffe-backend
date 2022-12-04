import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { getEventListeners } from 'events';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateResult } from 'typeorm';
import { CreateProductDTO } from './dto/createProduct.dto';
import { GetCategoryDTO } from './dto/get-category.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { GestionProduitService } from './gestion-produit.service';
import { Response } from "express";
@Controller('productManagement')
export class GestionProduitController {
  constructor(private readonly gestionProduitService: GestionProduitService

  ) { }


  @UseInterceptors(
    FileInterceptor('image',
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname);
            const fileName = `${file.originalname}-${uniqueSuffix}${ext}`
            callback(null, fileName)
          }
        })
      }
    ))

  @Post("/createCategory")
  async create(
    @Body() createCategoryDto: any,
    @UploadedFile() image
  ): Promise<Category> {
    return this.gestionProduitService.createCategory(createCategoryDto, image)
  }

  @Get("getAll")
  async getAllCategory(): Promise<GetCategoryDTO[]> {
    return this.gestionProduitService.getAllCategory()
  }

  @Get("getOneCategory/:id")
  async getOneCategoryById(@Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.gestionProduitService.getCategoryById(id)
  }

  @Get("getOneImage/:filePath")
  async getImage(@Res() res: Response, @Param('filePath') path: string) {
    res.sendFile(path, { root: "files" })
  }

  @Delete(':id')
  async deleteCategory(@Param('id', new ParseIntPipe()) id: number) {
    this.gestionProduitService.deleteCategory(id)
  }
  @UseInterceptors(
    FileInterceptor('image',
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname);
            const fileName = `${file.originalname}-${uniqueSuffix}${ext}`
            callback(null, fileName)
          }
        })
      }
    ))

  @Put("updateCategory/:id")
  async updateCategory(
    @Param('id') id: number,
    @Body() createCategoryDto: any,
    @UploadedFile() image
  ): Promise<UpdateResult> {
    return this.gestionProduitService.updateCategory(id, createCategoryDto, image)
  }
  /*******************************************************************************************/
  @UseInterceptors(
    FileInterceptor('image',
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname);
            const fileName = `${file.originalname}-${uniqueSuffix}${ext}`
            callback(null, fileName)
          }
        })
      }
    ))

  @Post("/createProduct")
  @ApiConsumes('multipart/form-data')
  async createProduct(
    @Body() createProductDTO: CreateProductDTO,
    @UploadedFile() image
  ): Promise<Product> {
    return this.gestionProduitService.createProduct(createProductDTO, image)
  }

  @Get("getProductsByCategory/:categoryId")
  async getProductsByCategory(@Param('categoryId', new ParseIntPipe()) id: number): Promise<Product[]> {
    return this.gestionProduitService.getProductsByCategory(id);
  }
  @UseInterceptors(
    FileInterceptor('image',
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname);
            const fileName = `${file.originalname}-${uniqueSuffix}${ext}`
            callback(null, fileName)
          }
        })
      }
    ))
  @Put("updateProduct/:id")
  async updateProduct(
    @Param('id') id: number,
    @Body() createProductDTO: any,
    @UploadedFile() image
  ): Promise<UpdateResult> {
    return this.gestionProduitService.updateProduct(id, createProductDTO, image)
  }


}
