import { Entity, Service } from '.'

type EntityPayload = Omit<
  Entity,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>

const example: EntityPayload = {
  name: 'Luan',
  age: 26,
  birthdate: new Date('01-01-1995'),
  hobby: 'Pilot',
  sex: 'M'
}
// TODO: tests are not working yet, this things are just placing holders
describe('Teste', () => {
  test('first', async () => {
    const service = new Service()
    const asd = await service.insertOne(example)

    expect(asd).toBeTruthy()
  })
})
