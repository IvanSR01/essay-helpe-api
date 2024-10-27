import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AuthResponse, TypeLoginUser } from 'src/types/auth.types'
import { TypeUserData } from 'src/types/user.types'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserService } from 'src/user/user.service'
import { CloseSessionDto, LoginUserDto } from './dto/auth.dto'

const codes = {}

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async login(dto: LoginUserDto): Promise<AuthResponse> {
		const user = await this.validateUserCredentials(dto.email, dto.password)

		return {
			tokens: await this.generateTokens(user)
		}
	}

	async registration(dto: CreateUserDto): Promise<AuthResponse> {
		const oldUser = await this.userService.findOneByEmail(dto.email)
		if (oldUser)
			throw new ConflictException('Email or username is already in use')

		const hashedPassword = await this.hashPassword(dto.password)
		const newUser = await this.userService.createUser({
			...dto,
			password: hashedPassword
		})

		return {
			tokens: await this.generateTokens(newUser as TypeUserData)
		}
	}

	async updateTokens(refreshToken: string): Promise<TypeLoginUser> {
		const payload = this.jwtService.decode(refreshToken) as any
		const user = await this.userService.findOneById(payload.sub)
		if (!user) throw new UnauthorizedException('Invalid token')

		return this.generateTokens(user)
	}

	async validateUserCredentials(
		email: string,
		password: string
	): Promise<TypeUserData> {
		const user = await this.userService.findOneByEmail(email)
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException('Invalid email or password')
		}
		return user
	}

	async generateTokens(user: TypeUserData): Promise<TypeLoginUser> {
		const payload = { sub: user.id }
		return {
			accessToken: this.jwtService.sign(payload, { expiresIn: '1y' }),
			refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' })
		}
	}

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10)
		return bcrypt.hash(password, salt)
	}

}
