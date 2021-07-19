// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker'

export function generateDeveloperData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    age: faker.datatype.number(99),
    birthdate: new Date('02-01-1995'),
    hobby: faker.hacker.adjective(),
    sex: 'M',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateDevelopersData(n = 1) {
  return Array.from(
    {
      length: n
    },
    (_, _i) => {
      return generateDeveloperData()
    }
  )
}

export function generateDeveloperPayload() {
  return {
    name: faker.name.firstName(),
    age: faker.datatype.number(99),
    birthdate: new Date('02-01-1995'),
    hobby: faker.hacker.adjective(),
    sex: 'M'
  }
}
