import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isoWeek)
dayjs.extend(isSameOrBefore)

interface Day {
  selected: boolean
  sameMonth: boolean
}

type Result = Record<string, Day>

function getDays(year: number, month: number): Result {
  const result: Result = {}

  const startOfMonth = dayjs(`${year}-${month}-01`)
  const endOfMonth = startOfMonth.endOf('month')

  let day = startOfMonth.isoWeekday() === 1
    ? startOfMonth
    : startOfMonth.startOf('week').add(1, 'day')

  while (day.isSameOrBefore(endOfMonth) || day.isoWeekday() !== 1) {

    result[day.format('YYYY-MM-DD')] = {
      selected: false,
      sameMonth: +day.format('M') === month
    }

    day = day.add(1, 'day')
  }

  return result
}


function useCalendar() {
  const state = getDays(2000, 1)

  return {
    days: Object.entries(state).map( ([ date, rest ]) => ({
      date,
      ...rest
    }))
  }
}

export default useCalendar
