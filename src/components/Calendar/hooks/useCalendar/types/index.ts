export interface Day {
  selected: boolean
  highlighted: boolean
  sameMonth: boolean
}

export type Month = Record<string, Day>
export type Year = Record<string, Month>
export type Years = Record<string, Year>

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

export interface CalendarProps {
  year: number
  month: number
  minRange?: number
  maxRange?: number
}

export interface CalendarSingleSelectProps {
  months: [number, number][]
}

export type CalendarRangeSelectProps = Required<CalendarProps>

export type CalendarType<T> = T extends SingleSelect ? SingleSelect : T extends RangeSelect ? RangeSelect : never

export interface CalendarResponse<T> {
  dates: Date[][][]
  reset: () => void
  selected: CalendarType<T>
}
