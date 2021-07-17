import { Request, Response } from 'express'
import { CREATED, OK } from 'http-status'

import { Service } from './developer.service'

export class Controller {
  private $service: Service

  constructor({ $Service = Service } = {}) {
    this.$service = new $Service()
  }

  public async index(req: Request, res: Response): Promise<Response<any>> {
    const { developers, pagination } = await this.$service.find(req)
    return res.send({ developers, pagination })
  }

  public async show(req: Request, res: Response): Promise<Response<any>> {
    const found = await this.$service.findOne(req)
    return res.send(found)
  }

  public async store(req: Request, res: Response): Promise<Response<any>> {
    const created = await this.$service.insertOne(req)
    return res.status(CREATED).send(created)
  }

  public async update(req: Request, res: Response): Promise<Response<any>> {
    const updated = await this.$service.updateOne(req)
    return res.status(OK).send(updated)
  }

  public async destroy(req: Request, res: Response): Promise<Response<any>> {
    const id = await this.$service.removeOne(req)
    return res.status(OK).send({ id })
  }
}
