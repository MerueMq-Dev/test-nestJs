import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';

@Module({
  controllers: [TopPageController],
  imports: [TypegooseModule.forFeature([{
    typegooseClass: TopPageModel,
    schemaOptions: {
      collection: 'TopPage'
    }
  }])]
})
export class TopPageModule {}
