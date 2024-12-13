import { Day, Years } from 'components/Calendar/hooks/useCalendar/types'

const getSelectedRange = (years: Years): [Day | undefined, Day | undefined] => {
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

export default getSelectedRange
