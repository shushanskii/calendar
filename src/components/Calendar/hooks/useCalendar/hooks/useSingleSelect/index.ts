import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

// Utils
import getYear from 'components/Calendar/hooks/useCalendar/utils/getYear'

// Types
import {
  CalendarResponse, CalendarSingleSelectProps,
  SingleSelect, Years,
} from 'components/Calendar/hooks/useCalendar/types'
import yearsMapper from 'components/Calendar/hooks/useCalendar/utils/yearsMapper'

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

  const dates = yearsMapper(years, onClick, onMouseEnter, onMouseLeave, (date) => dayjs(date).isSame(selected))

  return {
    dates,
    selected,
    reset,
  }
}

export default useSingleSelect
