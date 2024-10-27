import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
export class CreateEssayDto {
	@IsNotEmpty()
	@IsString()
	text: string

	@IsNotEmpty()
	@IsString()
	type: string

	@IsNotEmpty()
	@IsArray()
	works: number[]

	@IsNotEmpty()
	@IsNumber()
	topicId: number
}

export class UpdateEssayDto extends PartialType(CreateEssayDto) {
	@IsNotEmpty()
	@IsNumber()
	id: number
}

export class DeleteEssayDto {
	@IsNotEmpty()
	@IsNumber()
	id: number
}
