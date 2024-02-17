import { IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { StudyRecord } from './study-record.entity';

@Entity()
export class StudyCategory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  study_category_id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  subject: string;

  @Column({ type: 'varchar', length: 7, default: '#000000' })
  @IsString()
  color: string;

  @ManyToOne(() => Member, (member) => member.study_categories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @OneToMany(() => StudyRecord, (studyRecord) => studyRecord.study_category)
  study_records: StudyRecord[];

  @DeleteDateColumn()
  deleted_at!: Date | null;
}