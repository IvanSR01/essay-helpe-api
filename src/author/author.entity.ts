// author.entity.ts
import { Work } from 'src/work/work.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		nullable: false,
		unique: true
	})
	fullName: string

	@OneToMany(() => Work, work => work.author)
	works: Work[]
}
