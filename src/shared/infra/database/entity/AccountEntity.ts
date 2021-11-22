import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class AccountEntity {
  @PrimaryColumn()
  code: number = 0;

  @Column({
    length: 11,
    unique: true
  })
  cpf: string = '';

  @Column({
    length: 11,
    nullable: true
  })
  phone: string = '';

  @Column({
    length: 100
  })
  name: string = '';

  @Column({
    length: 200,
    nullable: true
  })
  adress: string = '';

  @Column()
  createdAt: Date = new Date();

  @Column({
    nullable: true
  })
  disabledAt: Date = new Date();
}