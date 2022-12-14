import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserFromReq } from 'src/user/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateHistoriqueDTO } from './dto/create-historique.dto';
import { GestionHistoriqueService } from './gestion-historique.service';

@Controller('gestionHistorique')
export class GestionHistoriqueController {
  constructor(private readonly gestionHistoriqueService: GestionHistoriqueService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post("ajouterHistorique")
  async addHistorique(@Body() createHistorique: CreateHistoriqueDTO,
    @UserFromReq() user: User) {
    this.gestionHistoriqueService.add_update_History(createHistorique, user)
  }
  @Get("getHistoriqueByDates/:dateOfStart/:DateOfEnd")
  async getByDates(@Param("dateOfStart") dateOfStart: Date, @Param("DateOfEnd") dateOfEnd: Date) {
    this.gestionHistoriqueService.getHistoriqueByDates(dateOfStart, dateOfEnd)
  }
}
