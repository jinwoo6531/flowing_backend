import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'thumbnail' })
export class Thumbnail extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'thumbnail_id' })
  id: number;

  @Column('varchar', { name: 'thumbnail_image' })
  thumbnail_image: string;
}
