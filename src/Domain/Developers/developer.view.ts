import { Formatter } from '@/Shared/Utils'

type Developer = Record<string, any>
type DeveloperView = Record<string, any>

export class View {
  transformOne(item: Developer): DeveloperView {
    return {
      ...item,
      birthdate: Formatter.date(item.birthdate)
    }
  }

  transformMany(items: Developer[]): DeveloperView[] {
    return items.map(this.transformOne)
  }
}
