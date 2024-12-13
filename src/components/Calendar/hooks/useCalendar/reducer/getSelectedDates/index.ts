import { Years } from 'components/Calendar/hooks/useCalendar/types'

const getSelectedDates = (years: Years) => {
  const selected: string[] = []

  Object.entries(years).forEach(
    ([, year]) => Object.entries(year).forEach(
      ([, month]) => Object.entries(month).forEach(([date, day]) => {
        if (day.selected) {
          selected.push(date)
        }
      }),
    ),
  )

  return selected
}

export default getSelectedDates
