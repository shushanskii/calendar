import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isoWeek)
dayjs.extend(isSameOrBefore)

// Types
import { Month } from 'components/Calendar/hooks/useCalendar/types'

function getDays(year: number, month: number): Month {
  const result: Month = {}

  const startOfMonth = dayjs(`${year}-${month}-01`)
  const endOfMonth = startOfMonth.endOf('month')

  let day = startOfMonth.isoWeekday() === 1
    ? startOfMonth
    : startOfMonth.startOf('week').add(1, 'day')

  while (day.isSameOrBefore(endOfMonth) || day.isoWeekday() !== 1) {
    result[day.format('YYYY-MM-DD')] = {
      date: day.format('YYYY-MM-DD'),
      start: false,
      end: false,
      highlighted: false,
      selected: false,
      sameMonth: +day.format('M') === month,
    }

    day = day.add(1, 'day')
  }

  return result
}

export default getDays
