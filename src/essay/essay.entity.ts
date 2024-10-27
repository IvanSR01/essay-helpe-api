// essay.entity.ts
import { Topic } from 'src/topic/topic.entity'
import { Work } from 'src/work/work.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Essay {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	type: string

	@Column()
	text: string

	@ManyToOne(() => Topic, topic => topic.essays)
	topic: Topic

	@ManyToMany(() => Work, work => work.essays)
	@JoinTable()
	works: Work[]
}
