import { useState } from 'react'

// Utils
import getDays from 'components/Calendar/hooks/useCalendar/utils/getDays'

// Types
import { Month } from 'components/Calendar/hooks/useCalendar/types'

function useSingleSelect(year: number, month: number) {
  const [state, setState] = useState<Month>(getDays(year, month))

  const onClick = (_date: string) => () => {
    setState(prevState => Object
      .entries(prevState)
      .reduce<Month>((result, [date, value]) => {
        result[date] = {
          ...value,
          selected: date === _date,
        }
        return result
      }, {}),
    )
  }

  return Object.entries(state).map(([date, rest]) => ({
    date,
    oncClick: onClick(date),
    ...rest,
  }))

}

export default useSingleSelect
