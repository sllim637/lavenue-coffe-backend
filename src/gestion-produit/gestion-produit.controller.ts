import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { GestionProduitService } from './gestion-produit.service';
import { Response } from "express";
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { User as UserFromReq } from '../user/decorator/user.decorator'
import { GetCategoryDTO } from './dto/get-category.dto';
import { UpdateResult } from 'typeorm';
import { ApiConsumes } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/createProduct.dto';
@Controller('productManagement')
export class GestionProduitController {
  constructor(private readonly gestionProduitService: GestionProduitService) { }


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

  @UseGuards(AuthGuard('jwt'))
  @Get("getAll")
  async getAllCategory(@UserFromReq() user: User): Promise<GetCategoryDTO[]> {
    console.log("the user catched from the request is :", user)
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
