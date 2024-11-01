import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Put,
	Query
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { TypeUserData } from 'src/types/user.types'
import { UserData } from './decorators/user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(`/by-id/:id`)
	@Auth()
	async findOneById(@Param('id') id: number) {
		return await this.userService.findOneById(id)
	}

	@Get('info-profile')
	@Auth()
	async profile(@UserData('id') id: number) {
		return await this.userService.findOneById(id)
	}

	@Put('update-profile')
	@Auth()
	async updateProfile(@UserData('id') id: number, @Body() dto: TypeUserData) {
		return await this.userService.updateUser(id, dto)
	}

	@Delete('delete-profile')
	@Auth()
	async deleteProfile(@UserData('id') id: number) {
		return await this.userService.deleteUser(id)
	}
}
