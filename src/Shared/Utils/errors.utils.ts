import { BAD_REQUEST, NOT_FOUND } from 'http-status'

type Err = {
  status: number
  code: string
  message: string
}

export const $errors = {
  invalidFormat: {
    status: BAD_REQUEST,
    code: 'INVALID_FORMAT',
    message: 'Os valores informados não correspondem aos tipos esperados.'
  },
  notFound: {
    status: NOT_FOUND,
    code: 'NOT_FOUND',
    message: 'Nenhum registro encontrado'
  },
  validationFails: {
    status: BAD_REQUEST,
    code: 'INVALID_PAYLOAD',
    message:
      'O corpo recebido não contém todos os valores esperados ou não contém os tipos adequeados.'
  },
  paramsValidationFails: {
    status: BAD_REQUEST,
    code: 'INVALID_PARAMS',
    message:
      'Os parâmetros recebidos não contém todos os valores esperados ou não contém os tipos adequeados.'
  }
}

export function getErrByCode(code: string): Err {
  const error = Object.values($errors).find(({ code: each }) => each === code)
  return error as Err
}
