import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
export class CreateTopicDto {
	@IsNotEmpty()
	@IsString()
	name: string
}

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
	@IsNotEmpty()
	@IsNumber()
	id: number
}

export class DeleteTopicDto {
	@IsNotEmpty()
	@IsNumber()
	id: number
}