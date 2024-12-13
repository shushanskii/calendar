import dayjs from 'dayjs'

/**
 * Determines whether the provided date falls within certain ranges in respect to the start date.
 *
 * @param {string | undefined} start - The start date in string format.
 * @param {[number, number]} rangeLimits - An array of two numbers defining the range limits.
 * @param {string} date - The date to be checked against the range.
 *
 * @returns {boolean} - Returns true if the provided date falls within the past or future range of the start date. Otherwise, returns false.
 */
const highlighted = (start: string | undefined, rangeLimits: [number, number], date: string) => {
  const rangePastStart = dayjs(start).subtract(rangeLimits[0] - 1, 'day')
  const rangePastEnd = dayjs(start).subtract(rangeLimits[1] - 1, 'day')

  const rangeFutureStart = dayjs(start).add(rangeLimits[0] - 1, 'day')
  const rangeFutureEnd = dayjs(start).add(rangeLimits[1] - 1, 'day')

  return dayjs(date).isBetween(rangePastStart, rangePastEnd, 'days', '[]') || dayjs(date).isBetween(rangeFutureStart, rangeFutureEnd, 'days', '[]')
}


export default highlighted
