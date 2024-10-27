import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	UsePipes,
	Put,
	Delete,
	Query
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { EssayService } from './essay.service'
import { Essay } from './essay.entity'
import { CreateEssayDto, DeleteEssayDto, UpdateEssayDto } from './dto/essay.dto'
@Controller('essay')
export class EssayController {
	constructor(private readonly essayService: EssayService) {}

	@Get()
	async findAll(
		@Query('search') search: string,
		@Query('type') type: string,
		@Query('author') author: string,
		@Query('work') work: string
	): Promise<Essay[]> {
		return await this.essayService.findAll(author, work, type, search)
	}

	@Get('/by-id/:id')
	async findById(@Param('id') id: number): Promise<Essay> {
		return await this.essayService.findById(id)
	}

	@Auth()
	@Post('/create')
	@UsePipes(new ValidationPipe())
	async createEssay(@Body() dto: CreateEssayDto): Promise<Essay> {
		return await this.essayService.createEssay(dto)
	}

	@Auth()
	@Put('/update')
	@UsePipes(new ValidationPipe())
	async updateEssay(@Body() dto: UpdateEssayDto): Promise<Essay> {
		return await this.essayService.updateEssay(dto)
	}

	@Auth()
	@Delete('/delete')
	@UsePipes(new ValidationPipe())
	async deleteEssay(@Body() dto: DeleteEssayDto): Promise<void> {
		return await this.essayService.deleteEssay(dto)
	}
}
