import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

// Types
import { Day, Month, Year, Years } from 'components/Calendar/hooks/types'

// Components
import getYear from 'src/components/Calendar/hooks/useRangeSelect/reducer/getYear'

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

interface State {
  dates: Years
}

export enum Actions {
  // eslint-disable-next-line no-unused-vars
  SET_START = 'SET_START',
  // eslint-disable-next-line no-unused-vars
  SET_END = 'SET_END',
  // eslint-disable-next-line no-unused-vars
  SET_SEALED_START = 'SET_SEALED_START',
  // eslint-disable-next-line no-unused-vars
  SET_SEALED_END = 'SET_SEALED_END',
  // eslint-disable-next-line no-unused-vars
  RESET = 'RESET'
}

type Action =
  | { type: Actions.SET_START, payload: string }
  | { type: Actions.SET_SEALED_START, payload: string }
  | { type: Actions.SET_END, payload: string }
  | { type: Actions.SET_SEALED_END, payload: string }
  | { type: Actions.RESET };

// eslint-disable-next-line no-unused-vars
const yearLoop = (years: Years, dayCallbackFn: (date: string, day: Day) => Day) => {
  return Object.entries(years).reduce<Years>((result, [yearNum, year]) => {
    result[yearNum] = Object.entries(year).reduce<Year>((result, [monthNum, month]) => {
      result[monthNum] = Object.entries(month).reduce<Month>((result, [date, day]) => {
        result[date] = dayCallbackFn(date, day)
        return result
      }, {})
      return result
    }, {})
    return result
  }, {})
}


export const getInitialState = (months: [number, number][]): State => ({
  dates: getYear(months),
})

export const getSelectedDates = (years: Years) => {
  const selected: string[] = []

  Object.entries(years).forEach(
    ([, year]) => Object.entries(year).forEach(
      ([, month]) => Object.entries(month).forEach(([date, day]) => {
        if (day.selected) {
          selected.push(date)
        }
      }),
    ),
  )

  return selected
}

export const getSelectedRange = (years: Years): [Day | undefined, Day | undefined] => {
  let start: Day | undefined = undefined
  let end: Day | undefined = undefined

  Object.entries(years).forEach(
    ([, year]) => Object.entries(year).forEach(
      ([, month]) => Object.entries(month).forEach(([, day]) => {
        if (day.start) {
          start = day
        }
        if (day.end) {
          end = day
        }
      }),
    ),
  )

  return [start, end]
}


const selected = (start: string, end: string, date: string) => dayjs(date).isBetween(start, end, 'days', '[]')


const highlighted = (start: string | undefined, rangeLimits: [number, number], date: string) => {
  const rangePastStart = dayjs(start).subtract(rangeLimits[0] - 1, 'day')
  const rangePastEnd = dayjs(start).subtract(rangeLimits[1] - 1, 'day')

  const rangeFutureStart = dayjs(start).add(rangeLimits[0] - 1, 'day')
  const rangeFutureEnd = dayjs(start).add(rangeLimits[1] - 1, 'day')

  return dayjs(date).isBetween(rangePastStart, rangePastEnd, 'days', '[]') || dayjs(date).isBetween(rangeFutureStart, rangeFutureEnd, 'days', '[]')
}

export const getReducer = (months: [number, number][], rangeLimits: [number, number] | undefined) => (state: State, {
  type,
  // @ts-expect-error: 'probably undefined'
  payload,
}: Action): State => {
  switch (type) {
    case Actions.SET_START: {
      const start = payload
      return {
        ...state,
        dates: yearLoop(
          state.dates,
          (date, day) => {
            return {
              ...day,
              selected: date === start && day.sameMonth,
              highlighted: rangeLimits ? highlighted(start, rangeLimits, date) && day.sameMonth: false,
            }
          },
        ),
      }
    }

    case Actions.SET_END: {
      const end = payload
      const [start] = getSelectedRange(state.dates)

      if (!start?.date) {
        return { ...state }
      }

      return {
        ...state,
        dates: yearLoop(
          state.dates,
          (date, day) => {
            return {
              ...day,
              selected: rangeLimits
                ? dayjs(end).isBetween(
                  dayjs(start.date).subtract(rangeLimits[1] - 1, 'day'),
                  dayjs(start.date).add(rangeLimits[1] - 1, 'day'),
                  'days',
                  '[]',
                )
                && selected(start.date, end, date) && day.sameMonth || date === start.date
                : selected(start.date, end, date) && day.sameMonth,
              highlighted: rangeLimits ? highlighted(start?.date, rangeLimits, date) && day.sameMonth : false,
            }
          },
        ),
      }
    }

    case Actions.SET_SEALED_START: {
      const start = payload

      return {
        ...state,
        dates: yearLoop(
          state.dates,
          (date, day) => {
            return {
              ...day,
              start: date === start && day.sameMonth,
            }
          },
        ),
      }
    }
    case Actions.SET_SEALED_END: {
      const end = payload
      return {
        ...state,
        dates: yearLoop(
          state.dates,
          (date, day) => {
            return {
              ...day,
              end: date === end && day.sameMonth,
              highlighted: false,
            }
          },
        ),
      }
    }
    case Actions.RESET:
      return getInitialState(months)
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}
