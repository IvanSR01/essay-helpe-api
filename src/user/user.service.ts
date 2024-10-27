import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from './user.entity'
@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) {}
	async findOneById(id: number): Promise<User> {
		return this.userRepository.findOne({
			where: { id }
		})
	}
	async findOneByEmail(email: string) {
		return await this.userRepository.findOneBy({ email })
	}

	async createUser(dto: Partial<User>) {
		const user = await this.findOneByEmail(dto.email)
		if (!user) {
			return await this.userRepository.save(dto)
		}
		return new ConflictException('Email is already in use')
	}
	async updateUser(id: number, dto: Partial<User>) {
		const user = await this.userRepository.findOne({
			where: { id }
		})

		if (dto.password) {
			dto.password = await bcrypt.hash(dto.password, await bcrypt.genSalt(10))
		}

		const update = {
			...dto,
			password: user.password
		}

		return await this.userRepository.save({ ...update })
	}

	async deleteUser(id: number) {
		return await this.userRepository.delete({ id: id })
	}
}
