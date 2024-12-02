import { Date, Years } from 'components/Calendar/hooks/useCalendar/types'

function yearsMapper(
  years: Years,
  // eslint-disable-next-line no-unused-vars
  onClick: (date: string) => () => void,
  // eslint-disable-next-line no-unused-vars
  onMouseEnter: (date: string) => () => void,
  // eslint-disable-next-line no-unused-vars
  onMouseLeave: (date: string) => () => void,
  // eslint-disable-next-line no-unused-vars
  checkSelected: (date: string) => boolean,
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
                  selected: checkSelected(date),
                })
                return result
              }, []))
            return result
          }, []),
      )
      return result
    }, [])
}

export default yearsMapper
