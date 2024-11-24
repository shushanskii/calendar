export interface Day {
  selected: boolean
  sameMonth: boolean
}

export type Month = Record<string, Day>
