import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserData } from 'src/user/decorators/user.decorator'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { LoginUserDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}
	@UsePipes(new ValidationPipe())
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() createUserDto: CreateUserDto) {
		return await this.authService.registration(createUserDto)
	}
	
	@UsePipes(new ValidationPipe())
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginUserDto: LoginUserDto) {
		return await this.authService.login(loginUserDto)
	}



	@Auth()
	@Post('refresh-token')
	@HttpCode(HttpStatus.OK)
	async refreshToken(@Body() tokenUserDto: {
		refreshToken: string
	}) {
		return await this.authService.updateTokens(tokenUserDto.refreshToken)
	}
}
