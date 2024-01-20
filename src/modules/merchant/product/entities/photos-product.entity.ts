import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("photos_product")
export class PhotoProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "image_url", nullable: false })
  image_url: string;

  @OneToMany(() => Product, (product) => product.images)
  product: Product;
}
