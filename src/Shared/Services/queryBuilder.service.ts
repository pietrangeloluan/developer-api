import { Request } from 'express'
import { fromPairs, isEmpty, omit, omitBy } from 'lodash'
import { ILike } from 'typeorm'
import * as yup from 'yup'

type PaginationQuery = { page: number; perPage: number }

type Pagination = {
  options: { skip: number; take: number }
  pagination: PaginationQuery
}

const _MAPPED_VALUES = { false: false, null: null, true: true }

export class QueryBuilder {
  private caster = yup.object().shape({
    page: yup.number().default(1),
    perPage: yup.number().default(10)
  })

  private paginationKeys = ['page', 'perPage']

  private mountPaginationOptions({ page, perPage }) {
    return { skip: (page - 1) * perPage, take: perPage }
  }

  private mount(key, val): [string, any] {
    if (this.nonExactKeys.includes(key)) return [key, ILike(`%${val}%`)]
    if (val in _MAPPED_VALUES) return [key, _MAPPED_VALUES[val]]
    return [key, val]
  }

  constructor(private nonExactKeys: string[] = []) {}

  public async build({
    query
  }: Request): Promise<[any, Pagination, Error | null]> {
    try {
      await this.caster.validate(query)
    } catch (ex) {
      const pagination = {
        pagination: { page: 1, perPage: 10 },
        options: { skip: 0, take: 10 }
      }
      return [{}, pagination, ex]
    }

    const values = this.caster.cast(query)
    const params = omitBy(values as Record<string, any>, ([_, key]) =>
      this.paginationKeys.includes(key)
    )
    const available = omitBy(params, isEmpty)
    const pairs = Object.keys(available).map(key =>
      this.mount(key, available[key])
    )
    const where = fromPairs(pairs)
    const pagination = omit(values, Object.keys(where)) as PaginationQuery
    const options = this.mountPaginationOptions(pagination)

    return [where, { options, pagination }, null]
  }
}
