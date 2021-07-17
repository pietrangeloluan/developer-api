import * as Yup from 'yup'

import { YupValidator } from '@/Shared/Providers'

export class Validator extends YupValidator {
  public static schemas = {
    params: Yup.object().shape({
      id: Yup.string()
        .required()
        .uuid()
    }),
    query: Yup.object().shape({
      name: Yup.string()
    }),
    store: Yup.object().shape({
      name: Yup.string().required()
    }),
    update: Yup.object().shape({
      name: Yup.string()
    })
  }

  constructor() {
    super(Validator.schemas)
  }
}
