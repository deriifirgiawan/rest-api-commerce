import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PhotoProduct } from "./photos-product.entity";
import { Categories } from "./categories.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false, type: "varchar", length: 255 })
  name: string;

  @Column({
    name: "description",
    nullable: false,
    type: "varchar",
    length: 255,
  })
  description: string;

  @Column({ name: "price", nullable: false, type: "varchar", length: 255 })
  price: string;

  @Column({ name: "quantity", nullable: true })
  quantity: number;

  @Column({ name: "is_active", nullable: true, default: true, type: "boolean" })
  is_active?: boolean;

  @Column({ name: "user_id", nullable: false, type: "uuid" })
  user_id: string;

  @ManyToMany(() => PhotoProduct, { cascade: true, eager: true })
  @JoinTable()
  images: PhotoProduct[];

  @ManyToMany(() => Categories, (category) => category.product, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: "products_categories",
    joinColumn: {
      name: "products_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "categories_id",
      referencedColumnName: "id",
    },
  })
  categories: Categories[];

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", name: "deleted_at", nullable: true })
  deleted_at: Date;
}
