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
import { TopicService } from './topic.service'
import { Topic } from './topic.entity'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateTopicDto, DeleteTopicDto, UpdateTopicDto } from './dto/topic.dto'
@Controller('topic')
export class TopicController {
	constructor(private readonly topicService: TopicService) {}

	@Get('/')
	async findAll(): Promise<Topic[]> {
		return await this.topicService.findAll()
	}

	@Get('/by-id/:id')
	async findById(@Param('id') id: number): Promise<Topic> {
		return await this.topicService.findById(id)
	}

	@Get('/by-name/:name')
	async findByName(@Param('name') name: string): Promise<Topic> {
		return await this.topicService.findByName(name)
	}

	@Auth()
	@Post('/create')
	@UsePipes(new ValidationPipe())
	async createTopic(@Body() dto: CreateTopicDto): Promise<Topic> {
		return await this.topicService.createTopic(dto)
	}

	@Auth()
	@Put('/update')
	@UsePipes(new ValidationPipe())
	async updateTopic(@Body() dto: UpdateTopicDto): Promise<Topic> {
		return await this.topicService.updateTopic(dto)
	}

	@Auth()
	@Delete('/delete')
	@UsePipes(new ValidationPipe())
	async deleteTopic(@Body() dto: DeleteTopicDto): Promise<void> {
		return await this.topicService.deleteTopic(dto)
	}
}
