import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Work } from './work.entity'
import { Repository } from 'typeorm'
import { AuthorService } from 'src/author/author.service'
import { CreateWorkDto, DeleteWorkDto, UpdateWorkDto } from './dto/work.dto'

@Injectable()
export class WorkService {
	constructor(
		@InjectRepository(Work) private readonly workRepository: Repository<Work>,
		private readonly authorService: AuthorService
	) {}

	async findAll(): Promise<Work[]> {
		return await this.workRepository.find()
	}

	async findById(id: number): Promise<Work> {
		return await this.workRepository.findOne({ where: { id } })
	}

	async findByName(name: string): Promise<Work> {
		return await this.workRepository.findOne({ where: { title: name } })
	}

	async findGenres(): Promise<string[]> {
		const works = await this.workRepository.find()

		const genres = works[0].genres

		for (let i = 1; i < works.length; i++) {
			const item = works[i].genres
			item.forEach(genre => {
				if (!genres.includes(genre)) genres.push(genre)
			})
		}

		return genres
	}

	async createWork(dto: CreateWorkDto): Promise<Work> {
		console.log(dto)
		const author = await this.authorService.findById(dto.authorId)
		const work = this.workRepository.create({
			...dto,
			author
		})
		return await this.workRepository.save(work)
	}

	async updateWork(dto: UpdateWorkDto): Promise<Work> {
		const work = await this.findById(dto.id)

		if (!work) throw new NotFoundException('Work not found')

		const author = await this.authorService.findById(dto.authorId)
		return await this.workRepository.save({ ...work, ...dto, author })
	}

	async deleteWork(dto: DeleteWorkDto): Promise<void> {
		await this.workRepository.delete(dto.id)
	}
}
