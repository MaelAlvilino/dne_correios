import { Module } from '@nestjs/common';
import { FindCepService } from './findcep.service';
import { PrismaModule } from '../../db/prisma/prisma.module';
import { FindCepController } from './findcep.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FindCepController],
  providers: [FindCepService],
  exports: [FindCepService],
})
export class findCepModule {}
