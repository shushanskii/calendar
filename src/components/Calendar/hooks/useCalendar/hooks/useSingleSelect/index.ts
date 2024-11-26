import { useEffect, useState } from 'react'

// Utils
import getDays from 'components/Calendar/hooks/useCalendar/utils/getDays'

// Types
import {
  CalendarResponse,
  CalendarSingleSelectProps,
  Month,
  SingleSelect,
} from 'components/Calendar/hooks/useCalendar/types'

function useSingleSelect({ year, month }: CalendarSingleSelectProps): CalendarResponse<SingleSelect> {
  const [dates, setDates] = useState<Month>(getDays(year, month))
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const [sealed, setSealed] = useState<boolean>(false)

  useEffect(() => {
    if (!selected) {
      setDates(getDays(year, month))
      setSealed(false)
    }

    setDates(prevState => Object
      .entries(prevState)
      .reduce<Month>((result, [date, value]) => {
        result[date] = {
          ...value,
          selected: date === selected,
        }
        return result
      }, {}),
    )
  }, [selected])


  const reset = () => {
    setSelected(undefined)
  }

  const onClick = (_date: string) => () => {
    setSealed(!sealed)
    setSelected(_date)
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

  return {
    dates: Object.entries(dates).map(([date, rest]) => ({
      date,
      onClick: onClick(date),
      onMouseEnter: onMouseEnter(date),
      onMouseLeave: onMouseLeave(date),
      ...rest,
    })),
    selected,
    reset,
  }

}

export default useSingleSelect
