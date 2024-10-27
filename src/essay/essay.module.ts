import { Module } from '@nestjs/common';
import { EssayController } from './essay.controller';
import { EssayService } from './essay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Essay } from './essay.entity';
import { TopicModule } from 'src/topic/topic.module';
import { WorkModule } from 'src/work/work.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Essay]),
		TopicModule,
		WorkModule
	],
  controllers: [EssayController],
  providers: [EssayService]
})
export class EssayModule {}
