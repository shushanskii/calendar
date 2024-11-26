// Hooks
import useSingleSelect from 'components/Calendar/hooks/useCalendar/hooks/useSingleSelect'
import useRangeSelect from 'components/Calendar/hooks/useCalendar/hooks/useRangeSelect'

// Constants
import { DEFAULT_MAX_RANGE, DEFAULT_MIN_RANGE } from 'src/components/Calendar/consts'

// Types
import { CalendarProps, CalendarResponse } from 'components/Calendar/hooks/useCalendar/types'

function useCalendar<T>({ year, month, mode, minRange, maxRange }: CalendarProps): CalendarResponse<T> {
  const singleSelectUsage = useSingleSelect({ year, month })
  const rangeSelectUsage = useRangeSelect({
    year,
    month,
    minRange: minRange ?? DEFAULT_MIN_RANGE,
    maxRange: maxRange ?? DEFAULT_MAX_RANGE,
  })

  const result = mode === 'single' ? singleSelectUsage : rangeSelectUsage

  return result as CalendarResponse<T>
}

export default useCalendar
