import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

// Utils
import getDays from 'components/Calendar/hooks/useCalendar/utils/getDays'

// Types
import {
  CalendarRangeSelectProps,
  CalendarResponse,
  Month,
  RangeSelect,
} from 'components/Calendar/hooks/useCalendar/types'

dayjs.extend(isBetween)

function useRangeSelect({ year, month }: CalendarRangeSelectProps): CalendarResponse<RangeSelect> {
  const [dates, setDates] = useState<Month>(getDays(year, month))
  const [start, setStart] = useState<string | undefined>(undefined)
  const [end, setEnd] = useState<string | undefined>(undefined)
  const [sealedStart, setSealedStart] = useState<boolean>(false)
  const [sealedEnd, setSealedEnd] = useState<boolean>(false)


  useEffect(() => {
    if (!start && !end) {
      setDates(getDays(year, month))
      setSealedStart(false)
      setSealedEnd(false)
    }

    setDates(prevState => Object
      .entries(prevState)
      .reduce<Month>((result, [date, value]) => {
        result[date] = {
          ...value,
          selected: !!(start && end && dayjs(date).isBetween(start, end))
            || !!(start && dayjs(date).isSame(start))
            || !!(end && dayjs(date).isSame(end)),
        }
        return result
      }, {}),
    )

  }, [start, end])

  const reset = () => {
    setStart(undefined)
    setEnd(undefined)
  }

  const onClick = (_date: string) => () => {
    if (!sealedStart) {
      setStart(_date)
      setSealedStart(true)
    }

    if (sealedStart && !sealedEnd) {
      setEnd(_date)
      setSealedEnd(true)
    }
  }

  const onMouseEnter = (_date: string) => () => {
    if (!sealedStart) {
      setStart(_date)
    }

    if (sealedStart && !sealedEnd) {
      setEnd(_date)
    }
  }

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const onMouseLeave = (_date: string) => () => void 0

  return {
    dates: Object.entries(dates).map(([date, rest]) => ({
      date,
      onClick: onClick(date),
      onMouseEnter: onMouseEnter(date),
      onMouseLeave: onMouseLeave(date),
      ...rest,
    })),
    selected: dayjs(end).isBefore(start) ? { start: end, end: start } : { start, end },
    reset,
  }
}

export default useRangeSelect
