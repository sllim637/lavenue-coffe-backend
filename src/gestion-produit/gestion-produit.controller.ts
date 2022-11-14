import { Body, Controller, Get, Post, Req, Res, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { GestionProduitService } from './gestion-produit.service';

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
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'files/coffe.png-1668454444023-58537080.png'));
    return new StreamableFile(file);
  }

}
