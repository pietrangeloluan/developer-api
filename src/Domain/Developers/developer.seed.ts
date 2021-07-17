import { getRepository } from 'typeorm'

import { Entity } from '.'

import { developers as defaultDevelopers } from '@/Shared/Resources'

class Seed {
  private developers: any

  constructor() {
    this.developers = defaultDevelopers
  }

  public async execute() {
    const repository = getRepository(Entity)
    return await repository.save(this.developers)
  }
}

export default new Seed()
