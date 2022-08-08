import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChiefsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
