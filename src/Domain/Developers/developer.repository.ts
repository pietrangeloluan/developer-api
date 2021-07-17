import {
  EntityRepository,
  FindConditions,
  Repository as _Repository
} from 'typeorm'

import { $errors, GetTypeORMCustomRepo, QueryUtil } from '@/Shared/Utils'
import { AppError } from '@/Shared/Protocols'

import { Developer } from './developer.entity'

type DeveloperQuery = FindConditions<Developer> | FindConditions<Developer>[]
// export type DeveloperPayload = Developer

export type DeveloperPayload = Omit<
  Developer,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>

interface DeveloperRepo extends _Repository<Developer> {}

@EntityRepository(Developer)
class TypeORMRepo extends _Repository<Developer> implements DeveloperRepo {}

export class Repository {
  private $getRepo: () => DeveloperRepo
  private $query: QueryUtil

  constructor({
    repo = GetTypeORMCustomRepo<DeveloperRepo>(TypeORMRepo),
    $Query = QueryUtil
  } = {}) {
    this.$getRepo = repo
    this.$query = new $Query(['name'])
  }

  public async find(
    query: Record<string, any> = {},
    { skip = 0, take = 10 } = {}
  ): Promise<{ developers: Developer[]; total: number }> {
    const where = this.$query.handle(query)
    const [found, total] = await this.$getRepo()
      .createQueryBuilder('developers')
      .where({ ...where })
      .skip(skip)
      .take(take)
      .getManyAndCount()

    if (found.length) return { developers: found as Developer[], total }

    throw new AppError($errors.notFound, { entity: 'developers', query })
  }

  // public async find(query: DeveloperQuery = {}): Promise<Developer[]> {
  //   console.log('query: ', query)

  //   const where = this.$query.handle(query)

  //   console.log('where: ', where)

  //   const found = await this.$getRepo().find({ where })
  //   if (found.length) return found

  //   throw new AppError($errors.notFound, { entity: 'user', query })
  // }

  public async findOne(query: DeveloperQuery) {
    const where = this.$query.handle(query)

    const found = await this.$getRepo().findOne({ where })
    if (found) return found

    throw new AppError($errors.notFound, { entity: 'user', query: where })
  }

  public async insertOne(payload: DeveloperPayload): Promise<Developer> {
    const repo = this.$getRepo()

    const created = repo.create(payload)
    await repo.save(created)

    return created
  }

  public async updateOne(payload: Partial<DeveloperPayload> & { id: string }) {
    const repo = this.$getRepo()
    const { id } = payload

    const found = await repo.findOne({ id })
    if (!found) throw new AppError($errors.notFound, { where: { id } })

    const updated = await repo.save(payload)

    return updated
  }

  public async removeOne(query: DeveloperQuery) {
    const repo = this.$getRepo()

    const found = await this.findOne(query)
    const updated = await repo.save({ ...found, deletedAt: new Date() })
    return updated
  }
}
