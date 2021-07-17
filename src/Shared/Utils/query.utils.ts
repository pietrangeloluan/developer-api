import { ILike } from 'typeorm'

export class QueryUtil {
  constructor(
    private nonExactKeys: string[] = [],
    private renameKeys: Record<string, any> = {}
  ) {}

  public handle(raw: Record<string, any>) {
    const _handler = _raw => {
      const where = Object.fromEntries(
        Object.keys(_raw)
          .filter(key => _raw[key])
          .map(key => {
            const val = _raw[key]

            const _key = (() => {
              if (key in this.renameKeys) return this.renameKeys[key]
              return key
            })()
            const _val = (() => {
              if (this.nonExactKeys.includes(key)) return ILike(`%${val}%`)
              return val
            })()

            return [_key, _val]
          })
      )
      return where
    }

    if (Array.isArray(raw)) return raw.map(_handler)
    return _handler(raw)
  }
}
