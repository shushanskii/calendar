import dayjs from 'dayjs'

// Types
import { Month } from 'components/Calendar/hooks/useCalendar/types'

/**
 * Get a formatted array of dates for each provided month of each year.
 *
 * @param {number} year - Represents a year.
 * @param {number} month - Represents a month.
 * @throws - Will throw if year or month are not integers, year is less than 0 or month is not in range 1-12.
 * @returns {Object} An object with each year as properties. The value of each year property is another object,
 *               with each month as properties. The value of each month property is an array of day strings.
 */
function getDays(year: number, month: number): Month {
  if (typeof year !== 'number' || typeof month !== 'number') {
    throw new Error('Year and month values must be numbers.')
  }

  const result: Month = {}

  const startOfMonth = dayjs(`${year}-${month}-01`, 'YYYY-M-DD', true)

  // Check if the date is valid
  if (!startOfMonth.isValid()) {
    throw new Error('Invalid year or month value.')
  }

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
