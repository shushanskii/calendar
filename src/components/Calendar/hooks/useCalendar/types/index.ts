export interface Day {
  selected: boolean
  sameMonth: boolean
}

export type Month = Record<string, Day>

export type SingleSelect = string | undefined

export interface RangeSelect {
  start: string | undefined,
  end: string | undefined
}

interface Date extends Day {
  date: string
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export interface CalendarType<T> {
  dates: Date[]
  reset: () => void
  selected: T extends SingleSelect ? SingleSelect : RangeSelect
}
