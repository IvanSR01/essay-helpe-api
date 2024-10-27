import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Essay } from './essay.entity'
import { Repository } from 'typeorm'
import { WorkService } from 'src/work/work.service'
import { TopicService } from 'src/topic/topic.service'
import { CreateEssayDto, DeleteEssayDto, UpdateEssayDto } from './dto/essay.dto'

@Injectable()
export class EssayService {
	constructor(
		@InjectRepository(Essay)
		private readonly essayRepository: Repository<Essay>,
		private readonly workService: WorkService,
		private readonly topicService: TopicService
	) {}

	async findAll(
		authorName?: string,
		workName?: string,
		type?: string,
		search?: string
	): Promise<Essay[]> {
		const essays = await this.essayRepository.find({
			where: {
				works: { title: workName, author: { fullName: authorName } },
				type: type
			},
			relations: ['topic', 'works', 'works.author']
		})
		const filted = essays.filter(essay => {
			if (!search) return true

			return essay.text.toLowerCase().includes(search?.toLowerCase())
		})

		return filted
	}

	async findById(id: number): Promise<Essay> {
		return await this.essayRepository.findOne({
			where: {
				id
			}, relations: ['topic', 'works', 'works.author']
		})
	}

	async createEssay(dto: CreateEssayDto): Promise<Essay> {
		const topic = await this.topicService.findById(dto.topicId)

		if (!topic) throw new NotFoundException('Topic not found')

		const works = await Promise.all(
			dto.works.map(async workId => {
				return await this.workService.findById(workId)
			})
		)

		return await this.essayRepository.save({ ...dto, topic, works })
	}

	async updateEssay(dto: UpdateEssayDto): Promise<Essay> {
		const essay = await this.findById(dto.id)

		if (!essay) throw new NotFoundException('Essay not found')

		const topic = await this.topicService.findById(dto.topicId)

		if (!topic) throw new NotFoundException('Topic not found')

		let works = []

		dto.works.forEach(workId => {
			works.push(this.workService.findById(workId))
		})

		return await this.essayRepository.save({ ...dto, topic, works })
	}

	async deleteEssay(dto: DeleteEssayDto): Promise<void> {
		await this.essayRepository.delete(dto.id)
	}
}
