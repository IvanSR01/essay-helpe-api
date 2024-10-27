import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
export class CreateWorkDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsArray()
	genres: string[]

	@IsNotEmpty()
	@IsNumber()
	authorId: number
}

export class UpdateWorkDto extends PartialType(CreateWorkDto) {
	@IsNotEmpty()
	@IsNumber()
	id: number
}

export class DeleteWorkDto {
	@IsNotEmpty()
	@IsNumber()
	id: number
}
