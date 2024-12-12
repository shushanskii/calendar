export interface Day {
  date: string;
  start: boolean | undefined;
  end: boolean | undefined;
  selected: boolean
  highlighted?: boolean
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

export interface CalendarSingleSelectProps {
  months: [number, number][]
}

export interface CalendarRangeSelectProps {
  months: [number, number][]
  rangeLimits?: [number, number]
}

export interface CalendarResponse {
  dates: Date[][][]
  reset: () => void
  selected: string[]
}
