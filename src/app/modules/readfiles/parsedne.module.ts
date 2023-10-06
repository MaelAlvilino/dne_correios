import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ParseDneController } from './parsedne.controller';
import { ParseDneService } from './parsedne.service';
import { PrismaModule } from '../../db/prisma/prisma.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  providers: [ParseDneService],
  controllers: [ParseDneController],
  exports: [ParseDneService],
})
export class ParseDneModule {}
