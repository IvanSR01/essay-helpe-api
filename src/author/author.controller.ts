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
import { AuthorService } from './author.service'
import {
	CreateAuthorDto,
	DeleteAuthorDto,
	UpdateAuthorDto
} from './dto/author.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Get('/')
	async findAll() {
		return await this.authorService.findAll()
	}

	@Get('/by-name/:name')
	async findByName(@Param('name') name: string) {
		return await this.authorService.findByName(name)
	}

	@Get('/by-id/:id')
	async findById(@Param('id') id: number) {
		return await this.authorService.findById(id)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Post('/create')
	async createAuthor(@Body() dto: CreateAuthorDto) {
		return await this.authorService.createAuthor(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Put('/update')
	async updateAuthor(@Body() dto: UpdateAuthorDto) {
		return await this.authorService.updateAuthor(dto)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Delete('/delete')
	async deleteAuthor(@Body() dto: DeleteAuthorDto) {
		return await this.authorService.deleteAuthor(dto)
	}
}
