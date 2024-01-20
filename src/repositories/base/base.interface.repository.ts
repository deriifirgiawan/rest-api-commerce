import { IQuery } from "src/interfaces";
import { DeleteResult } from "typeorm";

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;
  findOneByCondition(filterCondition: any): Promise<T>;

  findOneByConditionWithRelations(
    filterCondition: any,
    relationsCondition: any,
  ): Promise<T>;

  findAllWithPagination(query: IQuery): Promise<T[]>;

  findAllWithCount(): Promise<[T[], number]>;

  remove(id: number): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;

  update(id: number, data: any): Promise<T>;
}
