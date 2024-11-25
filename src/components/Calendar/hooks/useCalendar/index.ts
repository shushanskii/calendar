// Hooks
import useSingleSelect from 'components/Calendar/hooks/useCalendar/hooks/useSingleSelect'
import useRangeSelect from 'components/Calendar/hooks/useCalendar/hooks/useRangeSelect'

// Types
import { CalendarType } from 'components/Calendar/hooks/useCalendar/types'

function useCalendar<T>(year: number, month: number, mode: 'single' | 'range'): CalendarType<T> {

  const singleSelectUsage = useSingleSelect(year, month)

  const rangeSelectUsage = useRangeSelect(year, month)

  const result = mode === 'single' ? singleSelectUsage : rangeSelectUsage

  return result as CalendarType<T>;
}

export default useCalendar
