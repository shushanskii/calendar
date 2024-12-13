import dayjs from 'dayjs'

const highlighted = (start: string | undefined, rangeLimits: [number, number], date: string) => {
  const rangePastStart = dayjs(start).subtract(rangeLimits[0] - 1, 'day')
  const rangePastEnd = dayjs(start).subtract(rangeLimits[1] - 1, 'day')

  const rangeFutureStart = dayjs(start).add(rangeLimits[0] - 1, 'day')
  const rangeFutureEnd = dayjs(start).add(rangeLimits[1] - 1, 'day')

  return dayjs(date).isBetween(rangePastStart, rangePastEnd, 'days', '[]') || dayjs(date).isBetween(rangeFutureStart, rangeFutureEnd, 'days', '[]')
}


export default highlighted
