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

export interface Date extends Day {
  date: string
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}


export interface CalendarSingleSelectProps {
  year: number
  month: number
}

export interface CalendarRangeSelectProps {
  year: number
  month: number
  minRange: number
  maxRange: number
}

export interface CalendarProps extends Partial<CalendarRangeSelectProps> {
  year: number
  month: number
  mode: 'single' | 'range'
}

export interface CalendarResponse<T> {
  dates: Date[]
  reset: () => void
  selected: T extends SingleSelect ? SingleSelect : T extends RangeSelect ? RangeSelect : never
}
