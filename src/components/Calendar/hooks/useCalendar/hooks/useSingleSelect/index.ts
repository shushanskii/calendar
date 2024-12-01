import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

// Utils
import getYear from 'components/Calendar/hooks/useCalendar/utils/getYear'

// Types
import {
  CalendarResponse, CalendarSingleSelectProps,
  SingleSelect, Years, Date,
} from 'components/Calendar/hooks/useCalendar/types'

function useSingleSelect({ months }: CalendarSingleSelectProps): CalendarResponse<SingleSelect> {
  const [years, setYears] = useState<Years>(getYear(months))
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const [sealed, setSealed] = useState<boolean>(false)

  useEffect(() => {
    if (!selected) {
      setYears(getYear(months))
      setSealed(false)
    }
  }, [selected])


  const reset = () => {
    setSelected(undefined)
  }

  const onClick = (_date: string) => () => {
    if (!sealed) {
      setSelected(_date)
      setSealed(true)
    }
  }

  const onMouseEnter = (_date: string) => () => {
    if (!sealed) {
      setSelected(_date)
    }
  }

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const onMouseLeave = (_date: string) => () => {
    if (!sealed) {
      setSelected(undefined)
    }
  }

  const dates = Object.entries(years)
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
                  selected: dayjs(date).isSame(selected),
                })
                return result
              }, []))
            return result
          }, []),
      )
      return result
    }, [])

  return {
    dates,
    selected,
    reset,
  }
}

export default useSingleSelect
