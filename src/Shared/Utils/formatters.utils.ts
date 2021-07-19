export class Formatter {
  public static date(raw: string | Date) {
    let _raw = raw as Date
    if (typeof raw === 'string') _raw = new Date(Date.parse(raw))
    if (isNaN(_raw.getDate())) return raw

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(_raw)
  }
}
