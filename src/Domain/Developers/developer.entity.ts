import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export enum Sex {
  female = 'F',
  male = 'M'
}

@Entity('developers')
export class Developer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ type: 'enum', enum: Sex, nullable: false })
  sex: string

  @Column({ nullable: false, type: 'int', width: 99 })
  age: number

  @Column({ nullable: true })
  hobby: string

  @Column({
    nullable: false,
    type: 'date'
  })
  birthdate: Date

  @CreateDateColumn({
    name: 'created_at',
    select: false,
    type: 'timestamp with time zone'
  })
  createdAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    select: false,
    type: 'timestamp with time zone'
  })
  deletedAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    select: false,
    type: 'timestamp with time zone'
  })
  updatedAt: Date
}
