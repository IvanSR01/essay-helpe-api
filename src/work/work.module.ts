import { Module } from '@nestjs/common'
import { WorkService } from './work.service'
import { WorkController } from './work.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Work } from './work.entity'
import { AuthorModule } from 'src/author/author.module'

@Module({
	imports: [TypeOrmModule.forFeature([Work]), AuthorModule],
	providers: [WorkService],
	controllers: [WorkController],
	exports: [WorkService]
})
export class WorkModule {}
