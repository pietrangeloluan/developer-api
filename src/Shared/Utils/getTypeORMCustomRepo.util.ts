import { getCustomRepository } from 'typeorm'

export function GetTypeORMCustomRepo<T>(repo) {
  return function _get(): T {
    return getCustomRepository(repo)
  }
}
