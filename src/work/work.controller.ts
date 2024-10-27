import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	UsePipes,
	Put,
	Delete
} from '@nestjs/common'
import { WorkService } from './work.service'
import { Work } from './work.entity'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateWorkDto, DeleteWorkDto, UpdateWorkDto } from './dto/work.dto'

@Controller('work')
export class WorkController {
	constructor(private readonly workService: WorkService) {}

	@Get('/')
	async findAll(): Promise<Work[]> {
		return await this.workService.findAll()
	}

	@Get('/by-id/:id')
	async findById(@Param('id') id: number): Promise<Work> {
		return await this.workService.findById(id)
	}

	@Get('/by-name/:name')
	async findByName(@Param('name') name: string): Promise<Work> {
		return await this.workService.findByName(name)
	}

	@Get('/genres')
	async findGenres(): Promise<string[]> {
		return await this.workService.findGenres()
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Post('/create')
	async createWork(@Body() dto: CreateWorkDto): Promise<Work> {
		return await this.workService.createWork(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Put('/update')
	async updateWork(@Body() dto: UpdateWorkDto): Promise<Work> {
		return await this.workService.updateWork(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Delete('/delete')
	async deleteWork(@Body() dto: DeleteWorkDto): Promise<void> {
		return await this.workService.deleteWork(dto)
	}
}
