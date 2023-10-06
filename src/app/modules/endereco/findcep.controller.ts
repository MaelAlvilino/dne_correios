import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindCepService } from './findcep.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { type cepReturn } from '../../types/cep-types';
import { cep } from './dto/cep.dto';

@Controller('cep')
@ApiTags('PostalCode')
export class FindCepController {
  constructor(private readonly findCep: FindCepService) {}

  @UseGuards()
  @ApiBearerAuth()
  @Get(':postalCode')
  async findCeps(
    @Param() postalCode: cep,
  ): Promise<{ publicAreaReturn: cepReturn }> {
    return await this.findCep.findCep(postalCode.postalCode);
  }
}
