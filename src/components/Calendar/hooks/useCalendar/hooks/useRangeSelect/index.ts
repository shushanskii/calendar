import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

// Utils
import getDays from 'components/Calendar/hooks/useCalendar/utils/getDays'

// Types
import {
  CalendarRangeSelectProps,
  CalendarResponse,
  Years,
  RangeSelect,
} from 'components/Calendar/hooks/useCalendar/types'

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

function useRangeSelect({ year, month, minRange, maxRange }: CalendarRangeSelectProps): CalendarResponse<RangeSelect> {
  const [dates, setDates] = useState<Years>(getDays(year, month))
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
      .reduce<Years>((result, [date, value]) => {
        result[date] = {
          ...value,
          selected: !!(start && end && dayjs(date).isBetween(start, end))
            || !!(start && dayjs(date).isSame(start))
            || !!(end && dayjs(date).isSame(end)),
          highlighted: start && value.sameMonth
            ? dayjs(date).isSameOrAfter(dayjs(start).add(minRange - 1, 'day')) && dayjs(date).isSameOrBefore(dayjs(start).add(maxRange - 1, 'day'))
            || dayjs(date).isSameOrBefore(dayjs(start).subtract(minRange - 1, 'day')) && dayjs(date).isSameOrAfter(dayjs(start).subtract(maxRange - 1, 'day'))
            : false,
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

    if (sealedStart && !sealedEnd && dates[_date].highlighted) {
      setEnd(_date)
      setSealedEnd(true)
    }
  }

  const onMouseEnter = (_date: string) => () => {
    if (!sealedStart) {
      setStart(_date)
    }

    if (sealedStart && !sealedEnd && dates[_date].highlighted) {
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
