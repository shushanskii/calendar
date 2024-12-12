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

export interface Date extends Day {
  date: string
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export interface CalendarProps {
  months: [number, number][]
  rangeLimits?: [number, number]
  singleSelect?: boolean
  // eslint-disable-next-line no-unused-vars
  onComplete?: (range: [string, string]) => void
  onReset?: () => void
}

export interface CalendarResponse {
  dates: Date[][][]
  reset: () => void
  selected: string[]
}
