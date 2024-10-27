// work.entity.ts
import { Author } from 'src/author/author.entity'
import { Essay } from 'src/essay/essay.entity'
import { Topic } from 'src/topic/topic.entity'
import {
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Work {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		nullable: false,
		unique: true
	})
	title: string

	@Column({
		type: 'text',
		array: true
	})
	genres: string[]

	@ManyToMany(() => Topic, topic => topic.works)
	topics: Topic[]

	@ManyToMany(() => Essay, essay => essay.works)
	essays: Essay[]

	@ManyToOne(() => Author, author => author.works)
	author: Author
}
