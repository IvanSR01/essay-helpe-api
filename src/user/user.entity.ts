// user.entity.ts
import {
	Column,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column({
		default: 'user'
	})
	role: 'user' | 'admin-level-one' | 'admin-level-two'

	@Column()
	password: string

}
