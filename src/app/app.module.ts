import {
   type MiddlewareConsumer,
   Module } from '@nestjs/common';
import { ParseDneModule } from './modules/readfiles/parsedne.module';
import {  findCepModule } from './modules/endereco/findcep.module';
import { JWTAuthCorreios } from './security/jwt.middleware';

@Module({
  imports: [ParseDneModule,  findCepModule], 

})
export class AppModule {
  configure(
    consumer: MiddlewareConsumer
    ): void {
    consumer.apply(JWTAuthCorreios).forRoutes('*');
  }
}
