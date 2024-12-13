import dayjs from 'dayjs'

// Types
import { Years } from 'components/Calendar/hooks/useCalendar/types'

import getDays from 'components/Calendar/hooks/useCalendar/reducer/getDays'

/**
 * The function takes an array of tuples that represent the year and month.
 * It checks if the provided year and month values are numbers and also checks for the validity of date.
 * If the checks fail, it throws an error.
 * Otherwise, It returns an object where each key is a year and the value is an object.
 * This nested object has months as keys and returned value from the getDays function as values.
 *
 * @param {Array} months - An array of tuple arrays, where each tuple represents two numbers (year and month)
 *
 * @returns {Years} Returns an object where each key represents a year and each value is an object,
 * This object has keys as months and values as returned from the getDays function.
 * Throws an error if year or month is not a valid number or if the date is not valid
 */
function getYear(months: [number, number][]): Years {
  return months.reduce<Years>((result, [year, month]) => {

    // Check if year and month values are numbers
    if (typeof year !== 'number' || typeof month !== 'number') {
      throw new Error('Year and month values must be numbers.')
    }

    const dJS = dayjs(`${year}-${month}-01`, 'YYYY-M-DD', true)

    // Check if the date is valid
    if (!dJS.isValid()) {
      throw new Error('Invalid year or month value.')
    }

    const _year = dJS.format('YYYY')
    const _month = dJS.format('MM')

    result[_year] = result[_year] ?? {}
    result[_year][_month] = getDays(+year, +month)

    return result
  }, {})
}

export default getYear
