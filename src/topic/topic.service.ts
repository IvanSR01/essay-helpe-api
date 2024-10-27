import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Topic } from './topic.entity'
import { Repository } from 'typeorm'
import { CreateTopicDto, DeleteTopicDto, UpdateTopicDto } from './dto/topic.dto'

@Injectable()
export class TopicService {
	constructor(
		@InjectRepository(Topic) private readonly topicRepository: Repository<Topic>
	) {}

	async findAll(): Promise<Topic[]> {
		return await this.topicRepository.find()
	}

	async findById(id: number): Promise<Topic> {
		return await this.topicRepository.findOneBy({ id })
	}

	async findByName(name: string): Promise<Topic> {
		return await this.topicRepository.findOneBy({ name })
	}

	async createTopic(dto: CreateTopicDto): Promise<Topic> {
		return await this.topicRepository.save(dto)
	}

	async updateTopic(dto: UpdateTopicDto): Promise<Topic> {
		const topic = await this.findById(dto.id)

		if (!topic) throw new NotFoundException('Topic not found')

		return await this.topicRepository.save({ ...topic, ...dto })
	}

	async deleteTopic(dto: DeleteTopicDto): Promise<void> {
		await this.topicRepository.delete(dto.id)
	}
}
