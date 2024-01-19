import { IQuery } from "src/interfaces";
import { BaseInterfaceRepository } from "./base.interface.repository";
import { Repository, UpdateResult } from "typeorm";

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(data: T | any): Promise<T> {
    return await this.entity.save(data);
  }

  public async findOneByCondition(filterCondition: any): Promise<T> {
    return await this.entity.findOne({ where: filterCondition });
  }

  public async findOneByConditionWithRelations(
    filterCondition: any,
    relationsCondition: any,
  ): Promise<T> {
    return await this.entity.findOne({
      where: filterCondition,
      relations: relationsCondition,
    });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAllWithPagination(query: IQuery): Promise<T[]> {
    return await this.entity.find({
      skip: (query.page - 1) * query.limit || 0,
      take: query.limit || 10,
    });
  }

  public async findAllWithCount(): Promise<[T[], number]> {
    return await this.entity.findAndCount();
  }

  public async update(id: number, data: any): Promise<T> {
    const result = await this.entity
      .createQueryBuilder()
      .update(data)
      .where({ id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  public async remove(id: number): Promise<UpdateResult> {
    return await this.entity.softDelete(id);
  }
}
