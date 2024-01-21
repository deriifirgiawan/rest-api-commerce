import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "category_name", nullable: false })
  category_name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  product: Product[];
}
