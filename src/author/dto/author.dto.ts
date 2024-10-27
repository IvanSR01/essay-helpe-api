import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
export class CreateAuthorDto {
	@IsNotEmpty()
	@IsString()
	fullName: string
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
	@IsNotEmpty()
	@IsNumber()
	id: number
}

export class DeleteAuthorDto {
	@IsNotEmpty()
	@IsNumber()
	id: number
}