import { createConnection } from 'typeorm'

import { Seed as DeveloperSeed } from '@/Domain/Developers'

class Seed {
  static execute() {
    createConnection().then(async () => {
      console.log('Seending database....')

      await DeveloperSeed.execute()

      console.log('Seed finished')
      console.log('press CTRL + C to finish')
    })
  }
}

Seed.execute()

export {}
