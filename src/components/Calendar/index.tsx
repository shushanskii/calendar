import dayjs from 'dayjs'

// Hooks
import useCalendar from 'components/Calendar/hooks/useCalendar'

// Styled
import { Container, Day } from './styled.ts'

function Calendar() {
  const calendar = useCalendar(2024, 11)

  return (
    <Container>
      {calendar.map(({ date, selected, sameMonth, oncClick }, index) => (
        <Day
          key={`${index}-day`}
          $selected={selected}
          $disabled={!sameMonth}
          onClick={oncClick}
        >
          {dayjs(date).format('D')}
        </Day>
      ))}
    </Container>
  )
}

export default Calendar
