import type Id from './Id'

export default interface Item extends Id {
  id: number
  name: string
}
