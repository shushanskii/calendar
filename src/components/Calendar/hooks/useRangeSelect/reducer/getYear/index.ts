import dayjs from 'dayjs'

import { Years } from 'components/Calendar/hooks/types'

import getDays from 'components/Calendar/hooks/useRangeSelect/reducer/getDays'

function getYear(months: [number, number][]): Years {
  return months
    .reduce<Years>((result, [year, month]) => {
      const dJS = dayjs(`${year}-${month}-01`)
      const _year = dJS.format('YYYY')
      const _month = dJS.format('MM')

      result[_year] = result[_year] ?? {}
      result[_year][_month] = getDays(+year, +month)
      return result
    }, {})
}

export default getYear
