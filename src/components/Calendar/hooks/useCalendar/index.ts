import useSingleSelect from 'components/Calendar/hooks/useCalendar/hooks/useSingleSelect'

function useCalendar(year: number, month: number) {

  return useSingleSelect(year, month)
}

export default useCalendar
