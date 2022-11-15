import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetCategoryDTO } from './dto/get-category.dto';
import { Category } from './entities/category.entity';
import { GestionProduitService } from './gestion-produit.service';

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
  async getAll(): Promise<GetCategoryDTO[]> {
    return this.gestionProduitService.getAllCategory()
  }
  @Delete(':id')
  async deleteCategory(@Param('id', new ParseIntPipe()) id: number) {
    this.gestionProduitService.deleteCategory(id)
  }
}
