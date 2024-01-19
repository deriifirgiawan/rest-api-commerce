import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_role")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;
}
