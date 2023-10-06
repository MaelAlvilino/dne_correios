import { Controller, Post, UseGuards } from '@nestjs/common';
import { ParseDneService } from './parsedne.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('upload-txtBasic')
@ApiTags('Read basic files')
export class ParseDneController {
  constructor(private readonly parseDne: ParseDneService) {}

  @Post()
  @UseGuards()
  @ApiBearerAuth()
  async findZips(): Promise<void> {
    await this.parseDne.parser();
  }
}
