import { Date, Years } from 'components/Calendar/hooks/useCalendar/types'

/**
 * Converts the provided years object into a three dimensional array of Date objects (Year, Month, Day)
 * and binds the provided event handlers to each Date.
 *
 * @param {Years} years - The object representing the years to be converted to Dates.
 * @param {(date: string) => () => void} onClick - The event handler to be bound to the onClick event of each Date.
 * @param {(date: string) => () => void} onMouseEnter - The event handler to be bound to the onMouseEnter event of each Date.
 * @param {(date: string) => () => void} onMouseLeave - The event handler to be bound to the onMouseLeave event of each Date.
 *
 * @returns {Date[][][]} A three dimensional array of Date objects, each bound with the provided event handlers.
 */
function mapper(
  years: Years,
  // eslint-disable-next-line no-unused-vars
  onClick: (date: string) => () => void,
  // eslint-disable-next-line no-unused-vars
  onMouseEnter: (date: string) => () => void,
  // eslint-disable-next-line no-unused-vars
  onMouseLeave: (date: string) => () => void,
): Date[][][] {
  return Object.entries(years)
    .reduce<Date[][][]>((result, [, year]) => {
      result.push(
        Object.entries(year)
          .reduce<Date[][]>((result, [, month]) => {
            result.push(Object.entries(month)
              .reduce<Date[]>((result, [date, day]) => {
                result.push({
                  ...day,
                  date,
                  onClick: onClick(date),
                  onMouseEnter: onMouseEnter(date),
                  onMouseLeave: onMouseLeave(date),
                })
                return result
              }, []))
            return result
          }, []),
      )
      return result
    }, [])
}

export default mapper
