import { Container, Day } from './styled.ts'

// Hooks
import useCalendar from 'components/Calendar/hooks/useCalendar'
import dayjs from 'dayjs'


function Calendar() {

  const { days } = useCalendar()

  return (
    <Container>
      {days.map(({ date, selected, sameMonth }, index) => (
        <Day
          key={`${index}-day`}
          $selected={selected}
          $disabled={!sameMonth}
        >
          {dayjs(date).format('D')}
        </Day>
      ))}
    </Container>
  )
}

export default Calendar
