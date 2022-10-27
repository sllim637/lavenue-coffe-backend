import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { GestionProduitService } from './gestion-produit.service';

@Controller('productManagement')
export class GestionProduitController {
  constructor(private readonly gestionProduitService: GestionProduitService) {}

  @Post("/createCategory")
  async create(@Body() createCategoryDto: CreateCategoryDTO): Promise<Category> {
    return  this.gestionProduitService.createCategory(createCategoryDto)
  }

}
