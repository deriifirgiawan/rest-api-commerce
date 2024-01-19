import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ name: "firstname", nullable: false })
  firstname: string;

  @Column({ name: "lastname", nullable: true })
  lastname: string;

  @Column({ name: "email", nullable: false, unique: true })
  email: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({ name: "role_id", nullable: false })
  role_id: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updated_at: Date;

  @CreateDateColumn({ type: "timestamp", name: "deleted_at", nullable: true })
  deleted_at: Date;
}
