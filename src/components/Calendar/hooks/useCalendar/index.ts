// Hooks
import useSingleSelect from 'components/Calendar/hooks/useCalendar/hooks/useSingleSelect'
import useRangeSelect from 'components/Calendar/hooks/useCalendar/hooks/useRangeSelect'

// Constants
import { DEFAULT_MAX_RANGE, DEFAULT_MIN_RANGE } from 'src/components/Calendar/consts'

// Types
import {
  CalendarProps,
  CalendarResponse,
  CalendarType,
} from 'components/Calendar/hooks/useCalendar/types'


export function useCalendar<T>({
                                 year,
                                 month,
                                 minRange,
                                 maxRange,
                               }: CalendarProps): CalendarResponse<CalendarType<T>> {
  const rangeSelectUsage = useRangeSelect({
    year,
    month,
    minRange: minRange ?? DEFAULT_MIN_RANGE,
    maxRange: maxRange ?? DEFAULT_MAX_RANGE,
  })
  const singleSelectUsage = useSingleSelect({ year, month })

  if (minRange && maxRange) {
    return rangeSelectUsage as CalendarResponse<CalendarType<T>>
  }

  return singleSelectUsage as CalendarResponse<CalendarType<T>>
}
