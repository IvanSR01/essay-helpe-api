// topic.entity.ts
import { Essay } from 'src/essay/essay.entity'
import { Work } from 'src/work/work.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Topic {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		nullable: false,
		unique: true
	})
	name: string

	@ManyToMany(() => Work, work => work.topics)
	works: Work[]

	@OneToMany(() => Essay, essay => essay.topic)
	essays: Essay[]
}
