import { Day, Month, Year, Years } from 'components/Calendar/hooks/useCalendar/types'

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

export default yearLoop
