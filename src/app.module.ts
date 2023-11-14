import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsController } from './clients/clients.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientsController],
  providers: [AppService],
})
export class AppModule {}
