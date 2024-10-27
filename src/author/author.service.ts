import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Author } from './author.entity'
import {
	CreateAuthorDto,
	DeleteAuthorDto,
	UpdateAuthorDto
} from './dto/author.dto'

@Injectable()
export class AuthorService {
	constructor(
		@InjectRepository(Author)
		private readonly authorRepository: Repository<Author>
	) {}

	async findByName(name: string) {
		return this.authorRepository.findOne({
			where: { fullName: name }
		})
	}

	async findById(id: number) {
		const author = await this.authorRepository.findOne({ where: { id } })

		if (author) return author

		throw new NotFoundException('Author not found')
	}

	async findAll() {
		return this.authorRepository.find()
	}

	async createAuthor(dto: CreateAuthorDto) {
		const oldAuthor = await this.findByName(dto.fullName)
		if (!oldAuthor) {
			const author = this.authorRepository.create(dto)
			return this.authorRepository.save(author)
		}
		throw new ConflictException('Author with this name already exists')
	}

	async updateAuthor(dto: UpdateAuthorDto) {
		const author = await this.findById(dto.id)

		if (author) {
			return this.authorRepository.save({ ...author, ...dto })
		}
		throw new NotFoundException('Author not found')
	}

	async deleteAuthor({ id }: DeleteAuthorDto) {
		const author = await this.findById(id)

		if (author) {
			return this.authorRepository.delete({ id })
		}
		throw new NotFoundException('Author not found')
	}
}
