// Hooks
import useSingleSelect from 'components/Calendar/hooks/useCalendar/hooks/useSingleSelect'
import useRangeSelect from 'components/Calendar/hooks/useCalendar/hooks/useRangeSelect'

// Types
import { CalendarProps, CalendarResponse } from 'components/Calendar/hooks/useCalendar/types'

function useCalendar<T>({ year, month, mode }: CalendarProps): CalendarResponse<T> {

  const singleSelectUsage = useSingleSelect(year, month)
  const rangeSelectUsage = useRangeSelect(year, month)

  const result = mode === 'single' ? singleSelectUsage : rangeSelectUsage

  return result as CalendarResponse<T>
}

export default useCalendar
