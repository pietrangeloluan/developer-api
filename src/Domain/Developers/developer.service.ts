import { AppError, Pagination } from '@/Shared/Protocols'

import { $errors } from '@/Shared/Utils'
import { QueryBuilder } from '@/Shared/Services/queryBuilder.service'

import { Developer as Entity } from './developer.entity'
import { Validator } from './developer.validator'
import { Repository, DeveloperPayload } from './developer.repository'

export class Service {
  private $repo: Repository
  private $validator: Validator
  private $queryBuilder: QueryBuilder

  constructor({
    $Validator = Validator,
    $Repository = Repository,
    $QueryBuilder = QueryBuilder
  } = {}) {
    this.$repo = new $Repository()
    this.$validator = new $Validator()
    this.$queryBuilder = new $QueryBuilder([
      'name',
      'sex',
      'age',
      'hobby',
      'birthday'
    ])
  }

  public async find(
    req
  ): Promise<{ developers: Entity[]; pagination: Pagination }> {
    const [
      where,
      { pagination, options },
      error
    ] = await this.$queryBuilder.build(req)
    if (error) {
      Object.assign(req, { error })
      throw new AppError($errors.validationFails)
    }

    const { developers, total } = await this.$repo.find(where, options)
    if (!developers.length) throw new AppError($errors.notFound)

    return {
      developers,
      pagination: {
        ...pagination,
        total: Math.ceil(total / pagination.perPage)
      }
    }
  }

  public async findOne(req): Promise<Entity> {
    const { id } = req.params
    const query = { id }

    const found = await this.$repo.findOne(query)
    return found
  }

  public async insertOne(req): Promise<Entity> {
    const { payload, validationErrors } = await this.$validator.validateBody<
      DeveloperPayload
    >(req)
    if (!payload) throw validationErrors

    const created = await this.$repo.insertOne(payload)
    return created
  }

  public async updateOne(req): Promise<Entity> {
    const [
      { payload: params, validationErrors: paramsValidationErrors },
      { payload, validationErrors: bodyValidationErrors }
    ] = await Promise.all([
      this.$validator.validateParams<{
        id: string
      }>(req),
      this.$validator.validateBody<DeveloperPayload>(req)
    ])
    if (!params) throw paramsValidationErrors
    if (!payload) throw bodyValidationErrors

    const { id } = req.params

    const updated = await this.$repo.updateOne({ ...payload, id })
    return updated
  }

  public async removeOne(req): Promise<string> {
    const {
      payload: params,
      validationErrors
    } = await this.$validator.validateParams<{ id: string }>(req)
    if (!params) throw validationErrors

    await this.$repo.removeOne(params)
    return params.id
  }
}
